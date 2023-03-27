<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportsTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('reports', function (Blueprint $table) {
            $table->increments('id');
            $table->tinyInteger('type'); //Task report, Campaign Report,...
            $table->integer('date'); //2022121500 2022121523 YmdH
            $table->string('summary');
            $table->text('details');
            $table->timestampTz('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->unique(['type', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('reports');
    }
}
