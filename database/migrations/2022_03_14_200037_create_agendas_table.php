<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgendasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agendas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bidang_id');
            $table->string('title');
            $table->string('tempat');            
            $table->date('tanggal');
            $table->time('jam_mulai');
            $table->time('jam_selesai')->nullable();
            $table->string('secara')->default('luring');
            $table->string('pic')->nullable();
            $table->string('keterangan')->nullable();
            $table->timestamps();

            $table->foreign('bidang_id')->references('id')->on('bidangs');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('agendas');
    }
}
