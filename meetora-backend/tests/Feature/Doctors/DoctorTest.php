<?php

namespace Tests\Feature\Doctors;

use App\Models\Doctor;
use App\Models\Specialty;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DoctorTest extends TestCase
{
    use RefreshDatabase;

    public function test_anyone_can_list_active_doctors(): void
    {
        Doctor::factory()->count(3)->create(['is_active' => true]);
        Doctor::factory()->create(['is_active' => false]);

        $response = $this->getJson('/api/doctors');

        $response->assertStatus(200)->assertJsonCount(3, 'data');
    }

    public function test_can_view_single_doctor(): void
    {
        $doctor = Doctor::factory()->create();

        $response = $this->getJson("/api/doctors/{$doctor->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $doctor->id)
            ->assertJsonPath('data.name', $doctor->user->name);
    }

    public function test_can_filter_doctors_by_specialty(): void
    {
        $cardio = Specialty::factory()->create(['name' => 'Cardiology']);
        $derma = Specialty::factory()->create(['name' => 'Dermatology']);

        Doctor::factory()->create(['specialty_id' => $cardio->id]);
        Doctor::factory()->create(['specialty_id' => $derma->id]);

        $response = $this->getJson("/api/doctors?specialty_id={$cardio->id}");

        $response->assertStatus(200)->assertJsonCount(1, 'data');
    }

 public function test_can_search_doctors_by_specialty_name(): void
{
    $cardiology = Specialty::factory()->create([
        'name' => 'Cardiologie',
    ]);

    Doctor::factory()->create([
        'specialty_id' => $cardiology->id,
    ]);

    $dermatology = Specialty::factory()->create([
        'name' => 'Dermatologie',
    ]);

    Doctor::factory()->create([
        'specialty_id' => $dermatology->id,
    ]);

    $response = $this->getJson('/api/doctors?search=cardio');

    $response->assertStatus(200)
        ->assertJsonCount(1, 'data');
}
}