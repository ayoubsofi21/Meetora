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
            'doctor_id' => $this->doctor_id,
            'patient_id' => $this->patient_id,

            'doctor' => [
                'id' => $this->doctor?->id,
                'name' => $this->doctor?->user?->name,
                'specialty' => $this->doctor?->specialty?->name,
            ],

            'patient' => [
                'id' => $this->patient?->id,
                'name' => $this->patient?->user?->name,
            ],

            'notes' => $this->notes,

            'prescribed_at' => $this->prescribed_at?->format('Y-m-d H:i:s'),

            'items' => PrescriptionItemResource::collection(
                $this->whenLoaded('items')
            ),

            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}