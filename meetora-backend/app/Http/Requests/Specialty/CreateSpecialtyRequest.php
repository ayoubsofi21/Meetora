<?php

namespace App\Http\Requests\Specialty;

use Illuminate\Foundation\Http\FormRequest;

class CreateSpecialtyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // contrôle réel fait par le middleware role:admin sur la route
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:specialties,name'],
            'description' => ['nullable', 'string'],
        ];
    }
}