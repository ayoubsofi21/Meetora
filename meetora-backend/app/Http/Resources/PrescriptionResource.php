<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrescriptionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'consultation_id' => $this->consultation_id,
            'notes' => $this->notes,
            'prescribed_at' => $this->prescribed_at->toIso8601String(),
            'doctor' => new DoctorResource($this->whenLoaded('doctor')),
            'patient' => new PatientResource($this->whenLoaded('patient')),
            'medications' => PrescriptionItemResource::collection($this->whenLoaded('items')),
        ];
    }
}