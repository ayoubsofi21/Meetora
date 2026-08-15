<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\PatientController;
Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'message' => 'Meetora API is running',
    ]);
});

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/ping', function () {
        return response()->json(['success' => true, 'message' => 'admin ok']);
    });
});
use App\Http\Controllers\Api\SpecialtyController;

// Public
Route::get('/specialties', [SpecialtyController::class, 'index']);
Route::get('/specialties/{specialty}', [SpecialtyController::class, 'show']);

// Admin only
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::post('/specialties', [SpecialtyController::class, 'store']);
    Route::put('/specialties/{specialty}', [SpecialtyController::class, 'update']);
    Route::delete('/specialties/{specialty}', [SpecialtyController::class, 'destroy']);

    Route::post('/doctors', [DoctorController::class, 'store']);
    Route::put('/doctors/{doctor}', [DoctorController::class, 'update']);
    Route::delete('/doctors/{doctor}', [DoctorController::class, 'destroy']);

    Route::get('/patients', [PatientController::class, 'adminIndex']);
    Route::post('/patients', [PatientController::class, 'adminStore']);
    Route::get('/patients/{patient}', [PatientController::class, 'adminShow']);
    Route::put('/patients/{patient}', [PatientController::class, 'adminUpdate']);
    Route::delete('/patients/{patient}', [PatientController::class, 'adminDestroy']);
});
Route::middleware(['auth:sanctum', 'role:patient'])->prefix('patient')->group(function () {
    Route::get('/profile', [PatientController::class, 'profile']);
    Route::put('/profile', [PatientController::class, 'updateProfile']);
});
Route::middleware(['auth:sanctum', 'role:doctor'])->prefix('doctor')->group(function () {
    Route::get('/patients', [PatientController::class, 'doctorIndex']);
    Route::get('/patients/{patient}', [PatientController::class, 'doctorShow']);
});
Route::get('/doctors', [DoctorController::class, 'index']);
Route::get('/doctors/{doctor}', [DoctorController::class, 'show']);
Route::get('/doctors/{doctor}/profile', [DoctorController::class, 'profile']);