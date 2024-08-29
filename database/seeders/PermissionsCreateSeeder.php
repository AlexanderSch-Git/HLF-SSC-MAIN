<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;

class PermissionsCreateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // récupérer toutes nos routes
        $routes = Route::getRoutes();

        // pour chaque route
        foreach ($routes as $route) {
            //si elle a un nom
            if ($route->getName()) {
                //si une permission existe pas encore a ce nom
                if (!Permission::where('name', $route->getName())->exists()) {
                    Permission::create(['name' => $route->getName()]);
                }
            }
        }
    }
}
