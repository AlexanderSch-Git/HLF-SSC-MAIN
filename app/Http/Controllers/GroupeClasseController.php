<?php

namespace App\Http\Controllers;

use App\Models\GroupeClasse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use PHPUnit\Framework\Attributes\Group;

class GroupeClasseController extends Controller
{
    //afficher la liste des groupes de classe
    public function index()
    {
        try {
            Log::info('GroupeClasseController@index');

            //get tt les groupeclasses jointure sur option.id pour avoir le nom de l'option
            $groupeClasses = GroupeClasse::join('options', 'option_id', '=', 'options.id')
                ->select('groupe_classes.*', 'options.nom as nom_option')
                ->get();
            return Inertia::render('GroupeClasse/Index', ['gcs' => $groupeClasses]);
        } catch (ModelNotFoundException $e) {
            Log::info($e);
            return Inertia::render('Error', ['message' => 'aucun groupe de classe trouvé.']);
        }
    }

    //afficher un groupe de classe
    public function show($id)
    {
        try {
            Log::info('GroupeClasseController@show');
            $gc = GroupeClasse::findOrFail($id);
            Log::info($gc);
            return Inertia::render('GroupeClasse/Show', ['gc' => $gc]);
        } catch (ModelNotFoundException $e) {
            Log::info($e);
            return Inertia::render('Error', ['message' => 'aucun groupe de classe trouvé.']);
        }
    }

    //afficher le formulaire de création d'un groupe de classe
    public function create()
    {
        try {
            Log::info('GroupeClasseController@create');
            $options = OptionController::getOptions();
            return Inertia::render('GroupeClasse/Create', ['options' => $options]);
        } catch (ModelNotFoundException $e) {
            Log::info($e);
            return Inertia::render('Error', ['message' => 'aucun groupe de classe trouvé.']);
        }
    }

    //enregistrer un groupe de classe
    public function store(Request $request)
    {
        Log::info('GroupeClasseController@store');
        try {
            //fillables : ['option_id', 'annee', 'numero_groupe'] to validate
            $request->validate([
                'option_id' => 'required',
                'annee' => 'required',
                'numero_groupe' => 'required',
            ]);
            $gc = GroupeClasse::create($request->all());
            return $this->show($gc->id);
        } catch (ModelNotFoundException $e) {
            Log::info($e);
            return Inertia::render('Error', ['message' => 'aucun groupe de classe trouvé.']);
        }
    }

    //accesseur pour les options
    public static function getGroupeClasses()
    {
        try {
            Log::info('GroupeClasseController@getGroupeClasses');
            // jointure sur option.id pour avoir le nom de l'option
            $gcs = GroupeClasse::join('options', 'option_id', '=', 'options.id')
                ->select('groupe_classes.*', 'options.nom as nom_option', 'options.type as type_option')
                ->get();
            return $gcs;
        } catch (ModelNotFoundException $e) {
            Log::info($e);
            return Inertia::render('Error', ['message' => 'aucun groupe de classe trouvé.']);
        }
    }
}
