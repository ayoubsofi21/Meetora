<?php

namespace App\Http\Requests\Patient;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePatientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'sometimes',
                'string',
                'max:255',
            ],

            'email' => [
                'sometimes',
                'email',
                'max:255',
            ],

            'date_of_birth' => [
                'sometimes',
                'nullable',
                'date',
                'before_or_equal:today',
            ],

            'gender' => [
                'sometimes',
                'nullable',
                'string',
                'in:male,female,other',
            ],

            'phone' => [
                'sometimes',
                'nullable',
                'string',
                'max:20',
            ],

            'address' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],

            'emergency_contact' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],
        ];
    }
}