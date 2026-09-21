<?php

namespace App\Services;

use App\Enums\UserRole;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\MedicalRecord;
class AuthService
{
    public function register(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => UserRole::PATIENT,
            ]);

            // Patient::create([
            //     'user_id' => $user->id,
            // ]);
            $patient = Patient::create([
                'user_id' => $user->id,
            ]);
            MedicalRecord::create([
                'patient_id' => $patient->id,
            ]);

            return $user;
        });
    }
}