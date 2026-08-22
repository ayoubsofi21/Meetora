<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('consultations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('appointment_id')->unique()->constrained()->cascadeOnDelete();
            $table->foreignId('doctor_id')->constrained()->cascadeOnDelete();
            $table->foreignId('patient_id')->constrained()->cascadeOnDelete();
            $table->text('diagnosis');
            $table->text('symptoms')->nullable();
            $table->text('notes')->nullable();
            $table->text('treatment')->nullable();
            $table->date('consultation_date');
            $table->timestamps();

            $table->index(['doctor_id', 'consultation_date']);
            $table->index(['patient_id', 'consultation_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};