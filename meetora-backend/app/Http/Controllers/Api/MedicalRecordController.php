<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MedicalRecord\UpdateMedicalRecordRequest;
use App\Http\Resources\MedicalRecordResource;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

use App\Http\Resources\AppointmentResource;
use App\Http\Resources\ConsultationResource;
use App\Http\Resources\PrescriptionResource;
class MedicalRecordController extends Controller
{
    public function myRecord(Request $request)
    {
        $record = $request->user()->patient->medicalRecord;

        if (! $record) {
            $record = $request->user()->patient->medicalRecord()->create([]);
        }

        Gate::authorize('view', $record);

        return response()->json([
            'success' => true,
            'data' => new MedicalRecordResource($record),
        ]);
    }

    public function updateMyRecord(UpdateMedicalRecordRequest $request)
    {
        $record = $request->user()->patient->medicalRecord;

        if (! $record) {
            $record = $request->user()->patient->medicalRecord()->create([]);
        }

        Gate::authorize('update', $record);

        $record->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Medical record updated successfully',
            'data' => new MedicalRecordResource($record->fresh()),
        ]);
    }

    public function doctorShow(Request $request, Patient $patient)
    {
        $record = $patient->medicalRecord;

        if (! $record) {
            $record = $patient->medicalRecord()->create([]);
        }

        Gate::authorize('view', $record);

        return response()->json([
            'success' => true,
            'data' => new MedicalRecordResource($record),
        ]);
    }
    

    public function myHistory(Request $request)
    {
        $patient = $request->user()->patient;

        $consultations = $patient->consultations()
            ->with(['doctor.user', 'doctor.specialty'])
            ->orderByDesc('consultation_date')
            ->get();

        $prescriptions = $patient->prescriptions()
            ->with(['doctor.user', 'items'])
            ->orderByDesc('prescribed_at')
            ->get();

        $appointments = $patient->appointments()
            ->with(['doctor.user', 'doctor.specialty'])
            ->orderByDesc('appointment_date')
            ->orderByDesc('start_time')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'consultations' => ConsultationResource::collection($consultations),
                'prescriptions' => PrescriptionResource::collection($prescriptions),
                'appointments' => AppointmentResource::collection($appointments),
            ],
        ]);
    }
}