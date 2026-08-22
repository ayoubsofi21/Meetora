<?php

namespace Tests\Feature\Specialties;

use App\Enums\UserRole;
use App\Models\Specialty;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SpecialtyTest extends TestCase
{
    use RefreshDatabase;

    public function test_anyone_can_list_specialties(): void
    {
        Specialty::factory()->count(3)->create();

        $response = $this->getJson('/api/specialties');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_anyone_can_view_single_specialty(): void
    {
        $specialty = Specialty::factory()->create();

        $response = $this->getJson("/api/specialties/{$specialty->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $specialty->id);
    }

    public function test_admin_can_create_specialty(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);

        $response = $this->actingAs($admin, 'sanctum')->postJson('/api/admin/specialties', [
            'name' => 'Cardiology',
            'description' => 'Heart specialist',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.name', 'Cardiology');

        $this->assertDatabaseHas('specialties', ['name' => 'Cardiology']);
    }

    public function test_patient_cannot_create_specialty(): void
    {
        $patient = User::factory()->create(['role' => UserRole::PATIENT]);

        $response = $this->actingAs($patient, 'sanctum')->postJson('/api/admin/specialties', [
            'name' => 'Cardiology',
        ]);

        $response->assertStatus(403);
    }

    public function test_guest_cannot_create_specialty(): void
    {
        $response = $this->postJson('/api/admin/specialties', [
            'name' => 'Cardiology',
        ]);

        $response->assertStatus(401);
    }

    public function test_admin_can_update_specialty(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $specialty = Specialty::factory()->create(['name' => 'Old Name']);

        $response = $this->actingAs($admin, 'sanctum')
            ->putJson("/api/admin/specialties/{$specialty->id}", ['name' => 'New Name']);

        $response->assertStatus(200)
            ->assertJsonPath('data.name', 'New Name');
    }

    public function test_admin_can_delete_specialty(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $specialty = Specialty::factory()->create();

        $response = $this->actingAs($admin, 'sanctum')
            ->deleteJson("/api/admin/specialties/{$specialty->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('specialties', ['id' => $specialty->id]);
    }

    public function test_specialty_name_must_be_unique(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        Specialty::factory()->create(['name' => 'Cardiology']);

        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/admin/specialties', ['name' => 'Cardiology']);

        $response->assertStatus(422)->assertJsonValidationErrors('name');
    }
}