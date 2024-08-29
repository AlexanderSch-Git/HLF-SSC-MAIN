<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesCreateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Créer 5 rôles
        Role::create(['name' => 'Super-Admin']); //Super Administrateur -> dev + technicien de l'établissement
        Role::create(['name' => 'Admin']); //Administrateur -> direction de l'établissement
        Role::create(['name' => 'PE']); //Professeur (Personnel Enseignant)
        Role::create(['name' => 'PA']); //Personnel Administratif
        Role::create(['name' => 'Etudiant']); //Etudiants & rôles par défaut
    }
}
