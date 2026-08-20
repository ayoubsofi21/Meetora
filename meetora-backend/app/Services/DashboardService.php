<?php

namespace App\Services;

use App\Enums\AppointmentStatus;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Support\Carbon;

class DashboardService
{
    public function forPatient(Patient $patient): array
    {
        $upcomingAppointments = $patient->appointments()
            ->with(['doctor.user', 'doctor.specialty'])
            ->where('appointment_date', '>=', now()->toDateString())
            ->whereIn('status', [AppointmentStatus::PENDING, AppointmentStatus::CONFIRMED])
            ->orderBy('appointment_date')
            ->orderBy('start_time')
            ->limit(5)
            ->get();

        $recentConsultations = $patient->consultations()
            ->with(['doctor.user'])
            ->orderByDesc('consultation_date')
            ->limit(5)
            ->get();

        $recentPrescriptions = $patient->prescriptions()
            ->with(['doctor.user', 'items'])
            ->orderByDesc('prescribed_at')
            ->limit(5)
            ->get();

        return [
            'upcoming_appointments' => $upcomingAppointments,
            'recent_consultations' => $recentConsultations,
            'recent_prescriptions' => $recentPrescriptions,
            'medical_record' => $patient->medicalRecord,
            'statistics' => [
                'upcoming_appointments' => $patient->appointments()
                    ->where('appointment_date', '>=', now()->toDateString())
                    ->whereIn('status', [AppointmentStatus::PENDING, AppointmentStatus::CONFIRMED])
                    ->count(),
                'completed_consultations' => $patient->consultations()->count(),
            ],
        ];
    }
}