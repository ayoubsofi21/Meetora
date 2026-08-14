<?php

namespace Tests\Feature\Auth;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleMiddlewareTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_access_admin_route(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);

        $response = $this->actingAs($admin, 'sanctum')->getJson('/api/admin/ping');

        $response->assertStatus(200);
    }

    public function test_patient_cannot_access_admin_route(): void
    {
        $patient = User::factory()->create(['role' => UserRole::PATIENT]);

        $response = $this->actingAs($patient, 'sanctum')->getJson('/api/admin/ping');

        $response->assertStatus(403)
            ->assertJson(['success' => false, 'message' => 'Unauthorized']);
    }

    public function test_unauthenticated_user_cannot_access_admin_route(): void
    {
        $response = $this->getJson('/api/admin/ping');

        $response->assertStatus(401);
    }

    public function test_doctor_cannot_access_admin_route(): void
    {
        $doctor = User::factory()->create(['role' => UserRole::DOCTOR]);

        $response = $this->actingAs($doctor, 'sanctum')->getJson('/api/admin/ping');

        $response->assertStatus(403);
    }
}