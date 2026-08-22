<?php

namespace Tests\Feature\Patients;

use App\Enums\UserRole;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPatientManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_list_patients(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        Patient::factory()->count(3)->create();

        $response = $this->actingAs($admin, 'sanctum')->getJson('/api/admin/patients');

        $response->assertStatus(200)->assertJsonCount(3, 'data');
    }

    public function test_admin_can_create_patient(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);

        $response = $this->actingAs($admin, 'sanctum')->postJson('/api/admin/patients', [
            'name' => 'Fatima Zahra',
            'email' => 'fatima@example.com',
            'password' => 'Password123!',
            'phone' => '0611111111',
        ]);

        $response->assertStatus(201)->assertJsonPath('data.name', 'Fatima Zahra');
        $this->assertDatabaseHas('users', ['email' => 'fatima@example.com', 'role' => 'patient']);
    }

    public function test_admin_can_search_patients_by_name(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $patient = Patient::factory()->for(User::factory()->state(['name' => 'Ahmed Special']), 'user')->create();
        Patient::factory()->create();

        $response = $this->actingAs($admin, 'sanctum')->getJson('/api/admin/patients?search=Special');

        $response->assertStatus(200)->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $patient->id);
    }

    public function test_admin_can_update_patient(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $patient = Patient::factory()->create();

        $response = $this->actingAs($admin, 'sanctum')
            ->putJson("/api/admin/patients/{$patient->id}", ['phone' => '0699999999']);

        $response->assertStatus(200)->assertJsonPath('data.phone', '0699999999');
    }

    public function test_admin_can_delete_patient(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $patient = Patient::factory()->create();

        $response = $this->actingAs($admin, 'sanctum')
            ->deleteJson("/api/admin/patients/{$patient->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('patients', ['id' => $patient->id]);
    }

    public function test_non_admin_cannot_access_admin_patient_routes(): void
    {
        $doctor = User::factory()->create(['role' => UserRole::DOCTOR]);

        $response = $this->actingAs($doctor, 'sanctum')->getJson('/api/admin/patients');

        $response->assertStatus(403);
    }
}