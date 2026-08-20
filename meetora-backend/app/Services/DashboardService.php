<?php

namespace App\Services;

use App\Enums\AppointmentStatus;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Support\Carbon;
use App\Models\User;
use Illuminate\Support\Facades\DB;
class DashboardService
{   
    public function forAdmin(): array
    {
        $statistics = [
            'total_patients' => Patient::count(),
            'total_doctors' => Doctor::count(),
            'total_appointments' => \App\Models\Appointment::count(),
            'completed_appointments' => \App\Models\Appointment::where('status', AppointmentStatus::COMPLETED)->count(),
            'pending_appointments' => \App\Models\Appointment::where('status', AppointmentStatus::PENDING)->count(),
            'cancelled_appointments' => \App\Models\Appointment::where('status', AppointmentStatus::CANCELLED)->count(),
        ];

        $recentAppointments = \App\Models\Appointment::query()
            ->with(['doctor.user', 'patient.user'])
            ->orderByDesc('created_at')
            ->limit(10)
            ->get();

        $recentUsers = User::query()
            ->orderByDesc('created_at')
            ->limit(10)
            ->get();

        $appointmentsByStatus = \App\Models\Appointment::query()
            ->select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status');

        $appointmentsPerDay = \App\Models\Appointment::query()
            ->where('appointment_date', '>=', now()->subDays(30)->toDateString())
            ->select('appointment_date', DB::raw('count(*) as total'))
            ->groupBy('appointment_date')
            ->orderBy('appointment_date')
            ->pluck('total', 'appointment_date');

        return [
            'statistics' => $statistics,
            'recent_appointments' => $recentAppointments,
            'recent_users' => $recentUsers,
            'appointments_by_status' => $appointmentsByStatus,
            'appointments_per_day' => $appointmentsPerDay,
        ];
    }
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