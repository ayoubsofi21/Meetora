<?php

namespace Tests\Feature\Availabilities;

use App\Models\Availability;
use App\Models\Doctor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AvailabilityTest extends TestCase
{
    use RefreshDatabase;

    public function test_doctor_can_create_availability(): void
    {
        $doctor = Doctor::factory()->create();

        $response = $this->actingAs($doctor->user, 'sanctum')->postJson('/api/doctor/availabilities', [
            'day_of_week' => 1,
            'start_time' => '09:00',
            'end_time' => '12:00',
        ]);

        $response->assertStatus(201)->assertJsonPath('data.start_time', '09:00');
    }

    public function test_end_time_must_be_after_start_time(): void
    {
        $doctor = Doctor::factory()->create();

        $response = $this->actingAs($doctor->user, 'sanctum')->postJson('/api/doctor/availabilities', [
            'day_of_week' => 1,
            'start_time' => '12:00',
            'end_time' => '09:00',
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('end_time');
    }

    public function test_doctor_can_list_own_availabilities(): void
    {
        $doctor = Doctor::factory()->create();
        Availability::factory()->count(3)->create(['doctor_id' => $doctor->id]);
        Availability::factory()->create(); // autre médecin

        $response = $this->actingAs($doctor->user, 'sanctum')->getJson('/api/doctor/availabilities');

        $response->assertStatus(200)->assertJsonCount(3, 'data');
    }

    public function test_doctor_cannot_update_another_doctors_availability(): void
    {
        $doctorA = Doctor::factory()->create();
        $doctorB = Doctor::factory()->create();
        $availability = Availability::factory()->create(['doctor_id' => $doctorB->id]);

        $response = $this->actingAs($doctorA->user, 'sanctum')
            ->putJson("/api/doctor/availabilities/{$availability->id}", ['start_time' => '10:00']);

        $response->assertStatus(403);
    }

    public function test_doctor_cannot_delete_another_doctors_availability(): void
    {
        $doctorA = Doctor::factory()->create();
        $doctorB = Doctor::factory()->create();
        $availability = Availability::factory()->create(['doctor_id' => $doctorB->id]);

        $response = $this->actingAs($doctorA->user, 'sanctum')
            ->deleteJson("/api/doctor/availabilities/{$availability->id}");

        $response->assertStatus(403);
        $this->assertDatabaseHas('availabilities', ['id' => $availability->id]);
    }

    public function test_patient_can_view_doctor_availabilities(): void
    {
        $doctor = Doctor::factory()->create();
        Availability::factory()->create(['doctor_id' => $doctor->id, 'is_active' => true]);
        Availability::factory()->create(['doctor_id' => $doctor->id, 'is_active' => false]);

        $response = $this->getJson("/api/doctors/{$doctor->id}/availabilities");

        $response->assertStatus(200)->assertJsonCount(1, 'data');
    }
}