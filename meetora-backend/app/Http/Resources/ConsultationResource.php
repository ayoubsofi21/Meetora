<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\DoctorResource;
use App\Http\Resources\PatientResource;

class ConsultationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'appointment_id' => $this->appointment_id,
            'diagnosis' => $this->diagnosis,
            'symptoms' => $this->symptoms,
            'notes' => $this->notes,
            'treatment' => $this->treatment,
            'consultation_date' => $this->consultation_date->toDateString(),
            'doctor' => new DoctorResource($this->whenLoaded('doctor')),
            'patient' => new PatientResource($this->whenLoaded('patient')),
            'created_at' => $this->created_at,
        ];
    }
}