<?php

namespace App\Http\Controllers;

use App\Models\Prof;
use App\Models\Humain;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProfController extends Controller
{
    /**
     * Affiche la page d'index ( la liste) des profs
     *
     * @return Response
     */
    public function index()
    {
        //render la page index avec la liste des profs
        try {
            Log::info('ProfController@index');
            $profs = Prof::join('humains', 'profs.humain_id', '=', 'humains.id')
                ->select('profs.*', 'humains.*')
                ->get();
            return Inertia::render('Prof/Index', ['profs' => $profs]);
        } catch (ModelNotFoundException $e) {
            Log::info($e);
            return Inertia::render('Error', ['message' => 'aucun prof trouvé.']);
        }
    }

    /**
     * Affiche la page d'un prof
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        try {
            Log::info('ProfController@show');
            $prof = Prof::join('humains', 'profs.humain_id', '=', 'humains.id')
                ->select('profs.*', 'humains.*')
                ->findOrFail($id);
            Log::info($prof);
            return Inertia::render('Prof/Show', ['prof' => $prof]);
        } catch (ModelNotFoundException $e) {
            return Inertia::render('Error', ['message' => 'Prof not found.']);
        }
    }

    /**
     * Méthode pour créer un prof dans la base de données
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        try {
            Log::info('ProfController@create');
            $humain = Humain::findOrFail($request->id);
            // trigrame = 2 premières lettres du nom + 1 premières lettres du prénom
            $trigramme = substr($humain->nom, 0, 2) . substr($humain->prenom, 0, 1);
            $data = [
                'humain_id' => $request->id,
                'trigramme' => $trigramme
            ];
            $prof = Prof::create($data);
            //return inertia render prof/{id}
            return redirect()->route('prof.show', ['id' => $prof->id]);
        } catch (ModelNotFoundException $e) {
            Log::error($e);
            return Inertia::render('Error', ['message' => 'Prof not found.']);
        }
    }

    /**
     * Méthode pour chercher un prof par son nom
     *
     * @param Request $request
     * @return Response
     */
    public function searchByName(Request $request)
    {
        Log::info('ProfController@searchByName');
        try {
            $profs = Prof::join('humains', 'profs.humain_id', '=', 'humains.id')
                ->select('profs.id as pid', 'humains.*')
                ->where('humains.nom1', 'like', '%' . $request->nom . '%')
                ->orWhere('humains.nom2', 'like', '%' . $request->nom . '%')
                ->get();
            Log::info($profs);
            return Inertia::render('Prof/SearchResults', ['profs' => $profs]);
        } catch (ModelNotFoundException $e) {
            Log::error($e);
            return Inertia::render('Error', ['message' => 'Prof not found.']);
        }
    }

    /**
     * Afficher la page pour chercher un prof
     *
     * @return Response
     */
    public function showSearch()
    {
        try {
            Log::info('ProfController@showSearch');
            return Inertia::render('Prof/Search');
        } catch (ModelNotFoundException $e) {
            Log::error($e);
            return Inertia::render('Error', ['message' => 'Prof not found.']);
        }
    }

    /**
     * Accesseur public pour récupérer les profs
     *
     * @return Response
     */
    public static function getProfs()
    {
        try {
            Log::info('ProfController@getProfs');
            $profs = Prof::join('humains', 'profs.humain_id', '=', 'humains.id')
                ->select('profs.id as pid', 'humains.*')
                ->get();
            return $profs;
        } catch (ModelNotFoundException $e) {
            Log::error($e);
            return Inertia::render('Error', ['message' => 'Prof not found.']);
        }
    }
}
