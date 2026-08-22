<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\MedicalRecord;
use App\Policies\MedicalRecordPolicy;
use Illuminate\Support\Facades\Gate;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
         Gate::policy(MedicalRecord::class, MedicalRecordPolicy::class);
    }
}
