<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MedicalRecord\UpdateMedicalRecordRequest;
use App\Http\Resources\MedicalRecordResource;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

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
}