<?php

namespace Tests\Feature\Patients;

use App\Enums\UserRole;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PatientProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_patient_can_view_own_profile(): void
    {
        $patient = Patient::factory()->create();

        $response = $this->actingAs($patient->user, 'sanctum')->getJson('/api/patient/profile');

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $patient->id);
    }

    public function test_patient_can_update_own_profile(): void
    {
        $patient = Patient::factory()->create();

        $response = $this->actingAs($patient->user, 'sanctum')
            ->putJson('/api/patient/profile', [
                'phone' => '0611223344',
                'address' => 'Rabat',
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.phone', '0611223344')
            ->assertJsonPath('data.address', 'Rabat');
    }

    public function test_doctor_cannot_access_patient_profile_routes(): void
    {
        $doctor = User::factory()->create(['role' => UserRole::DOCTOR]);

        $response = $this->actingAs($doctor, 'sanctum')->getJson('/api/patient/profile');

        $response->assertStatus(403);
    }

    public function test_guest_cannot_access_patient_profile(): void
    {
        $response = $this->getJson('/api/patient/profile');

        $response->assertStatus(401);
    }

    public function test_date_of_birth_cannot_be_in_the_future(): void
    {
        $patient = Patient::factory()->create();

        $response = $this->actingAs($patient->user, 'sanctum')
            ->putJson('/api/patient/profile', [
                'date_of_birth' => now()->addYear()->toDateString(),
            ]);

        $response->assertStatus(422)->assertJsonValidationErrors('date_of_birth');
    }
}