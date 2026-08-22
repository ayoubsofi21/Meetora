<?php

namespace App\Http\Requests\MedicalRecord;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMedicalRecordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // contrôle réel fait par la Policy dans le controller
    }

    public function rules(): array
    {
        return [
            'blood_type' => ['sometimes', 'nullable', 'string', 'max:10'],
            'allergies' => ['sometimes', 'nullable', 'string'],
            'chronic_conditions' => ['sometimes', 'nullable', 'string'],
            'medical_history' => ['sometimes', 'nullable', 'string'],
        ];
    }
}