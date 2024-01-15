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
    /*
    * Afficher la page d'index ( la liste) des humains
    *
    * @return Response
    */
    public function index()
    {
        try {
            $humains = Humain::all();
            return Inertia::render('Humain/Index', ['humains' => $humains]);
        } catch (ModelNotFoundException $e) {
            Log::info($e);
            return Inertia::render('Error', ['message' => 'aucun humain trouvé.']);
        }
    }

    /**
     * Afficher la page d'un humain
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        try {
            Log::info('HumainController@show');
            $humain = Humain::findOrFail($id);
            return Inertia::render('Humain/Show', ['humain' => $humain]);
        } catch (ModelNotFoundException $e) {
            return Inertia::render('Error', ['message' => 'Humain not found.']);
        }
    }

    /**
     * Afficher la page de creation d'un humain
     *
     * @return Response
     */
    public function create()
    {
        try {
            Log::info('HumainController@create');
            return Inertia::render('Humain/Create');
        } catch (ModelNotFoundException $e) {
            Log::error($e);
            return Inertia::render('Error', ['message' => 'Humain not found.']);
        }
    }


    /**
     * Methode pour créer un humain
     *
     * @param Request $request
     */
    public function store(Request $request)
    {
        Log::info('HumainController@store');
        //validation et vérification des règles
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

    /**
     * Effectue la recherche d'un humain par son nom
     *
     * @param Request $request : les données du formulaire
     * @return Response
     */
    public function searchByName(Request $request)
    {
        try {
            Log::info('HumainController@searchByName');
            //récupere la valeur "nom" de la request et la valide (doit etre alpha)
            $validatedData = $request->validate([
                'nom' => 'required|alpha',
            ]);
            //récupere la valeur "nom" validée
            $searchName = $validatedData['nom'];
            Log::info($searchName);
            $humains = Humain::where('nom1', 'LIKE', '%' . $searchName . '%')
                ->orWhere('nom2', 'LIKE', '%' . $searchName . '%')
                ->orWhere('nom3', 'LIKE', '%' . $searchName . '%')
                ->get();
            Log::info($humains);
            return Inertia::render('Humain/SearchResults', ['humains' => $humains]);
        } catch (ModelNotFoundException $e) {
            Log::error($e);
            return Inertia::render('Error', ['message' => 'Humain not found.']);
        }
    }

    /**
     * Effectue la recherche d'un humain par son prénom
     *
     * @param Request $request : les données du formulaire
     * @return Response
     */
    public function searchByFirstName(Request $request)
    {
        $searchFirstName = $request->input('searchFirstName');

        $humains = Humain::where('prenom1', 'LIKE', '%' . $searchFirstName . '%')
            ->orWhere('prenom2', 'LIKE', '%' . $searchFirstName . '%')
            ->orWhere('prenom3', 'LIKE', '%' . $searchFirstName . '%')
            ->get();
        return Inertia::render('Humain/SearchResults', ['humains' => $humains]);
    }

    /**
     * Effectue la recherche d'un humain par son email
     *
     * @param Request $request : les données du formulaire
     * @return Response
     */
    public function searchByEmail(Request $request)
    {
        $searchEmail = $request->input('searchEmail');

        $humains = Humain::where('email', 'LIKE', '%' . $searchEmail . '%')
            ->get();
        return Inertia::render('Humain/SearchResults', ['humains' => $humains]);
    }

    /**
     * Effectue la recherche d'un humain par son téléphone
     *
     * @param Request $request : les données du formulaire
     * @return Response
     */
    public function searchByPhone(Request $request)
    {
        $searchPhone = $request->input('searchPhone');

        $humains = Humain::where('telephone', 'LIKE', '%' . $searchPhone . '%')
            ->get();
        return Inertia::render('Humain/SearchResults', ['humains' => $humains]);
    }

    /**
     * Methode pour modifier un humain dans la base de données
     *
     * @param int $id
     * @return Response
     */
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

    /**
     * Methode pour supprimer un humain dans la base de données
     *
     * @param int $id
     * @return Response
     */
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

    /**
     * Affiche la page de recherche d'un humain
     *
     * @return Response
     */
    public function showSearch()
    {
        try {
            Log::info('HumainController@showSearch');
            return Inertia::render('Humain/Search');
        } catch (ModelNotFoundException $e) {
            Log::error($e);
            return Inertia::render('Error', ['message' => 'Humain not found.']);
        }
    }
}
