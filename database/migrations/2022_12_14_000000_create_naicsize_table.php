<?php

use App\Models\Url;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNaicsizeTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('naicsize', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('url_id');
            $table->unsignedInteger('naics_id');
            $table->timestamp('created_at')->nullable();
            // $table->foreign('naics_id')->references('id')->on('naics')->nullOnDelete();
            // $table->foreign('url_id')->references('id')->on('urls')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('naicsize');
    }
}
