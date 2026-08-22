<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\ConsultationResource;
use App\Http\Resources\MedicalRecordResource;
use App\Http\Resources\PrescriptionResource;
use App\Services\DashboardService;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class DashboardController extends Controller
{
    public function __construct(private readonly DashboardService $dashboardService)
    {
    }

    public function patient(Request $request)
    {
        $data = $this->dashboardService->forPatient($request->user()->patient);

        return response()->json([
            'success' => true,
            'data' => [
                'upcoming_appointments' => AppointmentResource::collection($data['upcoming_appointments']),
                'recent_consultations' => ConsultationResource::collection($data['recent_consultations']),
                'recent_prescriptions' => PrescriptionResource::collection($data['recent_prescriptions']),
                'medical_record' => $data['medical_record'] ? new MedicalRecordResource($data['medical_record']) : null,
                'statistics' => $data['statistics'],
            ],
        ]);
    }
    public function doctor(Request $request)
    {
        $data = $this->dashboardService->forDoctor($request->user()->doctor);

        return response()->json([
            'success' => true,
            'data' => [
                'today_appointments' => AppointmentResource::collection($data['today_appointments']),
                'upcoming_appointments' => AppointmentResource::collection($data['upcoming_appointments']),
                'recent_patients' => \App\Http\Resources\PatientResource::collection($data['recent_patients']),
                'statistics' => $data['statistics'],
            ],
        ]);
    }
    public function admin()
    {
        $data = $this->dashboardService->forAdmin();

        return response()->json([
            'success' => true,
            'data' => [
                'statistics' => $data['statistics'],
                'recent_appointments' => AppointmentResource::collection($data['recent_appointments']),
                'recent_users' => UserResource::collection($data['recent_users']),
                'appointments_by_status' => $data['appointments_by_status'],
                'appointments_per_day' => $data['appointments_per_day'],
            ],
        ]);
    }
}