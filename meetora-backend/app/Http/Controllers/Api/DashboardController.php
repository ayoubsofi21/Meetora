<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\ConsultationResource;
use App\Http\Resources\MedicalRecordResource;
use App\Http\Resources\PrescriptionResource;
use App\Services\DashboardService;
use Illuminate\Http\Request;

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
}