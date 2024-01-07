<?php

namespace App\Http\Controllers;

use App\Models\Cours;
use App\Models\Seance;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SeanceController extends Controller
{
    //affiche la liste des seances
    public function index()
    {
        //get toutes les séance jointure sur cours et prof
        try {
            $seances = Seance::all();
            return Inertia::render('Seance/Index', ['seances' => $seances]);
        } catch (ModelNotFoundException $e) {
            Log::info($e);
            return Inertia::render('Error', ['message' => 'aucune séance trouvée.']);
        }
    }

    //affiche la page pour créer une séance
    public function create()
    {
        try {
            Log::info('SeanceController@create');

            // 1  get tous les cours
            $cours = CoursController::getCours();
            //2 get tous les profs
            $profs = ProfController::getProfs();
            //3 render la page create avec les cours et les profs
            return Inertia::render('Seance/Create', [
                'Cours' => $cours,
                'Profs' => $profs
            ]);
        } catch (ModelNotFoundException $e) {
            Log::error($e);
            return Inertia::render('Error', ['message' => 'Seance not found.']);
        }
    }

    //créer une nouvelle séance
    public function store(Request $request)
    {
        ///log for laravale
        Log::info('SeanceController@store');
        //log la request
        Log::info($request);

        //to do
    }
}
