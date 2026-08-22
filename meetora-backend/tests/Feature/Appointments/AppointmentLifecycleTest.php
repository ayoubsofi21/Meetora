<?php

namespace Tests\Feature\Appointments;

use App\Enums\AppointmentStatus;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AppointmentLifecycleTest extends TestCase
{
    use RefreshDatabase;

    public function test_patient_can_list_own_appointments(): void
    {
        $patient = Patient::factory()->create();
        Appointment::factory()->count(2)->create(['patient_id' => $patient->id]);
        Appointment::factory()->create(); // autre patient

        $response = $this->actingAs($patient->user, 'sanctum')->getJson('/api/patient/appointments');

        $response->assertStatus(200)->assertJsonCount(2, 'data');
    }

    public function test_patient_can_cancel_own_pending_appointment(): void
    {
        $patient = Patient::factory()->create();
        $appointment = Appointment::factory()->create([
            'patient_id' => $patient->id,
            'status' => AppointmentStatus::PENDING,
        ]);

        $response = $this->actingAs($patient->user, 'sanctum')
            ->patchJson("/api/patient/appointments/{$appointment->id}/cancel");

        $response->assertStatus(200)->assertJsonPath('data.status', 'cancelled');
    }

    public function test_patient_cannot_cancel_another_patients_appointment(): void
    {
        $patientA = Patient::factory()->create();
        $patientB = Patient::factory()->create();
        $appointment = Appointment::factory()->create(['patient_id' => $patientB->id]);

        $response = $this->actingAs($patientA->user, 'sanctum')
            ->patchJson("/api/patient/appointments/{$appointment->id}/cancel");

        $response->assertStatus(403);
    }

    public function test_doctor_can_confirm_pending_appointment(): void
    {
        $doctor = Doctor::factory()->create();
        $appointment = Appointment::factory()->create([
            'doctor_id' => $doctor->id,
            'status' => AppointmentStatus::PENDING,
        ]);

        $response = $this->actingAs($doctor->user, 'sanctum')
            ->patchJson("/api/doctor/appointments/{$appointment->id}/confirm");

        $response->assertStatus(200)->assertJsonPath('data.status', 'confirmed');
    }

    public function test_doctor_cannot_confirm_already_confirmed_appointment(): void
    {
        $doctor = Doctor::factory()->create();
        $appointment = Appointment::factory()->create([
            'doctor_id' => $doctor->id,
            'status' => AppointmentStatus::CONFIRMED,
        ]);

        $response = $this->actingAs($doctor->user, 'sanctum')
            ->patchJson("/api/doctor/appointments/{$appointment->id}/confirm");

        $response->assertStatus(422);
    }

    public function test_doctor_can_complete_confirmed_appointment(): void
    {
        $doctor = Doctor::factory()->create();
        $appointment = Appointment::factory()->create([
            'doctor_id' => $doctor->id,
            'status' => AppointmentStatus::CONFIRMED,
        ]);

        $response = $this->actingAs($doctor->user, 'sanctum')
            ->patchJson("/api/doctor/appointments/{$appointment->id}/complete", [
                'notes' => 'Patient stable',
            ]);

        $response->assertStatus(200)->assertJsonPath('data.status', 'completed');
    }

    public function test_doctor_cannot_complete_pending_appointment(): void
    {
        $doctor = Doctor::factory()->create();
        $appointment = Appointment::factory()->create([
            'doctor_id' => $doctor->id,
            'status' => AppointmentStatus::PENDING,
        ]);

        $response = $this->actingAs($doctor->user, 'sanctum')
            ->patchJson("/api/doctor/appointments/{$appointment->id}/complete");

        $response->assertStatus(422);
    }

    public function test_doctor_cannot_access_another_doctors_appointment(): void
    {
        $doctorA = Doctor::factory()->create();
        $doctorB = Doctor::factory()->create();
        $appointment = Appointment::factory()->create(['doctor_id' => $doctorB->id]);

        $response = $this->actingAs($doctorA->user, 'sanctum')
            ->patchJson("/api/doctor/appointments/{$appointment->id}/confirm");

        $response->assertStatus(403);
    }

    public function test_admin_can_list_all_appointments_with_filters(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        Appointment::factory()->create(['status' => AppointmentStatus::PENDING]);
        Appointment::factory()->create(['status' => AppointmentStatus::COMPLETED]);

        $response = $this->actingAs($admin, 'sanctum')->getJson('/api/admin/appointments?status=pending');

        $response->assertStatus(200)->assertJsonCount(1, 'data');
    }

    public function test_patient_cannot_access_admin_appointments(): void
    {
        $patient = Patient::factory()->create();

        $response = $this->actingAs($patient->user, 'sanctum')->getJson('/api/admin/appointments');

        $response->assertStatus(403);
    }
}