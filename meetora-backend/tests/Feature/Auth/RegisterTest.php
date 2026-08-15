<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Ahmed Ali',
            'email' => 'ahmed@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.user.role', 'patient')
            ->assertJsonStructure([
                'data' => ['user' => ['id', 'name', 'email', 'role'], 'token'],
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'ahmed@example.com',
            'role' => 'patient',
        ]);
    }

    public function test_role_cannot_be_forced_to_admin(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Hacker',
            'email' => 'hacker@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'admin',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.user.role', 'patient');
    }

    public function test_email_must_be_unique(): void
    {
        User::factory()->create(['email' => 'ahmed@example.com']);

        $response = $this->postJson('/api/auth/register', [
            'name' => 'Ahmed Ali',
            'email' => 'ahmed@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('email');
    }

    public function test_password_requires_confirmation(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Ahmed Ali',
            'email' => 'ahmed@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'WrongConfirmation!',
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('password');
    }
    public function test_patient_profile_is_created_automatically_on_register(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Ahmed Ali',
            'email' => 'ahmed@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertStatus(201);

        $user = \App\Models\User::where('email', 'ahmed@example.com')->first();
        $this->assertNotNull($user->patient);
    }
}