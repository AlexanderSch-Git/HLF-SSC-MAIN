<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('humains', function (Blueprint $table) {
            $table->id();
            $table->string('nom1');
            $table->string('nom2')->nullable();
            $table->string('prenom1');
            $table->string('prenom2')->nullable();
            $table->string('prenom3')->nullable();
            $table->date('date_de_naissance');
            $table->string('telephone');
            $table->string('email');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('humains');
    }
};
