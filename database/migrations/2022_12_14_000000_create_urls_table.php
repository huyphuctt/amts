<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUrlsTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('urls', function (Blueprint $table) {
            $table->increments('id');
            $table->string('domain');
            $table->string('url')->unique();
            $table->string('contact_url')->nullable();
            $table->string('company_url')->nullable();
            $table->string('logo_url')->nullable();
            $table->string('language', 16)->nullable();
            $table->string('country', 32)->nullable();
            $table->string('naics')->nullable();
            $table->mediumText('details')->nullable();
            $table->smallInteger('status')->default(0)->comment('HTTP code, 0: not crawl yet');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable()->useCurrentOnUpdate();
            $table->timestamp('checked_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('urls');
    }
}
