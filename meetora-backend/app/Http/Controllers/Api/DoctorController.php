<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DoctorResource;
use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    public function index(Request $request)
    {
        $doctors = Doctor::query()
            ->with(['user', 'specialty'])
            ->where('is_active', true)
            ->when($request->filled('specialty_id'), function ($query) use ($request) {
                $query->where('specialty_id', $request->integer('specialty_id'));
            })
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->string('search');
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })->orWhereHas('specialty', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
            })
            ->paginate($request->integer('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => DoctorResource::collection($doctors),
            'meta' => [
                'current_page' => $doctors->currentPage(),
                'last_page' => $doctors->lastPage(),
                'per_page' => $doctors->perPage(),
                'total' => $doctors->total(),
            ],
        ]);
    }

    public function show(Doctor $doctor)
    {
        $doctor->load(['user', 'specialty']);

        return response()->json([
            'success' => true,
            'data' => new DoctorResource($doctor),
        ]);
    }

    public function profile(Doctor $doctor)
    {
        // Identique à show() pour l'instant — endpoint séparé prévu par le
        // cahier des charges (ÉTAPE 8), pourra inclure plus tard des données
        // supplémentaires (ex. disponibilités) une fois STEP 7 fait.
        return $this->show($doctor);
    }
}