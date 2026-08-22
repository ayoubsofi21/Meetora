<?php

namespace Database\Factories;

use App\Models\Consultation;
use Illuminate\Database\Eloquent\Factories\Factory;

class PrescriptionFactory extends Factory
{
    public function definition(): array
    {
        $consultation = Consultation::factory()->create();

        return [
            'consultation_id' => $consultation->id,
            'doctor_id' => $consultation->doctor_id,
            'patient_id' => $consultation->patient_id,
            'notes' => fake()->sentence(),
            'prescribed_at' => now(),
        ];
    }
}