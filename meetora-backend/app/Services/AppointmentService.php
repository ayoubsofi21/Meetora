<?php

namespace App\Services;

use App\Enums\AppointmentStatus;
use App\Models\Appointment;
use App\Models\Availability;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class AppointmentService
{
    public function book(Patient $patient, array $data): Appointment
    {
        return DB::transaction(function () use ($patient, $data) {

            $doctor = Doctor::find($data['doctor_id']);

            if (!$doctor || !$doctor->is_active) {
                throw ValidationException::withMessages([
                    'doctor_id' => ['The selected doctor is not active.'],
                ]);
            }

            /*
             * Check availability
             */
            $date = \Carbon\Carbon::parse($data['appointment_date']);

            $availability = Availability::query()
                ->where('doctor_id', $doctor->id)
                ->where('day_of_week', $date->dayOfWeek)
                ->where('start_time', '<=', $data['start_time'])
                ->where('end_time', '>=', $data['end_time'])
                ->exists();

            if (!$availability) {
                throw ValidationException::withMessages([
                    'start_time' => ['The selected time is outside the doctor availability.'],
                ]);
            }

            /*
             * Check doctor conflict
             */
            $doctorConflict = Appointment::query()
                ->where('doctor_id', $doctor->id)
                ->whereDate('appointment_date', $data['appointment_date'])
                ->whereIn('status', [
                    AppointmentStatus::PENDING,
                    AppointmentStatus::CONFIRMED,
                ])
                ->where(function ($query) use ($data) {
                    $query
                        ->where('start_time', '<', $data['end_time'])
                        ->where('end_time', '>', $data['start_time']);
                })
                ->exists();

            if ($doctorConflict) {
                throw ValidationException::withMessages([
                    'start_time' => [
                        'The selected time slot is already booked for this doctor.'
                    ],
                ]);
            }

            /*
             * Check patient conflict
             */
            $patientConflict = Appointment::query()
                ->where('patient_id', $patient->id)
                ->whereDate('appointment_date', $data['appointment_date'])
                ->whereIn('status', [
                    AppointmentStatus::PENDING,
                    AppointmentStatus::CONFIRMED,
                ])
                ->where(function ($query) use ($data) {
                    $query
                        ->where('start_time', '<', $data['end_time'])
                        ->where('end_time', '>', $data['start_time']);
                })
                ->exists();

            if ($patientConflict) {
                throw ValidationException::withMessages([
                    'doctor_id' => [
                        'The patient already has an appointment during this time.'
                    ],
                ]);
            }

            /*
             * Create appointment
             */
            return Appointment::create([
                'patient_id' => $patient->id,
                'doctor_id' => $doctor->id,
                'appointment_date' => $data['appointment_date'],
                'start_time' => $data['start_time'],
                'end_time' => $data['end_time'],
                'status' => AppointmentStatus::PENDING,
                'reason' => $data['reason'] ?? null,
                'notes' => $data['notes'] ?? null,
            ]);
        });
    }
    public function confirm(Appointment $appointment): Appointment
    {
        if ($appointment->status !== AppointmentStatus::PENDING) {
            throw ValidationException::withMessages([
                'status' => ['Only pending appointments can be confirmed.'],
            ]);
        }

        $appointment->update(['status' => AppointmentStatus::CONFIRMED]);

        return $appointment;
    }

    public function cancel(Appointment $appointment): Appointment
    {
        if (in_array($appointment->status, [AppointmentStatus::CANCELLED, AppointmentStatus::COMPLETED], true)) {
            throw ValidationException::withMessages([
                'status' => ['This appointment cannot be cancelled anymore.'],
            ]);
        }

        $appointment->update(['status' => AppointmentStatus::CANCELLED]);

        return $appointment;
    }

    public function complete(Appointment $appointment, ?string $notes = null): Appointment
    {
        if ($appointment->status !== AppointmentStatus::CONFIRMED) {
            throw ValidationException::withMessages([
                'status' => ['Only confirmed appointments can be completed.'],
            ]);
        }

        $appointment->update([
            'status' => AppointmentStatus::COMPLETED,
            'notes' => $notes ?? $appointment->notes,
        ]);

        return $appointment;
    }
}