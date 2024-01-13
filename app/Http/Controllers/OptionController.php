<?php

namespace App\Http\Controllers;

use App\Models\Option;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class OptionController extends Controller
{
    //afficher une option
    public function show($id)
    {
        try {
            Log::info('OptionController@show');
            $recherche = Option::findOrFail($id);
            return Inertia::render('Option/Show', ['option' => $recherche]);
        } catch (ModelNotFoundException $e) {
            return Inertia::render('Error', ['message' => 'Option not found.']);
        }
    }
    //afficher la liste des options
    public function index()
    {
        try {
            Log::info('OptionController@index');
            $options = Option::all();
            return Inertia::render('Option/Index', ['options' => $options]);
        } catch (ModelNotFoundException $e) {
            Log::info($e);
            return Inertia::render('Error', ['message' => 'aucun groupe de classe trouvé.']);
        }
    }

    //afficher le formulaire de création d'une option
    public function create()
    {
        try {
            Log::info('OptionController@create');
            return Inertia::render('Option/Create');
        } catch (ModelNotFoundException $e) {
            Log::info($e);
            return Inertia::render('Error', ['message' => 'aucun groupe de classe trouvé.']);
        }
    }

    //enregistrer une option
    public function store(Request $request)
    {
        try {
            Log::info('OptionController@store');
            //validation des données
            $request->validate([
                'type' => 'required',
                'nom' => 'required',
            ]);
            //enregistrement
            $option = Option::create($request->all());

            //redirection
            return $this->show($option->id);
        } catch (ModelNotFoundException $e) {
            Log::info($e);
            return Inertia::render('Error', ['message' => 'aucun groupe de classe trouvé.']);
        }
    }


    //accesseur public pour la liste des options
    public static function getOptions()
    {
        try {
            Log::info('OptionController@getOptions');
            $options = Option::all();
            return $options;
        } catch (ModelNotFoundException $e) {
            Log::info($e);
            return Inertia::render('Error', ['message' => 'aucun groupe de classe trouvé.']);
        }
    }
}
