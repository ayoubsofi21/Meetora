<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Appointment\CreateAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Services\AppointmentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Enums\AppointmentStatus;
use App\Http\Requests\Appointment\UpdateAppointmentStatusRequest;
use App\Models\Appointment;
use Illuminate\Support\Facades\Auth;

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
    public function patientIndex(Request $request)
    {
        $appointments = $request->user()->patient->appointments()
            ->with(['doctor.user', 'doctor.specialty'])
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->string('status')))
            ->when($request->filled('date'), fn ($q) => $q->where('appointment_date', $request->string('date')))
            ->orderByDesc('appointment_date')
            ->orderByDesc('start_time')
            ->paginate($request->integer('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => AppointmentResource::collection($appointments),
            'meta' => $this->paginationMeta($appointments),
        ]);
    }

    public function patientShow(Request $request, Appointment $appointment)
    {
        $this->authorizePatientOwnership($request, $appointment);
        $appointment->load(['doctor.user', 'doctor.specialty']);

        return response()->json([
            'success' => true,
            'data' => new AppointmentResource($appointment),
        ]);
    }

    public function patientCancel(Request $request, Appointment $appointment)
    {
        $this->authorizePatientOwnership($request, $appointment);
        $appointment = $this->appointmentService->cancel($appointment);

        return response()->json([
            'success' => true,
            'message' => 'Appointment cancelled successfully',
            'data' => new AppointmentResource($appointment),
        ]);
    }

    public function doctorIndex(Request $request)
    {
        $appointments = $request->user()->doctor->appointments()
            ->with(['patient.user'])
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->string('status')))
            ->when($request->filled('date'), fn ($q) => $q->where('appointment_date', $request->string('date')))
            ->orderBy('appointment_date')
            ->orderBy('start_time')
            ->paginate($request->integer('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => AppointmentResource::collection($appointments),
            'meta' => $this->paginationMeta($appointments),
        ]);
    }

    public function doctorShow(Request $request, Appointment $appointment)
    {
        $this->authorizeDoctorOwnership($request, $appointment);
        $appointment->load(['patient.user']);

        return response()->json([
            'success' => true,
            'data' => new AppointmentResource($appointment),
        ]);
    }

    public function doctorConfirm(Request $request, Appointment $appointment)
    {
        $this->authorizeDoctorOwnership($request, $appointment);
        $appointment = $this->appointmentService->confirm($appointment);

        return response()->json([
            'success' => true,
            'message' => 'Appointment confirmed successfully',
            'data' => new AppointmentResource($appointment),
        ]);
    }

    public function doctorCancel(Request $request, Appointment $appointment)
    {
        $this->authorizeDoctorOwnership($request, $appointment);
        $appointment = $this->appointmentService->cancel($appointment);

        return response()->json([
            'success' => true,
            'message' => 'Appointment cancelled successfully',
            'data' => new AppointmentResource($appointment),
        ]);
    }

    public function doctorComplete(UpdateAppointmentStatusRequest $request, Appointment $appointment)
    {
        $this->authorizeDoctorOwnership($request, $appointment);
        $appointment = $this->appointmentService->complete($appointment, $request->validated('notes'));

        return response()->json([
            'success' => true,
            'message' => 'Appointment marked as completed',
            'data' => new AppointmentResource($appointment),
        ]);
    }

    public function adminIndex(Request $request)
    {
        $appointments = Appointment::query()
            ->with(['doctor.user', 'patient.user'])
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->string('status')))
            ->when($request->filled('date'), fn ($q) => $q->where('appointment_date', $request->string('date')))
            ->when($request->filled('doctor_id'), fn ($q) => $q->where('doctor_id', $request->integer('doctor_id')))
            ->when($request->filled('patient_id'), fn ($q) => $q->where('patient_id', $request->integer('patient_id')))
            ->orderByDesc('appointment_date')
            ->paginate($request->integer('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => AppointmentResource::collection($appointments),
            'meta' => $this->paginationMeta($appointments),
        ]);
    }

    public function adminShow(Appointment $appointment)
    {
        $appointment->load(['doctor.user', 'patient.user']);

        return response()->json([
            'success' => true,
            'data' => new AppointmentResource($appointment),
        ]);
    }

    private function authorizePatientOwnership(Request $request, Appointment $appointment): void
    {
        abort_if($appointment->patient_id !== $request->user()->patient->id, 403, 'Unauthorized');
    }

    private function authorizeDoctorOwnership(Request $request, Appointment $appointment): void
    {
        abort_if($appointment->doctor_id !== $request->user()->doctor->id, 403, 'Unauthorized');
    }

    private function paginationMeta($paginator): array
    {
        return [
            'current_page' => $paginator->currentPage(),
            'last_page' => $paginator->lastPage(),
            'per_page' => $paginator->perPage(),
            'total' => $paginator->total(),
        ];
    }
}