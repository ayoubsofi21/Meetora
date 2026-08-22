<?php

namespace Database\Factories;

use App\Enums\AppointmentStatus;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'patient_id' => Patient::factory(),
            'doctor_id' => Doctor::factory(),
            'appointment_date' => fake()->dateTimeBetween('+1 day', '+1 month')->format('Y-m-d'),
            'start_time' => '10:00',
            'end_time' => '10:30',
            'status' => AppointmentStatus::PENDING,
            'reason' => fake()->sentence(),
        ];
    }
}