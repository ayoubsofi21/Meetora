<?php

namespace Tests\Feature\Dashboards;

use App\Enums\AppointmentStatus;
use App\Models\Appointment;
use App\Models\Consultation;
use App\Models\Patient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PatientDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_patient_dashboard_returns_expected_structure(): void
    {
        $patient = Patient::factory()->create();

        $response = $this->actingAs($patient->user, 'sanctum')->getJson('/api/patient/dashboard');

        $response->assertStatus(200)->assertJsonStructure([
            'data' => [
                'upcoming_appointments',
                'recent_consultations',
                'recent_prescriptions',
                'medical_record',
                'statistics' => ['upcoming_appointments', 'completed_consultations'],
            ],
        ]);
    }

    public function test_dashboard_only_counts_own_upcoming_appointments(): void
    {
        $patient = Patient::factory()->create();
        Appointment::factory()->create([
            'patient_id' => $patient->id,
            'appointment_date' => now()->addDays(3)->toDateString(),
            'status' => AppointmentStatus::PENDING,
        ]);
        Appointment::factory()->create(); // autre patient

        $response = $this->actingAs($patient->user, 'sanctum')->getJson('/api/patient/dashboard');

        $response->assertStatus(200)
            ->assertJsonPath('data.statistics.upcoming_appointments', 1)
            ->assertJsonCount(1, 'data.upcoming_appointments');
    }

    public function test_dashboard_excludes_past_and_cancelled_appointments_from_upcoming(): void
    {
        $patient = Patient::factory()->create();
        Appointment::factory()->create([
            'patient_id' => $patient->id,
            'appointment_date' => now()->subWeek()->toDateString(),
            'status' => AppointmentStatus::COMPLETED,
        ]);
        Appointment::factory()->create([
            'patient_id' => $patient->id,
            'appointment_date' => now()->addWeek()->toDateString(),
            'status' => AppointmentStatus::CANCELLED,
        ]);

        $response = $this->actingAs($patient->user, 'sanctum')->getJson('/api/patient/dashboard');

        $response->assertJsonPath('data.statistics.upcoming_appointments', 0);
    }

    public function test_dashboard_counts_all_completed_consultations_beyond_limit(): void
    {
        $patient = Patient::factory()->create();
        Consultation::factory()->count(7)->create(['patient_id' => $patient->id]);

        $response = $this->actingAs($patient->user, 'sanctum')->getJson('/api/patient/dashboard');

        $response->assertJsonPath('data.statistics.completed_consultations', 7)
            ->assertJsonCount(5, 'data.recent_consultations'); // limité à 5 dans la liste
    }
}