<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SpecialtyFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement([
                'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics',
                'Orthopedics', 'Psychiatry', 'Ophthalmology', 'General Medicine',
            ]) . ' ' . fake()->unique()->numberBetween(1, 1000),
            'description' => fake()->sentence(),
        ];
    }
}