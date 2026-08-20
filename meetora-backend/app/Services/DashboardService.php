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
    public function forDoctor(Doctor $doctor): array
    {
      $todayAppointments = $doctor->appointments()
        ->with(['patient.user'])
        ->whereDate('appointment_date', today())
        ->whereIn('status', [
            AppointmentStatus::PENDING,
            AppointmentStatus::CONFIRMED,
        ])
        ->orderBy('start_time')
        ->get();

        $upcomingAppointments = $doctor->appointments()
            ->with(['patient.user'])
            ->where('appointment_date', '>', now()->toDateString())
            ->whereIn('status', [AppointmentStatus::PENDING, AppointmentStatus::CONFIRMED])
            ->orderBy('appointment_date')
            ->orderBy('start_time')
            ->limit(5)
            ->get();

        $recentPatients = $doctor->appointments()
            ->with(['patient.user'])
            ->whereIn('status', [AppointmentStatus::CONFIRMED, AppointmentStatus::COMPLETED])
            ->orderByDesc('appointment_date')
            ->limit(5)
            ->get()
            ->pluck('patient')
            ->unique('id')
            ->values();

        return [
            'today_appointments' => $todayAppointments,
            'upcoming_appointments' => $upcomingAppointments,
            'recent_patients' => $recentPatients,
            'statistics' => [
                'today_appointments' => $todayAppointments->count(),
                'pending_appointments' => $doctor->appointments()
                    ->where('status', AppointmentStatus::PENDING)
                    ->count(),
                'completed_consultations' => $doctor->consultations()->count(),
            ],
        ];
    }
}