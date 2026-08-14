<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Specialty\CreateSpecialtyRequest;
use App\Http\Requests\Specialty\UpdateSpecialtyRequest;
use App\Http\Resources\SpecialtyResource;
use App\Models\Specialty;

class SpecialtyController extends Controller
{
    public function index()
    {
        $specialties = Specialty::orderBy('name')->paginate(10);

        return response()->json([
            'success' => true,
            'data' => SpecialtyResource::collection($specialties),
            'meta' => [
                'current_page' => $specialties->currentPage(),
                'last_page' => $specialties->lastPage(),
                'per_page' => $specialties->perPage(),
                'total' => $specialties->total(),
            ],
        ]);
    }

    public function show(Specialty $specialty)
    {
        return response()->json([
            'success' => true,
            'data' => new SpecialtyResource($specialty),
        ]);
    }

    public function store(CreateSpecialtyRequest $request)
    {
        $specialty = Specialty::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Specialty created successfully',
            'data' => new SpecialtyResource($specialty),
        ], 201);
    }

    public function update(UpdateSpecialtyRequest $request, Specialty $specialty)
    {
        $specialty->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Specialty updated successfully',
            'data' => new SpecialtyResource($specialty),
        ]);
    }

    public function destroy(Specialty $specialty)
    {
        $specialty->delete();

        return response()->json([
            'success' => true,
            'message' => 'Specialty deleted successfully',
        ]);
    }
}