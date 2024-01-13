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
        /**
         * Create table inscription.
         * cours_id = foreign key to cours table.
         * user_id = foreign key to users table.
         */
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cours_id')->constrained('cours');
            $table->foreignId('user_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscriptions');
    }
};
