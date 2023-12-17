<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HumainController;
use App\Http\Controllers\ProfController;
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

Route::post('/humain', [HumainController::class, 'store'])->middleware(['auth', 'verified'])->name('humain.store');
Route::get('/humains', [HumainController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('humains.index');
Route::get('/humain/create', [HumainController::class, 'create'])->middleware(['auth', 'verified'])->name('humain.create');
Route::get('/humain/search', [HumainController::class, 'showSearch'])->middleware(['auth', 'verified'])->name('humain.search');
//searchbyname
Route::get('/humain/searchbyname', [HumainController::class, 'searchByName'])->middleware(['auth', 'verified'])->name('humain.searchbyname');

Route::get('/humain/{id}', [HumainController::class, 'show'])->middleware(['auth', 'verified'])->name('humain.show');

Route::get('profs', [ProfController::class, 'index'])->middleware(['auth', 'verified'])->name('profs.index');
Route::post('prof/promote', [ProfController::class, 'store'])->middleware(['auth', 'verified'])->name('prof.promote');
Route::get('prof/search', [ProfController::class, 'showSearch'])->middleware(['auth', 'verified'])->name('prof.search');
Route::get('prof/searchbyname', [ProfController::class, 'searchByName'])->middleware(['auth', 'verified'])->name('prof.searchbyname');
Route::post('prof/demote', [ProfController::class, 'destroy'])->middleware(['auth', 'verified'])->name('prof.demote');

Route::get('prof/{id}', [ProfController::class, 'show'])->middleware(['auth', 'verified'])->name('prof.show');

require __DIR__ . '/auth.php';
