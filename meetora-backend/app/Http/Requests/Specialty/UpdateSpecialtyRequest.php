<?php

namespace App\Http\Requests\Specialty;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSpecialtyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'sometimes', 'required', 'string', 'max:255',
                Rule::unique('specialties', 'name')->ignore($this->route('specialty')),
            ],
            'description' => ['nullable', 'string'],
        ];
    }
}