<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HumainController;
use App\Http\Controllers\CoursController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GroupeClasseController;
use App\Http\Controllers\InscriptionsController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\ProfController;
use App\Http\Controllers\SeanceController;
use App\Http\Controllers\SuperAdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/create', function () {
    return Inertia::render('Create');
})->middleware(['auth', 'verified', 'permission',])->name('create');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


//routes pour la gestion des humains
Route::post('/humain', [HumainController::class, 'store'])->middleware(['auth', 'verified', 'permission',])->name('humain.store');
Route::get('/humains', [HumainController::class, 'index'])
    ->middleware(['auth', 'verified', 'permission',])
    ->name('humains.index');
Route::get('/humain/create', [HumainController::class, 'create'])->middleware(['auth', 'verified', 'permission',])->name('humain.create');
Route::get('/humain/search', [HumainController::class, 'showSearch'])->middleware(['auth', 'verified', 'permission',])->name('humain.search');
//searchbyname
Route::get('/humain/searchbyname', [HumainController::class, 'searchByName'])->middleware(['auth', 'verified', 'permission',])->name('humain.searchbyname');

Route::get('/humain/{id}', [HumainController::class, 'show'])->middleware(['auth', 'verified', 'permission',])->name('humain.show');

//routes pour la gestion des profs
Route::get('profs', [ProfController::class, 'index'])->middleware(['auth', 'verified', 'permission',])->name('profs.index');
Route::post('prof/promote', [ProfController::class, 'store'])->middleware(['auth', 'verified', 'permission',])->name('prof.promote');
Route::get('prof/search', [ProfController::class, 'showSearch'])->middleware(['auth', 'verified', 'permission',])->name('prof.search');
Route::get('prof/searchbyname', [ProfController::class, 'searchByName'])->middleware(['auth', 'verified', 'permission',])->name('prof.searchbyname');
Route::post('prof/demote', [ProfController::class, 'destroy'])->middleware(['auth', 'verified', 'permission',])->name('prof.demote');
Route::get('prof/create', [HumainController::class, 'showSearch'])->middleware(['auth', 'verified', 'permission',])->name('prof.create');

Route::get('prof/{id}', [ProfController::class, 'show'])->middleware(['auth', 'verified', 'permission',])->name('prof.show');

//routes pour la gestion des cours
Route::get('cours', [CoursController::class, 'index'])->middleware(['auth', 'verified', 'permission',])->name('cours.index');
Route::post('cour', [CoursController::class, 'store'])->middleware(['auth', 'verified', 'permission',])->name('cours.store');
Route::get('cour/create', [CoursController::class, 'create'])->middleware(['auth', 'verified', 'permission',])->name('cours.create');
Route::get('cour/search', [CoursController::class, 'showSearch'])->middleware(['auth', 'verified', 'permission',])->name('cours.search');
Route::get('cour/searchbyname', [CoursController::class, 'searchByName'])->middleware(['auth', 'verified', 'permission',])->name('cours.searchbyname');

Route::get('cour/{id}', [CoursController::class, 'show'])->middleware(['auth', 'verified', 'permission',])->name('cours.show');

//routes pour la gestion des seances
Route::get('seances', [SeanceController::class, 'index'])->middleware(['auth', 'verified', 'permission',])->name('seances.index');
Route::get('seance/create', [SeanceController::class, 'create'])->middleware(['auth', 'verified', 'permission',])->name('seance.create');
Route::post('seance', [SeanceController::class, 'store'])->middleware(['auth', 'verified', 'permission',])->name('seance.store');

//routes pour la gestion des options
Route::get('options', [OptionController::class, 'index'])->middleware(['auth', 'verified', 'permission',])->name('options.index');
Route::get('option/create', [OptionController::class, 'create'])->middleware(['auth', 'verified', 'permission',])->name('option.create');
Route::post('option', [OptionController::class, 'store'])->middleware(['auth', 'verified', 'permission',])->name('option.store');
Route::get('option/{id}', [OptionController::class, 'show'])->middleware(['auth', 'verified', 'permission',])->name('option.show');

//routes pour la gestion des groupesclasses
Route::get('gcs', [GroupeClasseController::class, 'index'])->middleware(['auth', 'verified', 'permission',])->name('gcs.index');
Route::get('gc/create', [GroupeClasseController::class, 'create'])->middleware(['auth', 'verified', 'permission',])->name('gc.create');
Route::post('gc', [GroupeClasseController::class, 'store'])->middleware(['auth', 'verified', 'permission',])->name('gc.store');
Route::get('gc/{id}', [GroupeClasseController::class, 'show'])->middleware(['auth', 'verified', 'permission',])->name('gc.show');

//dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified', 'permission',])->name('dashboard');

//inscriptions
Route::post('/inscription', [InscriptionsController::class, 'store'])->middleware(['auth', 'verified', 'permission',])->name('inscription.store');
Route::post('/desinscription', [InscriptionsController::class, 'destroy'])->middleware(['auth', 'verified', 'permission',])->name('desinscription.destroy');

//superadmin routes
Route::get('/superadmin', [SuperAdminController::class, 'index'])->middleware(['auth', 'verified'])->name('superadmin.index');
Route::post('/superadmin/addRoleToUser', [SuperAdminController::class, 'addRoleToUser'])->middleware(['auth', 'verified'])->name('superadmin.addRoleToUser');
Route::post('/superadmin/removeRoleFromUser', [SuperAdminController::class, 'removeRoleFromUser'])->middleware(['auth', 'verified'])->name('superadmin.removeRoleFromUser');
Route::post('/superadmin/editPermissionsOfRole', [SuperAdminController::class, 'editPermissionsOfRole'])->middleware(['auth', 'verified'])->name('superadmin.editPermissionsOfRole');
require __DIR__ . '/auth.php';
