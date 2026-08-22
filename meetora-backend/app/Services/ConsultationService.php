<?php

namespace App\Services;

use App\Enums\AppointmentStatus;
use App\Models\Appointment;
use App\Models\Consultation;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ConsultationService
{
    public function create(Appointment $appointment, array $data): Consultation
    {
        if ($appointment->consultation()->exists()) {
            throw ValidationException::withMessages([
                'appointment_id' => ['A consultation already exists for this appointment.'],
            ]);
        }

        if ($appointment->status !== AppointmentStatus::CONFIRMED) {
            throw ValidationException::withMessages([
                'appointment_id' => ['Only confirmed appointments can receive a consultation.'],
            ]);
        }

        return DB::transaction(function () use ($appointment, $data) {
            $consultation = Consultation::create([
                'appointment_id' => $appointment->id,
                'doctor_id' => $appointment->doctor_id,
                'patient_id' => $appointment->patient_id,
                'diagnosis' => $data['diagnosis'],
                'symptoms' => $data['symptoms'] ?? null,
                'notes' => $data['notes'] ?? null,
                'treatment' => $data['treatment'] ?? null,
                'consultation_date' => now()->toDateString(),
            ]);

            $appointment->update(['status' => AppointmentStatus::COMPLETED]);

            return $consultation;
        });
    }
}