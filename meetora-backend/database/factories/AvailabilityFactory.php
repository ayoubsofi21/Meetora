<?php

namespace Database\Factories;

use App\Models\Doctor;
use Illuminate\Database\Eloquent\Factories\Factory;

class AvailabilityFactory extends Factory
{
    public function definition(): array
    {
        return [
            'doctor_id' => Doctor::factory(),
            'day_of_week' => fake()->numberBetween(1, 5), // Lundi-Vendredi
            'start_time' => '09:00',
            'end_time' => '12:00',
            'is_active' => true,
        ];
    }
}