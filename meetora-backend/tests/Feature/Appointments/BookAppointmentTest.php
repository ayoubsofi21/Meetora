<?php

namespace Tests\Feature\Appointments;

use App\Enums\AppointmentStatus;
use App\Models\Appointment;
use App\Models\Availability;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookAppointmentTest extends TestCase
{
    use RefreshDatabase;

    private function nextMonday(): \Carbon\Carbon
    {
        return now()->next(\Carbon\Carbon::MONDAY);
    }

    public function test_patient_can_book_appointment_within_availability(): void
    {
        $doctor = Doctor::factory()->create(['is_active' => true]);
        $date = $this->nextMonday();
        Availability::factory()->create([
            'doctor_id' => $doctor->id,
            'day_of_week' => $date->dayOfWeek,
            'start_time' => '09:00',
            'end_time' => '12:00',
        ]);
        $patient = Patient::factory()->create();

        $response = $this->actingAs($patient->user, 'sanctum')->postJson('/api/appointments', [
            'doctor_id' => $doctor->id,
            'appointment_date' => $date->toDateString(),
            'start_time' => '10:00',
            'end_time' => '10:30',
            'reason' => 'Consultation générale',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.status', 'pending');
    }

    public function test_booking_fails_outside_availability(): void
    {
        $doctor = Doctor::factory()->create(['is_active' => true]);
        $date = $this->nextMonday();
        Availability::factory()->create([
            'doctor_id' => $doctor->id,
            'day_of_week' => $date->dayOfWeek,
            'start_time' => '09:00',
            'end_time' => '12:00',
        ]);
        $patient = Patient::factory()->create();

        $response = $this->actingAs($patient->user, 'sanctum')->postJson('/api/appointments', [
            'doctor_id' => $doctor->id,
            'appointment_date' => $date->toDateString(),
            'start_time' => '14:00',
            'end_time' => '14:30',
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('start_time');
    }

    public function test_booking_fails_for_inactive_doctor(): void
    {
        $doctor = Doctor::factory()->create(['is_active' => false]);
        $patient = Patient::factory()->create();

        $response = $this->actingAs($patient->user, 'sanctum')->postJson('/api/appointments', [
            'doctor_id' => $doctor->id,
            'appointment_date' => $this->nextMonday()->toDateString(),
            'start_time' => '10:00',
            'end_time' => '10:30',
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('doctor_id');
    }

    public function test_booking_fails_in_the_past(): void
    {
        $doctor = Doctor::factory()->create();
        $patient = Patient::factory()->create();

        $response = $this->actingAs($patient->user, 'sanctum')->postJson('/api/appointments', [
            'doctor_id' => $doctor->id,
            'appointment_date' => now()->subDay()->toDateString(),
            'start_time' => '10:00',
            'end_time' => '10:30',
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('appointment_date');
    }

    public function test_doctor_cannot_have_two_appointments_same_slot(): void
    {
        $doctor = Doctor::factory()->create(['is_active' => true]);
        $date = $this->nextMonday();
        Availability::factory()->create([
            'doctor_id' => $doctor->id,
            'day_of_week' => $date->dayOfWeek,
            'start_time' => '09:00',
            'end_time' => '12:00',
        ]);

        Appointment::factory()->create([
            'doctor_id' => $doctor->id,
            'appointment_date' => $date->toDateString(),
            'start_time' => '10:00',
            'end_time' => '10:30',
            'status' => AppointmentStatus::PENDING,
        ]);

        $patient = Patient::factory()->create();

        $response = $this->actingAs($patient->user, 'sanctum')->postJson('/api/appointments', [
            'doctor_id' => $doctor->id,
            'appointment_date' => $date->toDateString(),
            'start_time' => '10:15',
            'end_time' => '10:45',
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('start_time');
    }

    public function test_patient_cannot_book_conflicting_appointment_with_different_doctors(): void
    {
        $date = $this->nextMonday();
        $patient = Patient::factory()->create();

        $doctorA = Doctor::factory()->create(['is_active' => true]);
        Availability::factory()->create(['doctor_id' => $doctorA->id, 'day_of_week' => $date->dayOfWeek, 'start_time' => '09:00', 'end_time' => '12:00']);
        Appointment::factory()->create([
            'patient_id' => $patient->id,
            'doctor_id' => $doctorA->id,
            'appointment_date' => $date->toDateString(),
            'start_time' => '10:00',
            'end_time' => '10:30',
        ]);

        $doctorB = Doctor::factory()->create(['is_active' => true]);
        Availability::factory()->create(['doctor_id' => $doctorB->id, 'day_of_week' => $date->dayOfWeek, 'start_time' => '09:00', 'end_time' => '12:00']);

        $response = $this->actingAs($patient->user, 'sanctum')->postJson('/api/appointments', [
            'doctor_id' => $doctorB->id,
            'appointment_date' => $date->toDateString(),
            'start_time' => '10:15',
            'end_time' => '10:45',
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('doctor_id');
    }
}