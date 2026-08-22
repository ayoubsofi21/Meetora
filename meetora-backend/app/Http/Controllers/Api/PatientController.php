<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Patient\UpdatePatientProfileRequest;
use App\Http\Resources\PatientResource;
use Illuminate\Http\Request;
use App\Models\Patient;
use App\Http\Requests\Patient\CreatePatientRequest;
use App\Http\Requests\Patient\UpdatePatientRequest;
use App\Services\PatientService;
class PatientController extends Controller
{   
      public function __construct(
        private PatientService $patientService
    ) {}
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
    public function adminIndex(Request $request)
    {
        $patients = Patient::query()
            ->with('user')
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->string('search');
                $query->whereHas('user', fn ($q) => $q->where('name', 'like', "%{$search}%"));
            })
            ->paginate($request->integer('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => PatientResource::collection($patients),
            'meta' => [
                'current_page' => $patients->currentPage(),
                'last_page' => $patients->lastPage(),
                'per_page' => $patients->perPage(),
                'total' => $patients->total(),
            ],
        ]);
    }

    public function adminStore(CreatePatientRequest $request){  
        $patient = $this->patientService->create($request->validated());
        $patient->load('user');

        return response()->json([
            'success' => true,
            'message' => 'Patient created successfully',
            'data' => new PatientResource($patient),
        ], 201);
    }

    public function adminShow(Patient $patient)
    {
        $patient->load('user');

        return response()->json([
            'success' => true,
            'data' => new PatientResource($patient),
        ]);
    }

    public function adminUpdate(UpdatePatientRequest $request, Patient $patient)
    {
        $patient = $this->patientService->update($patient, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Patient updated successfully',
            'data' => new PatientResource($patient),
        ]);
    }

    public function adminDestroy(Patient $patient)
    {
        $patient->user()->delete(); // cascade supprime le Patient

        return response()->json([
            'success' => true,
            'message' => 'Patient deleted successfully',
        ]);
    }

    public function doctorIndex(Request $request)
    {
        // Pour l'instant : tous les patients, avec recherche.
        // Sera restreint aux patients réellement liés à ce médecin
        // (via appointments) une fois STEP Appointments fait — voir note ci-dessous.
        $patients = Patient::query()
            ->with('user')
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->string('search');
                $query->whereHas('user', fn ($q) => $q->where('name', 'like', "%{$search}%"));
            })
            ->paginate($request->integer('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => PatientResource::collection($patients),
            'meta' => [
                'current_page' => $patients->currentPage(),
                'last_page' => $patients->lastPage(),
                'per_page' => $patients->perPage(),
                'total' => $patients->total(),
            ],
        ]);
    }

    public function doctorShow(Patient $patient)
    {
        $patient->load('user');

        return response()->json([
            'success' => true,
            'data' => new PatientResource($patient),
        ]);
    }
}