<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Enums\AppointmentStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConsultationFactory extends Factory
{
    public function definition(): array
    {
        $appointment = Appointment::factory()->create(['status' => AppointmentStatus::CONFIRMED]);

        return [
            'appointment_id' => $appointment->id,
            'doctor_id' => $appointment->doctor_id,
            'patient_id' => $appointment->patient_id,
            'diagnosis' => fake()->sentence(),
            'symptoms' => fake()->sentence(),
            'notes' => fake()->paragraph(),
            'treatment' => fake()->sentence(),
            'consultation_date' => now()->toDateString(),
        ];
    }
}