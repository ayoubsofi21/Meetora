<?php

namespace Tests\Feature\Prescriptions;

use App\Models\Consultation;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PrescriptionTest extends TestCase
{
    use RefreshDatabase;

    public function test_doctor_can_create_prescription_with_medications(): void
    {
        $doctor = Doctor::factory()->create();
        $consultation = Consultation::factory()->create(['doctor_id' => $doctor->id]);

        $response = $this->actingAs($doctor->user, 'sanctum')
            ->postJson("/api/doctor/consultations/{$consultation->id}/prescriptions", [
                'notes' => 'Prendre après les repas',
                'medications' => [
                    [
                        'medication_name' => 'Paracetamol',
                        'dosage' => '500mg',
                        'frequency' => '3 fois par jour',
                        'duration' => '5 jours',
                        'instructions' => 'Après repas',
                    ],
                ],
            ]);

        $response->assertStatus(201)
            ->assertJsonCount(1, 'data.medications')
            ->assertJsonPath('data.medications.0.medication_name', 'Paracetamol');

        $this->assertDatabaseCount('prescription_items', 1);
    }

    public function test_medications_array_is_required(): void
    {
        $doctor = Doctor::factory()->create();
        $consultation = Consultation::factory()->create(['doctor_id' => $doctor->id]);

        $response = $this->actingAs($doctor->user, 'sanctum')
            ->postJson("/api/doctor/consultations/{$consultation->id}/prescriptions", [
                'notes' => 'No meds',
                'medications' => [],
            ]);

        $response->assertStatus(422)->assertJsonValidationErrors('medications');
    }

    public function test_doctor_cannot_prescribe_for_unrelated_consultation(): void
    {
        $doctorA = Doctor::factory()->create();
        $doctorB = Doctor::factory()->create();
        $consultation = Consultation::factory()->create(['doctor_id' => $doctorB->id]);

        $response = $this->actingAs($doctorA->user, 'sanctum')
            ->postJson("/api/doctor/consultations/{$consultation->id}/prescriptions", [
                'medications' => [['medication_name' => 'X']],
            ]);

        $response->assertStatus(403);
    }

    public function test_patient_can_list_own_prescriptions(): void
    {
        $patient = Patient::factory()->create();
        $consultation = Consultation::factory()->create(['patient_id' => $patient->id]);
        $doctor = $consultation->doctor;

        $this->actingAs($doctor->user, 'sanctum')
            ->postJson("/api/doctor/consultations/{$consultation->id}/prescriptions", [
                'medications' => [['medication_name' => 'Ibuprofen']],
            ]);

        $response = $this->actingAs($patient->user, 'sanctum')->getJson('/api/patient/prescriptions');

        $response->assertStatus(200)->assertJsonCount(1, 'data');
    }

    public function test_patient_cannot_view_another_patients_prescription(): void
    {
        $patientA = Patient::factory()->create();
        $consultation = Consultation::factory()->create(['patient_id' => $patientA->id]);
        $doctor = $consultation->doctor;

        $created = $this->actingAs($doctor->user, 'sanctum')
            ->postJson("/api/doctor/consultations/{$consultation->id}/prescriptions", [
                'medications' => [['medication_name' => 'Ibuprofen']],
            ])->json('data.id');

        $patientB = Patient::factory()->create();

        $response = $this->actingAs($patientB->user, 'sanctum')
            ->getJson("/api/patient/prescriptions/{$created}");

        $response->assertStatus(403);
    }
}