<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->foreignId('specialty_id')->constrained('specialties')->restrictOnDelete();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->text('bio')->nullable();
            $table->string('license_number')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('specialty_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};