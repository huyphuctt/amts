<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register() {
        require_once __DIR__ . '/../Helpers/Const.php';
        require_once __DIR__ . '/../Helpers/Utils.php';
        require_once __DIR__ . '/../Helpers/CommonGet.php';
        require_once __DIR__ . '/../Helpers/CommonSet.php';
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot() {
        //
    }
}
