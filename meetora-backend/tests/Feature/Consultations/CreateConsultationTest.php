<?php

namespace Tests\Feature\Consultations;

use App\Enums\AppointmentStatus;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class CreateConsultationTest extends TestCase
{
    use RefreshDatabase;

    public function test_doctor_can_create_consultation_for_confirmed_appointment(): void
    {
        $doctor = Doctor::factory()->create();
        $appointment = Appointment::factory()->create([
            'doctor_id' => $doctor->id,
            'status' => AppointmentStatus::CONFIRMED,
        ]);

        $response = $this->actingAs($doctor->user, 'sanctum')
            ->postJson("/api/doctor/appointments/{$appointment->id}/consultation", [
                'diagnosis' => 'Common cold',
                'symptoms' => 'Cough, mild fever',
                'treatment' => 'Rest and hydration',
            ]);

        $response->assertStatus(201)->assertJsonPath('data.diagnosis', 'Common cold');

        $this->assertSame(AppointmentStatus::COMPLETED, $appointment->fresh()->status);
    }

    public function test_cannot_create_consultation_for_pending_appointment(): void
    {
        $doctor = Doctor::factory()->create();
        $appointment = Appointment::factory()->create([
            'doctor_id' => $doctor->id,
            'status' => AppointmentStatus::PENDING,
        ]);

        $response = $this->actingAs($doctor->user, 'sanctum')
            ->postJson("/api/doctor/appointments/{$appointment->id}/consultation", [
                'diagnosis' => 'Common cold',
            ]);

        $response->assertStatus(422);
    }

    public function test_cannot_create_duplicate_consultation(): void
    {
        $doctor = Doctor::factory()->create();
        $appointment = Appointment::factory()->create([
            'doctor_id' => $doctor->id,
            'status' => AppointmentStatus::CONFIRMED,
        ]);

        $this->actingAs($doctor->user, 'sanctum')
            ->postJson("/api/doctor/appointments/{$appointment->id}/consultation", ['diagnosis' => 'First']);

        $response = $this->actingAs($doctor->user, 'sanctum')
            ->postJson("/api/doctor/appointments/{$appointment->id}/consultation", ['diagnosis' => 'Second']);

        $response->assertStatus(422);
        $this->assertDatabaseCount('consultations', 1);
    }

    public function test_doctor_cannot_create_consultation_for_unrelated_appointment(): void
    {
        $doctorA = Doctor::factory()->create();
        $doctorB = Doctor::factory()->create();
        $appointment = Appointment::factory()->create([
            'doctor_id' => $doctorB->id,
            'status' => AppointmentStatus::CONFIRMED,
        ]);

        $response = $this->actingAs($doctorA->user, 'sanctum')
            ->postJson("/api/doctor/appointments/{$appointment->id}/consultation", ['diagnosis' => 'X']);

        $response->assertStatus(403);
    }

    public function test_diagnosis_is_required(): void
    {
        $doctor = Doctor::factory()->create();
        $appointment = Appointment::factory()->create([
            'doctor_id' => $doctor->id,
            'status' => AppointmentStatus::CONFIRMED,
        ]);

        $response = $this->actingAs($doctor->user, 'sanctum')
            ->postJson("/api/doctor/appointments/{$appointment->id}/consultation", []);

        $response->assertStatus(422)->assertJsonValidationErrors('diagnosis');
    }

    public function test_patient_can_view_own_consultation(): void
    {
        $doctor = Doctor::factory()->create();
        $appointment = Appointment::factory()->create([
            'doctor_id' => $doctor->id,
            'status' => AppointmentStatus::CONFIRMED,
        ]);

        $this->actingAs($doctor->user, 'sanctum')
            ->postJson("/api/doctor/appointments/{$appointment->id}/consultation", ['diagnosis' => 'Flu']);

        $consultation = $appointment->fresh()->consultation;
        $patient = $appointment->patient;

        $response = $this->actingAs($patient->user, 'sanctum')
            ->getJson("/api/consultations/{$consultation->id}");

        $response->assertStatus(200)->assertJsonPath('data.diagnosis', 'Flu');
    }

    public function test_unrelated_patient_cannot_view_consultation(): void
    {
        $doctor = Doctor::factory()->create();
        $appointment = Appointment::factory()->create([
            'doctor_id' => $doctor->id,
            'status' => AppointmentStatus::CONFIRMED,
        ]);

        $this->actingAs($doctor->user, 'sanctum')
            ->postJson("/api/doctor/appointments/{$appointment->id}/consultation", ['diagnosis' => 'Flu']);

        $consultation = $appointment->fresh()->consultation;
        $otherPatient = Patient::factory()->create();

        $response = $this->actingAs($otherPatient->user, 'sanctum')
            ->getJson("/api/consultations/{$consultation->id}");

        $response->assertStatus(403);
    }
}