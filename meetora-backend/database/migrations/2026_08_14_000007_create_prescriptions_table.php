<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('consultation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('doctor_id')->constrained()->cascadeOnDelete();
            $table->foreignId('patient_id')->constrained()->cascadeOnDelete();
            $table->text('notes')->nullable();
            $table->timestamp('prescribed_at');
            $table->timestamps();

            $table->index(['patient_id', 'prescribed_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('prescriptions');
    }
};