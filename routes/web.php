<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HumainController;
use App\Http\Controllers\CoursController;
use App\Http\Controllers\ProfController;
use App\Http\Controllers\SeanceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/create', function () {
    return Inertia::render('Create');
})->middleware(['auth', 'verified'])->name('create');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


//routes pour la gestion des humains
Route::post('/humain', [HumainController::class, 'store'])->middleware(['auth', 'verified'])->name('humain.store');
Route::get('/humains', [HumainController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('humains.index');
Route::get('/humain/create', [HumainController::class, 'create'])->middleware(['auth', 'verified'])->name('humain.create');
Route::get('/humain/search', [HumainController::class, 'showSearch'])->middleware(['auth', 'verified'])->name('humain.search');
//searchbyname
Route::get('/humain/searchbyname', [HumainController::class, 'searchByName'])->middleware(['auth', 'verified'])->name('humain.searchbyname');

Route::get('/humain/{id}', [HumainController::class, 'show'])->middleware(['auth', 'verified'])->name('humain.show');

//routes pour la gestion des profs
Route::get('profs', [ProfController::class, 'index'])->middleware(['auth', 'verified'])->name('profs.index');
Route::post('prof/promote', [ProfController::class, 'store'])->middleware(['auth', 'verified'])->name('prof.promote');
Route::get('prof/search', [ProfController::class, 'showSearch'])->middleware(['auth', 'verified'])->name('prof.search');
Route::get('prof/searchbyname', [ProfController::class, 'searchByName'])->middleware(['auth', 'verified'])->name('prof.searchbyname');
Route::post('prof/demote', [ProfController::class, 'destroy'])->middleware(['auth', 'verified'])->name('prof.demote');

Route::get('prof/{id}', [ProfController::class, 'show'])->middleware(['auth', 'verified'])->name('prof.show');

//routes pour la gestion des cours
Route::get('cours', [CoursController::class, 'index'])->middleware(['auth', 'verified'])->name('cours.index');
Route::post('cour', [CoursController::class, 'store'])->middleware(['auth', 'verified'])->name('cours.store');
Route::get('cour/create', [CoursController::class, 'create'])->middleware(['auth', 'verified'])->name('cours.create');
Route::get('cour/search', [CoursController::class, 'showSearch'])->middleware(['auth', 'verified'])->name('cours.search');
Route::get('cour/searchbyname', [CoursController::class, 'searchByName'])->middleware(['auth', 'verified'])->name('cours.searchbyname');

Route::get('cour/{id}', [CoursController::class, 'show'])->middleware(['auth', 'verified'])->name('cours.show');

//routes pour la gestion des seances
Route::get('seances', [SeanceController::class, 'index'])->middleware(['auth', 'verified'])->name('seances.index');
Route::get('seance/create', [SeanceController::class, 'create'])->middleware(['auth', 'verified'])->name('seance.create');
require __DIR__ . '/auth.php';
