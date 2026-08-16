<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Consultation\CreateConsultationRequest;
use App\Http\Resources\ConsultationResource;
use App\Models\Appointment;
use App\Services\ConsultationService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ConsultationController extends Controller
{
    public function __construct(private readonly ConsultationService $consultationService)
    {
    }

    public function store(CreateConsultationRequest $request, Appointment $appointment)
    {
        abort_if($appointment->doctor_id !== $request->user()->doctor->id, 403, 'Unauthorized');

        $consultation = $this->consultationService->create($appointment, $request->validated());
        $consultation->load(['doctor.user', 'patient.user']);

        return response()->json([
            'success' => true,
            'message' => 'Consultation created successfully',
            'data' => new ConsultationResource($consultation),
        ], 201);
    }

    public function show(Request $request, \App\Models\Consultation $consultation)
    {
        $user = $request->user();

        $isOwnerDoctor = $user->doctor && $consultation->doctor_id === $user->doctor->id;
        $isOwnerPatient = $user->patient && $consultation->patient_id === $user->patient->id;

        abort_if(! $isOwnerDoctor && ! $isOwnerPatient, 403, 'Unauthorized');

        $consultation->load(['doctor.user', 'patient.user']);

        return response()->json([
            'success' => true,
            'data' => new ConsultationResource($consultation),
        ]);
    }
}