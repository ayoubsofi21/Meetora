<?php

namespace App\Http\Requests\Consultation;

use Illuminate\Foundation\Http\FormRequest;

class CreateConsultationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'diagnosis' => ['required', 'string'],
            'symptoms' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
            'treatment' => ['nullable', 'string'],
        ];
    }
}