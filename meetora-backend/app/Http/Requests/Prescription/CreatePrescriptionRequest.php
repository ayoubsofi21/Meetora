<?php

namespace App\Http\Requests\Prescription;

use Illuminate\Foundation\Http\FormRequest;

class CreatePrescriptionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'notes' => ['nullable', 'string'],
            'medications' => ['required', 'array', 'min:1'],
            'medications.*.medication_name' => ['required', 'string', 'max:255'],
            'medications.*.dosage' => ['nullable', 'string', 'max:100'],
            'medications.*.frequency' => ['nullable', 'string', 'max:100'],
            'medications.*.duration' => ['nullable', 'string', 'max:100'],
            'medications.*.instructions' => ['nullable', 'string'],
        ];
    }
}