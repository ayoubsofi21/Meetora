<?php

namespace App\Services;

use App\Enums\UserRole;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DoctorService
{
    public function create(array $data): Doctor
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => UserRole::DOCTOR,
            ]);

            return Doctor::create([
                'user_id' => $user->id,
                'specialty_id' => $data['specialty_id'],
                'phone' => $data['phone'] ?? null,
                'address' => $data['address'] ?? null,
                'bio' => $data['bio'] ?? null,
                'license_number' => $data['license_number'] ?? null,
            ]);
        });
    }

    public function update(Doctor $doctor, array $data): Doctor
    {
        $doctor->update($data);

        return $doctor->fresh(['user', 'specialty']);
    }
}