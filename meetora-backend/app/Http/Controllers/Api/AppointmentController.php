<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Appointment\CreateAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Services\AppointmentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function __construct(private readonly AppointmentService $appointmentService)
    {
    }

    public function store(CreateAppointmentRequest $request)
    {
        $appointment = $this->appointmentService->book(
            $request->user()->patient,
            $request->validated()
        );

        $appointment->load(['doctor.user', 'doctor.specialty', 'patient.user']);

        return response()->json([
            'success' => true,
            'message' => 'Appointment booked successfully',
            'data' => new AppointmentResource($appointment),
        ], 201);
    }
}