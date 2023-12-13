<?php

namespace App\Http\Controllers;

use App\Models\Humain;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;


class HumainController extends Controller
{
    // Afficher la liste des humains
    public function index()
    {
        //render la page index avec la liste des humains
        try {
            $humains = Humain::all();
            return Inertia::render('Humain/Index', ['humains' => $humains]);
        } catch (ModelNotFoundException $e) {
            Log::info($e);
            return Inertia::render('Error', ['message' => 'aucun humain trouvé.']);
        }
    }
    // Afficher juste un humain grace a son id
    public function show($id)
    {
        try {
            $humain = Humain::findOrFail($id);
            return Inertia::render('Humain/Show', ['humain' => $humain]);
        } catch (ModelNotFoundException $e) {
            return Inertia::render('Error', ['message' => 'Humain not found.']);
        }
    }

    // Créer un nouvel humain
    public function store(Request $request)
    {
        ///log for laravale
        Log::info('HumainController@store');
        //log la request
        Log::info($request);

        //validation
        try {
            $validatedData = $request->validate([
                'nom1' => 'required|alpha',
                'prenom1' => 'required|alpha',
                'date_de_naissance' => 'required|date',
                'telephone' => 'required|string',
                // non obligatoire
                'nom2' => 'nullable|alpha',
                'prenom2' => 'nullable|alpha',
                'nom3' => 'nullable|alpha',
                'prenom3' => 'nullable|alpha',
            ]);
        } catch (\Throwable $th) {
            Log::info($th);
        }
        //if nom2 or nom 3 or prenom2 or prenom3 is null, set it to ''
        if ($validatedData['nom2'] == null) {
            $validatedData['nom2'] = '';
        }
        if ($validatedData['nom3'] == null) {
            $validatedData['nom3'] = '';
        }
        if ($validatedData['prenom2'] == null) {
            $validatedData['prenom2'] = '';
        }
        if ($validatedData['prenom3'] == null) {
            $validatedData['prenom3'] = '';
        }

        //set email to  : nom1.prenom1@hainaut-promsoc.be
        $email = $validatedData['nom1'] . '.' . $validatedData['prenom1'] . '@hainaut-promsoc.be';
        $validatedData['email'] = $email;

        //set date de naissance to  :  fr format
        //create l'humain et retourne son id
        $humain = Humain::create($validatedData);

        // utilise la fonction show pour afficher l'humain
        return $this->show($humain->id);
    }

    // Rechercher un humain par son nom parmis les 3
    public function searchByName(Request $request)
    {
        $searchName = $request->input('searchName');

        $humains = Humain::where('nom1', 'LIKE', '%' . $searchName . '%')
            ->orWhere('nom2', 'LIKE', '%' . $searchName . '%')
            ->orWhere('nom3', 'LIKE', '%' . $searchName . '%')
            ->get();
        return Inertia::render('Humain/SearchResults', ['humains' => $humains]);
    }

    // Rechercher un humain par son prenom parmis les 3
    public function searchByFirstName(Request $request)
    {
        $searchFirstName = $request->input('searchFirstName');

        $humains = Humain::where('prenom1', 'LIKE', '%' . $searchFirstName . '%')
            ->orWhere('prenom2', 'LIKE', '%' . $searchFirstName . '%')
            ->orWhere('prenom3', 'LIKE', '%' . $searchFirstName . '%')
            ->get();
        return Inertia::render('Humain/SearchResults', ['humains' => $humains]);
    }

    // Rechercher un humain par son email
    public function searchByEmail(Request $request)
    {
        $searchEmail = $request->input('searchEmail');

        $humains = Humain::where('email', 'LIKE', '%' . $searchEmail . '%')
            ->get();
        return Inertia::render('Humain/SearchResults', ['humains' => $humains]);
    }

    // Rechercher un humain par son telephone
    public function searchByPhone(Request $request)
    {
        $searchPhone = $request->input('searchPhone');

        $humains = Humain::where('telephone', 'LIKE', '%' . $searchPhone . '%')
            ->get();
        return Inertia::render('Humain/SearchResults', ['humains' => $humains]);
    }

    // Modifier un humain grace a son id
    public function update(Request $request, $id)
    {
        try {
            $humain = Humain::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return Inertia::render('Error', ['message' => 'Humain not found.']);
        }

        $validatedData = $request->validate([
            'nom1' => 'required|alpha',
            'prenom1' => 'required|alpha',
            'date_de_naissance' => 'required|date',
            'telephone' => 'required|string',
            // non obligatoire
            'nom2' => 'nullable|alpha',
            'prenom2' => 'nullable|alpha',
            'nom3' => 'nullable|alpha',
            'prenom3' => 'nullable|alpha',
        ]);

        //if nom2 or nom 3 or prenom2 or prenom3 is null, set it to ''
        if ($validatedData['nom2'] == null) {
            $validatedData['nom2'] = '';
        }
        if ($validatedData['nom3'] == null) {
            $validatedData['nom3'] = '';
        }
        if ($validatedData['prenom2'] == null) {
            $validatedData['prenom2'] = '';
        }
        if ($validatedData['prenom3'] == null) {
            $validatedData['prenom3'] = '';
        }

        //set email to  : nom1.prenom1@hainaut-promsoc
        $email = $validatedData['nom1'] . '.' . $validatedData['prenom1'] . '@hainaut-promsoc.be';
        $validatedData['email'] = $email;

        //update l'humain
        $humain->update($validatedData);
        // utilise la fonction show pour afficher l'humain
        return $this->show($humain->id);
    }

    //supprimer un humain
    public function destroy($id)
    {
        try {
            $humain = Humain::findOrFail($id);

            // supprimer
            $humain->delete();

            return Inertia::render('Humain/index', ['message' => 'Humain supprimé']);
        } catch (ModelNotFoundException $e) {
            return Inertia::render('Error', ['message' => 'Humain not found.']);
        }
    }
}
