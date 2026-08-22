<?php

namespace Tests\Feature\MedicalRecords;

use App\Enums\AppointmentStatus;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MedicalRecordAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_patient_can_view_own_medical_record(): void
    {
        $patient = Patient::factory()->create();

        $response = $this->actingAs($patient->user, 'sanctum')->getJson('/api/patient/medical-record');

        $response->assertStatus(200);
    }

    public function test_patient_can_update_own_medical_record(): void
    {
        $patient = Patient::factory()->create();

        $response = $this->actingAs($patient->user, 'sanctum')
            ->putJson('/api/patient/medical-record', [
                'blood_type' => 'O+',
                'allergies' => 'Pollen',
            ]);

        $response->assertStatus(200)->assertJsonPath('data.blood_type', 'O+');
    }

    public function test_doctor_with_confirmed_appointment_can_view_patient_record(): void
    {
        $doctor = Doctor::factory()->create();
        $patient = Patient::factory()->create();
        Appointment::factory()->create([
            'doctor_id' => $doctor->id,
            'patient_id' => $patient->id,
            'status' => AppointmentStatus::CONFIRMED,
        ]);

        $response = $this->actingAs($doctor->user, 'sanctum')
            ->getJson("/api/doctor/patients/{$patient->id}/medical-record");

        $response->assertStatus(200);
    }

    public function test_doctor_without_relationship_cannot_view_patient_record(): void
    {
        $doctor = Doctor::factory()->create();
        $patient = Patient::factory()->create(); // aucun rendez-vous avec ce médecin

        $response = $this->actingAs($doctor->user, 'sanctum')
            ->getJson("/api/doctor/patients/{$patient->id}/medical-record");

        $response->assertStatus(403);
    }

    public function test_doctor_with_only_pending_appointment_cannot_view_record(): void
    {
        $doctor = Doctor::factory()->create();
        $patient = Patient::factory()->create();
        Appointment::factory()->create([
            'doctor_id' => $doctor->id,
            'patient_id' => $patient->id,
            'status' => AppointmentStatus::PENDING,
        ]);

        $response = $this->actingAs($doctor->user, 'sanctum')
            ->getJson("/api/doctor/patients/{$patient->id}/medical-record");

        $response->assertStatus(403);
    }

    public function test_patient_cannot_access_another_patients_medical_record_via_doctor_route(): void
    {
        // Un patient n'a de toute façon pas accès aux routes /doctor/* (role:doctor),
        // ce test vérifie explicitement le 403 au niveau middleware.
        $patient = Patient::factory()->create();
        $otherPatient = Patient::factory()->create();

        $response = $this->actingAs($patient->user, 'sanctum')
            ->getJson("/api/doctor/patients/{$otherPatient->id}/medical-record");

        $response->assertStatus(403);
    }

    public function test_guest_cannot_access_medical_record(): void
    {
        $response = $this->getJson('/api/patient/medical-record');

        $response->assertStatus(401);
    }
}