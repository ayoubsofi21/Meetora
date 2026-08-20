<?php

namespace Tests\Feature\MedicalRecords;

use App\Models\Consultation;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Prescription;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MedicalHistoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_patient_can_view_own_medical_history(): void
    {
        $patient = Patient::factory()->create();
        $consultation = Consultation::factory()->create(['patient_id' => $patient->id]);
        Prescription::factory()->create([
            'consultation_id' => $consultation->id,
            'patient_id' => $patient->id,
        ]);

        $response = $this->actingAs($patient->user, 'sanctum')->getJson('/api/patient/medical-history');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => ['consultations', 'prescriptions', 'appointments'],
            ])
            ->assertJsonCount(1, 'data.consultations')
            ->assertJsonCount(1, 'data.prescriptions');
    }

    public function test_medical_history_does_not_include_other_patients_data(): void
    {
        $patient = Patient::factory()->create();
        Consultation::factory()->create(['patient_id' => $patient->id]);

        $otherPatient = Patient::factory()->create();
        Consultation::factory()->create(['patient_id' => $otherPatient->id]);

        $response = $this->actingAs($patient->user, 'sanctum')->getJson('/api/patient/medical-history');

        $response->assertStatus(200)->assertJsonCount(1, 'data.consultations');
    }

    public function test_guest_cannot_access_medical_history(): void
    {
        $response = $this->getJson('/api/patient/medical-history');

        $response->assertStatus(401);
    }

    public function test_doctor_cannot_access_patient_medical_history_route(): void
    {
        $doctor = Doctor::factory()->create();

        $response = $this->actingAs($doctor->user, 'sanctum')->getJson('/api/patient/medical-history');

        $response->assertStatus(403);
    }
}