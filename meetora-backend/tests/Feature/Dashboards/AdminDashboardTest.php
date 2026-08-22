<?php

namespace Tests\Feature\Dashboards;

use App\Enums\AppointmentStatus;
use App\Enums\UserRole;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_dashboard_returns_expected_structure(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);

        $response = $this->actingAs($admin, 'sanctum')->getJson('/api/admin/dashboard');

        $response->assertStatus(200)->assertJsonStructure([
            'data' => [
                'statistics' => [
                    'total_patients', 'total_doctors', 'total_appointments',
                    'completed_appointments', 'pending_appointments', 'cancelled_appointments',
                ],
                'recent_appointments',
                'recent_users',
                'appointments_by_status',
                'appointments_per_day',
            ],
        ]);
    }

   public function test_statistics_reflect_real_counts(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);

        $doctors = Doctor::factory()->count(2)->create();
        $patients = Patient::factory()->count(3)->create();

        Appointment::factory()->create([
            'doctor_id' => $doctors->first()->id,
            'patient_id' => $patients->first()->id,
            'status' => AppointmentStatus::PENDING,
        ]);

        Appointment::factory()->create([
            'doctor_id' => $doctors->first()->id,
            'patient_id' => $patients->get(1)->id,
            'status' => AppointmentStatus::COMPLETED,
        ]);

        Appointment::factory()->create([
            'doctor_id' => $doctors->get(1)->id,
            'patient_id' => $patients->get(2)->id,
            'status' => AppointmentStatus::CANCELLED,
        ]);

        $response = $this->actingAs($admin, 'sanctum')
            ->getJson('/api/admin/dashboard');

        $response->assertStatus(200)
            ->assertJsonPath('data.statistics.total_doctors', 2)
            ->assertJsonPath('data.statistics.total_patients', 3)
            ->assertJsonPath('data.statistics.total_appointments', 3)
            ->assertJsonPath('data.statistics.pending_appointments', 1)
            ->assertJsonPath('data.statistics.completed_appointments', 1)
            ->assertJsonPath('data.statistics.cancelled_appointments', 1);
    }
    public function test_non_admin_cannot_access_admin_dashboard(): void
    {
        $patient = Patient::factory()->create();

        $response = $this->actingAs($patient->user, 'sanctum')->getJson('/api/admin/dashboard');

        $response->assertStatus(403);
    }

    public function test_guest_cannot_access_admin_dashboard(): void
    {
        $response = $this->getJson('/api/admin/dashboard');

        $response->assertStatus(401);
    }
}