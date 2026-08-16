<?php

namespace Tests\Unit;

use App\Enums\AppointmentStatus;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AppointmentModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_appointment_belongs_to_patient_and_doctor(): void
    {
        $appointment = Appointment::factory()->create();

        $this->assertInstanceOf(Patient::class, $appointment->patient);
        $this->assertInstanceOf(Doctor::class, $appointment->doctor);
    }

    public function test_appointment_status_defaults_to_pending(): void
    {
        $appointment = Appointment::factory()->create();

        $this->assertSame(AppointmentStatus::PENDING, $appointment->status);
    }

    public function test_doctor_has_many_appointments(): void
    {
        $doctor = Doctor::factory()->create();
        Appointment::factory()->count(2)->create(['doctor_id' => $doctor->id]);

        $this->assertCount(2, $doctor->appointments);
    }

    public function test_patient_has_many_appointments(): void
    {
        $patient = Patient::factory()->create();
        Appointment::factory()->count(3)->create(['patient_id' => $patient->id]);

        $this->assertCount(3, $patient->appointments);
    }
}