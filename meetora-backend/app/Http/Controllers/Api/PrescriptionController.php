<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Prescription\CreatePrescriptionRequest;
use App\Http\Resources\PrescriptionResource;
use App\Models\Consultation;
use App\Models\Prescription;
use App\Services\PrescriptionService;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
class PrescriptionController extends Controller
{
    public function __construct(private readonly PrescriptionService $prescriptionService)
    {
    }

    public function store(CreatePrescriptionRequest $request, Consultation $consultation)
    {
        abort_if($consultation->doctor_id !== $request->user()->doctor->id, 403, 'Unauthorized');

        $prescription = $this->prescriptionService->create($consultation, $request->validated());
        $prescription->load(['doctor.user', 'patient.user', 'items']);

        return response()->json([
            'success' => true,
            'message' => 'Prescription created successfully',
            'data' => new PrescriptionResource($prescription),
        ], 201);
    }

    public function doctorShow(Request $request, Prescription $prescription)
    {
        abort_if($prescription->doctor_id !== $request->user()->doctor->id, 403, 'Unauthorized');

        $prescription->load(['doctor.user', 'patient.user', 'items']);

        return response()->json([
            'success' => true,
            'data' => new PrescriptionResource($prescription),
        ]);
    }

    public function patientIndex(Request $request)
    {
        $patient = $request->user()->patient;
        abort_if(!$patient, 404, 'Patient profile not found.');
        $prescriptions = $patient->prescriptions()
            ->with([
                'doctor.user',
                'doctor.specialty',
                'patient.user',
                'items',
            ])
            ->orderByDesc('prescribed_at')
            ->paginate($request->integer('per_page', 10));
        return response()->json([
            'success' => true,
            'data' => PrescriptionResource::collection($prescriptions),
            'meta' => [
                'current_page' => $prescriptions->currentPage(),
                'last_page' => $prescriptions->lastPage(),
                'per_page' => $prescriptions->perPage(),
                'total' => $prescriptions->total(),
            ],
        ]);
    }

    public function patientShow(Request $request, Prescription $prescription)
    {
        abort_if($prescription->patient_id !== $request->user()->patient->id, 403, 'Unauthorized');

        $prescription->load(['doctor.user', 'patient.user', 'items']);

        return response()->json([
            'success' => true,
            'data' => new PrescriptionResource($prescription),
        ]);
    }
    public function download(Request $request, Prescription $prescription)
    {
        $patient = $request->user()->patient;
        abort_if(
            !$patient || $prescription->patient_id !== $patient->id,
            403,
            'Unauthorized'
        );
        $prescription->load([
            'doctor.user',
            'doctor.specialty',
            'patient.user',
            'items',
        ]);
        $pdf = Pdf::loadView(
            'pdf.prescription',
            [
                'prescription' => $prescription,
            ]
        );
        return $pdf->download(
            'prescription-' . $prescription->id . '.pdf'
        );
    }
}