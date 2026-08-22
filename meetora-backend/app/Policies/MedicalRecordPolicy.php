<?php

namespace App\Policies;

use App\Models\MedicalRecord;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;
class MedicalRecordPolicy
{
    public function view(User $user, MedicalRecord $medicalRecord): bool
    {
        if ($user->isPatient()) {
            return $user->patient?->id === $medicalRecord->patient_id;
        }

        if ($user->isDoctor()) {
            // Contexte légitime = ce médecin a au moins un rendez-vous
            // (confirmé ou complété) avec ce patient.
            return $user->doctor->appointments()
                ->where('patient_id', $medicalRecord->patient_id)
                ->whereIn('status', ['confirmed', 'completed'])
                ->exists();
        }

        // Admin : PAS d'accès automatique, comme demandé explicitement
        // à l'ÉTAPE 23 du master plan.
        return false;
    }

    public function update(User $user, MedicalRecord $medicalRecord): bool
    {
        // Seul le patient lui-même peut modifier son propre dossier.
        return $user->isPatient() && $user->patient?->id === $medicalRecord->patient_id;
    }
}