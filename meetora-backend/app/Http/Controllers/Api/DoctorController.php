<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\SpecialtyController;
use App\Http\Requests\Doctor\CreateDoctorRequest;
use App\Http\Requests\Doctor\UpdateDoctorRequest;
use App\Http\Resources\DoctorResource;
use App\Models\Doctor;
use App\Services\DoctorService;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    public function __construct(
        private readonly DoctorService $doctorService
    ) {
    }

    public function index(Request $request)
    {
        $query = Doctor::query()
            ->where('is_active', true)
            ->with(['user', 'specialty']);

        // Filter by specialty ID
        if ($request->filled('specialty_id')) {
            $query->where('specialty_id', $request->specialty_id);
        }

        // Search by doctor name OR specialty name
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->whereHas('user', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('specialty', function ($specialtyQuery) use ($search) {
                    $specialtyQuery->where('name', 'like', "%{$search}%");
                });
            });
        }

        $doctors = $query->paginate(10);

        return DoctorResource::collection($doctors);
    }

    public function show(Doctor $doctor)
    {
        $doctor->load(['user', 'specialty']);

        return response()->json([
            'success' => true,
            'data' => new DoctorResource($doctor),
        ]);
    }

    public function store(CreateDoctorRequest $request)
    {
        $doctor = $this->doctorService->create($request->validated());
        $doctor->load(['user', 'specialty']);

        return response()->json([
            'success' => true,
            'message' => 'Doctor created successfully',
            'data' => new DoctorResource($doctor),
        ], 201);
    }

    public function update(UpdateDoctorRequest $request, Doctor $doctor)
    {
        $doctor = $this->doctorService->update(
            $doctor,
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Doctor updated successfully',
            'data' => new DoctorResource($doctor),
        ]);
    }

    public function destroy(Doctor $doctor)
    {
        $doctor->user()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Doctor deleted successfully',
        ]);
    }
}