<?php

namespace Database\Factories;

use App\Models\Specialty;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Factories\Factory;

class DoctorFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->state(['role' => UserRole::DOCTOR]),
            'specialty_id' => Specialty::factory(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->city(),
            'bio' => fake()->paragraph(),
            'license_number' => fake()->unique()->numerify('LIC-#####'),
            'is_active' => true,
        ];
    }
}