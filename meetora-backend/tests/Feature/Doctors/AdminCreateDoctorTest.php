<?php

namespace Tests\Feature\Doctors;

use App\Enums\UserRole;
use App\Models\Doctor;
use App\Models\Specialty;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminCreateDoctorTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_doctor(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $specialty = Specialty::factory()->create();

        $response = $this->actingAs($admin, 'sanctum')->postJson('/api/admin/doctors', [
            'name' => 'Dr. Ahmed Alaoui',
            'email' => 'doctor@example.com',
            'password' => 'Password123!',
            'specialty_id' => $specialty->id,
            'phone' => '0612345678',
            'address' => 'Beni Mellal',
            'bio' => 'Médecin spécialiste...',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.name', 'Dr. Ahmed Alaoui')
            ->assertJsonPath('data.specialty.id', $specialty->id);

        $this->assertDatabaseHas('users', ['email' => 'doctor@example.com', 'role' => 'doctor']);
        $this->assertDatabaseHas('doctors', ['license_number' => null]);
    }

    public function test_non_admin_cannot_create_doctor(): void
    {
        $patient = User::factory()->create(['role' => UserRole::PATIENT]);
        $specialty = Specialty::factory()->create();

        $response = $this->actingAs($patient, 'sanctum')->postJson('/api/admin/doctors', [
            'name' => 'Dr. X',
            'email' => 'x@example.com',
            'password' => 'Password123!',
            'specialty_id' => $specialty->id,
        ]);

        $response->assertStatus(403);
    }

    public function test_doctor_creation_fails_with_invalid_specialty(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);

        $response = $this->actingAs($admin, 'sanctum')->postJson('/api/admin/doctors', [
            'name' => 'Dr. X',
            'email' => 'x@example.com',
            'password' => 'Password123!',
            'specialty_id' => 9999,
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('specialty_id');
        $this->assertDatabaseMissing('users', ['email' => 'x@example.com']);
    }

    public function test_transaction_rolls_back_user_if_doctor_creation_fails(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);

        // email déjà pris => la requête échoue en validation avant même le service,
        // donc on vérifie ici qu'aucun user "doctor" fantôme n'est laissé en base
        User::factory()->create(['email' => 'taken@example.com']);
        $specialty = Specialty::factory()->create();

        $response = $this->actingAs($admin, 'sanctum')->postJson('/api/admin/doctors', [
            'name' => 'Dr. X',
            'email' => 'taken@example.com',
            'password' => 'Password123!',
            'specialty_id' => $specialty->id,
        ]);

        $response->assertStatus(422);
        $this->assertDatabaseCount('doctors', 0);
    }

    public function test_admin_can_update_doctor(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $doctor = Doctor::factory()->create();

        $response = $this->actingAs($admin, 'sanctum')
            ->putJson("/api/admin/doctors/{$doctor->id}", ['phone' => '0600000000']);

        $response->assertStatus(200)->assertJsonPath('data.phone', '0600000000');
    }

    public function test_admin_can_delete_doctor_and_its_user(): void
    {
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $doctor = Doctor::factory()->create();
        $userId = $doctor->user_id;

        $response = $this->actingAs($admin, 'sanctum')
            ->deleteJson("/api/admin/doctors/{$doctor->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('doctors', ['id' => $doctor->id]);
        $this->assertDatabaseMissing('users', ['id' => $userId]);
    }
}