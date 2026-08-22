<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AvailabilityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'doctor_id' => $this->doctor_id,
            'day_of_week' => $this->day_of_week,
            'start_time' => substr($this->start_time, 0, 5), // "09:00:00" -> "09:00"
            'end_time' => substr($this->end_time, 0, 5),
            'is_active' => $this->is_active,
        ];
    }
}