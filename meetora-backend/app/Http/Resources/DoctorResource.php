<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DoctorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->user->name,
            'email' => $this->user->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'bio' => $this->bio,
            'license_number' => $this->license_number,
            'is_active' => $this->is_active,
            'specialty' => new SpecialtyResource($this->whenLoaded('specialty')),
            'created_at' => $this->created_at,
        ];
    }
}