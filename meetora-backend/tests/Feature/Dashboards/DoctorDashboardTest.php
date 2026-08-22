<?php

namespace Tests\Feature\Dashboards;

use App\Enums\AppointmentStatus;
use App\Models\Appointment;
use App\Models\Doctor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DoctorDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_doctor_dashboard_returns_expected_structure(): void
    {
        $doctor = Doctor::factory()->create();

        $response = $this->actingAs($doctor->user, 'sanctum')->getJson('/api/doctor/dashboard');

        $response->assertStatus(200)->assertJsonStructure([
            'data' => [
                'today_appointments',
                'upcoming_appointments',
                'recent_patients',
                'statistics' => ['today_appointments', 'pending_appointments', 'completed_consultations'],
            ],
        ]);
    }

    public function test_dashboard_shows_only_todays_appointments_in_today_list(): void
    {
        $doctor = Doctor::factory()->create();
        Appointment::factory()->create([
            'doctor_id' => $doctor->id,
            'appointment_date' => now()->toDateString(),
            'status' => AppointmentStatus::CONFIRMED,
        ]);
        Appointment::factory()->create([
            'doctor_id' => $doctor->id,
            'appointment_date' => now()->addWeek()->toDateString(),
            'status' => AppointmentStatus::PENDING,
        ]);

        $response = $this->actingAs($doctor->user, 'sanctum')->getJson('/api/doctor/dashboard');

        $response->assertJsonCount(1, 'data.today_appointments')
            ->assertJsonPath('data.statistics.today_appointments', 1);
    }

    public function test_dashboard_does_not_show_other_doctors_appointments(): void
    {
        $doctor = Doctor::factory()->create();
        Appointment::factory()->create(); // autre médecin, aujourd'hui potentiellement

        $response = $this->actingAs($doctor->user, 'sanctum')->getJson('/api/doctor/dashboard');

        $response->assertJsonCount(0, 'data.today_appointments');
    }

    public function test_recent_patients_are_deduplicated(): void
    {
        $doctor = Doctor::factory()->create();
        $patient = \App\Models\Patient::factory()->create();

        Appointment::factory()->count(3)->create([
            'doctor_id' => $doctor->id,
            'patient_id' => $patient->id,
            'status' => AppointmentStatus::COMPLETED,
        ]);

        $response = $this->actingAs($doctor->user, 'sanctum')->getJson('/api/doctor/dashboard');

        $response->assertJsonCount(1, 'data.recent_patients');
    }
}