<?php

namespace Database\Factories;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PatientFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->state(['role' => UserRole::PATIENT]),
            'date_of_birth' => fake()->date(),
            'gender' => fake()->randomElement(['male', 'female']),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->city(),
            'emergency_contact' => fake()->phoneNumber(),
        ];
    }
}