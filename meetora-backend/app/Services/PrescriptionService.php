<?php

namespace App\Services;

use App\Models\Consultation;
use App\Models\Prescription;
use Illuminate\Support\Facades\DB;

class PrescriptionService
{
    public function create(Consultation $consultation, array $data): Prescription
    {
        return DB::transaction(function () use ($consultation, $data) {
            $prescription = Prescription::create([
                'consultation_id' => $consultation->id,
                'doctor_id' => $consultation->doctor_id,
                'patient_id' => $consultation->patient_id,
                'notes' => $data['notes'] ?? null,
                'prescribed_at' => now(),
            ]);

            foreach ($data['medications'] as $medication) {
                $prescription->items()->create($medication);
            }

            return $prescription;
        });
    }
}