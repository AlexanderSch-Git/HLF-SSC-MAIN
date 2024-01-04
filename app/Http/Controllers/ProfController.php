<?php

namespace App\Http\Controllers;

use App\Models\Prof;
use App\Models\Humain;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

//Faites comme humain controller
//N'oubliez pas qu'un prof contient un humain + un trigrame
class ProfController extends Controller
{
    //Afficher la liste des profs
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
    //Afficher juste un prof grace a son id
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
    //Afficher la page pour créer un prof
    //Créer un nouveau prof prend un humain ( le trigrame est généré automatiquement)
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
    //Chercher un prof par son nom
    public function searchByName(Request $request)
    {
        Log::info('ProfController@searchByName');
        try {

            //select prof id as profid from profs where humain_id in
            $profs = Prof::join('humains', 'profs.humain_id', '=', 'humains.id')
                ->select('profs.id as pid', 'humains.*')
                ->where('humains.nom1', 'like', '%' . $request->nom . '%')
                ->orWhere('humains.nom2', 'like', '%' . $request->nom . '%')
                ->get();
            Log::info($profs);

            //render prof searchresults
            return Inertia::render('Prof/SearchResults', ['profs' => $profs]);
        } catch (ModelNotFoundException $e) {
            Log::error($e);
            return Inertia::render('Error', ['message' => 'Prof not found.']);
        }
    }
    //Chercher un prof par son prénom
    //Chercher un prof oar sib email
    //Chercher un prof par son numéro de téléphone
    //Modifier un prof
    //Supprimer un prof
    public function destroy(Request $request)
    {
        try {
            Log::info('ProfController@destroy');
            Log::info($request);

            return redirect()->route('profs.index');
        } catch (ModelNotFoundException $e) {
            Log::error($e);
            return Inertia::render('Error', ['message' => 'Prof not found.']);
        }
    }
    //Afficher la page pour chercher un prof
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

    //accesseur public pour les profs
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
