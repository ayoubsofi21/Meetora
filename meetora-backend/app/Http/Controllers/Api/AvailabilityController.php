<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Availability\CreateAvailabilityRequest;
use App\Http\Requests\Availability\UpdateAvailabilityRequest;
use App\Http\Resources\AvailabilityResource;
use App\Models\Availability;
use App\Models\Doctor;
use Illuminate\Http\Request;

class AvailabilityController extends Controller
{
    public function index(Request $request)
    {
        $availabilities = $request->user()->doctor->availabilities()
            ->orderBy('day_of_week')
            ->orderBy('start_time')
            ->get();

        return response()->json([
            'success' => true,
            'data' => AvailabilityResource::collection($availabilities),
        ]);
    }

    public function store(CreateAvailabilityRequest $request)
    {
        $availability = $request->user()->doctor->availabilities()->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Availability created successfully',
            'data' => new AvailabilityResource($availability),
        ], 201);
    }

    public function update(UpdateAvailabilityRequest $request, Availability $availability)
    {
        if ($availability->doctor_id !== $request->user()->doctor->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $availability->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Availability updated successfully',
            'data' => new AvailabilityResource($availability),
        ]);
    }

    public function destroy(Request $request, Availability $availability)
    {
        if ($availability->doctor_id !== $request->user()->doctor->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $availability->delete();

        return response()->json([
            'success' => true,
            'message' => 'Availability deleted successfully',
        ]);
    }

    public function forDoctor(Doctor $doctor)
    {
        $availabilities = $doctor->availabilities()
            ->where('is_active', true)
            ->orderBy('day_of_week')
            ->orderBy('start_time')
            ->get();

        return response()->json([
            'success' => true,
            'data' => AvailabilityResource::collection($availabilities),
        ]);
    }
}