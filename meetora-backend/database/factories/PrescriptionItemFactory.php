<?php

namespace Database\Factories;

use App\Models\Prescription;
use Illuminate\Database\Eloquent\Factories\Factory;

class PrescriptionItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            'prescription_id' => Prescription::factory(),
            'medication_name' => fake()->randomElement(['Paracetamol', 'Ibuprofen', 'Amoxicillin']),
            'dosage' => '500mg',
            'frequency' => '2 fois par jour',
            'duration' => '5 jours',
            'instructions' => fake()->sentence(),
        ];
    }
}