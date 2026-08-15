<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Patient\UpdatePatientProfileRequest;
use App\Http\Resources\PatientResource;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function profile(Request $request)
    {
        $patient = $request->user()->patient;

        return response()->json([
            'success' => true,
            'data' => new PatientResource($patient),
        ]);
    }

    public function updateProfile(UpdatePatientProfileRequest $request)
    {
        $patient = $request->user()->patient;
        $patient->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => new PatientResource($patient->fresh()),
        ]);
    }
}