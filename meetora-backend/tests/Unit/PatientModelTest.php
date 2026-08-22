<?php

namespace Tests\Unit;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PatientModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_patient_belongs_to_user(): void
    {
        $patient = Patient::factory()->create();

        $this->assertInstanceOf(User::class, $patient->user);
    }

    public function test_user_has_one_patient(): void
    {
        $patient = Patient::factory()->create();

        $this->assertTrue($patient->user->patient->is($patient));
    }

    public function test_a_user_can_have_only_one_patient_profile(): void
    {
        $patient = Patient::factory()->create();

        $this->expectException(\Illuminate\Database\QueryException::class);

        Patient::factory()->create(['user_id' => $patient->user_id]);
    }
}