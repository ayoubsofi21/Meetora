<?php

namespace Tests\Feature\Patients;

use App\Enums\UserRole;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DoctorPatientAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_doctor_can_list_patients(): void
    {
        $doctor = User::factory()->create(['role' => UserRole::DOCTOR]);
        Patient::factory()->count(2)->create();

        $response = $this->actingAs($doctor, 'sanctum')->getJson('/api/doctor/patients');

        $response->assertStatus(200)->assertJsonCount(2, 'data');
    }

    public function test_patient_cannot_access_doctor_patient_routes(): void
    {
        $patient = Patient::factory()->create();

        $response = $this->actingAs($patient->user, 'sanctum')->getJson('/api/doctor/patients');

        $response->assertStatus(403);
    }
}