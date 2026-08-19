<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicalRecordResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'blood_type' => $this->blood_type,
            'allergies' => $this->allergies,
            'chronic_conditions' => $this->chronic_conditions,
            'medical_history' => $this->medical_history,
            'updated_at' => $this->updated_at,
        ];
    }
}