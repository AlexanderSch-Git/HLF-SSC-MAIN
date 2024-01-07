<?php

namespace App\Http\Controllers;

use App\Models\Cours;
use App\Models\Profs;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class CoursController extends Controller
{
    //index method pour les cours , donne la liste des cours
    public function index()
    {
        try {
            Log::info('CoursController.index: ');
            // select cours.* prof.nom1 prof.prenom1 from cours join profs on cours.prof_id = profs.id puis jointure sur humains
            $cours = Cours::join('profs', 'cours.prof_id', '=', 'profs.id')
                ->join('humains', 'profs.humain_id', '=', 'humains.id')
                ->select('cours.*', 'humains.nom1', 'humains.prenom1', 'humains.id as pid')
                ->get();
            // créer un array de cours avec chaque cours ayant pour attributs :
            // id , nom , ue , prof ( = nom1 + " " + prenom1)
            Log::info($cours);
            $coursArray = [];
            foreach ($cours as $c) {
                $coursArray[] = [
                    'id' => $c->id,
                    'nom' => $c->nom_user,
                    'ue' => $c->nom_ue,
                    'prof' => $c->nom1 . ' ' . $c->prenom1
                ];
            }
            return Inertia::render('Cour/Index', [
                'cours' => $coursArray
            ]);
        } catch (ModelNotFoundException $e) {
            return back()->withError($e->getMessage())->withInput();
        }
    }

    //show method pour un cours , donne les détails d'un cours
    public function show($id)
    {
        try {
            Log::info('CoursController.show: ');
            // get les infos du cours + nom1 et prenom1 du prof avec jointure sur profs et humains
            $cour = Cours::join('profs', 'cours.prof_id', '=', 'profs.id')
                ->join('humains', 'profs.humain_id', '=', 'humains.id')
                ->select('cours.id as cid', 'cours.*', 'humains.nom1', 'humains.prenom1', 'humains.id as pid')
                ->findOrFail($id);
            Log::info($cour);
            return Inertia::render('Cour/Show', [
                'cour' => $cour
            ]);
        } catch (ModelNotFoundException $e) {
            return back()->withError($e->getMessage())->withInput();
        }
    }

    //create method pour un cours , donne le formulaire de création d'un cours
    public function create()
    {
        try {
            Log::info('CoursController.create: ');
            //get profs
            $profs = ProfController::getProfs();
            Log::info($profs);

            //créer un tableau [label => nom1 + " " + prenom1 , value => id]
            //exemple const options = [{ value: '1', label: 'Dupont Claude' }, { value: '2', label: 'Dupont Claude' }];
            $profsArray = [];
            foreach ($profs as $p) {
                $profsArray[] = [
                    'value' => $p->pid,
                    'label' => $p->nom1 . ' ' . $p->prenom1
                ];
            }

            Log::info($profsArray);
            return Inertia::render('Cour/Create', [
                'profs' => $profsArray
            ]);
        } catch (ModelNotFoundException $e) {
            return back()->withError($e->getMessage())->withInput();
        }
    }

    //store method pour un cours , crée un cours
    public function store(Request $request)
    {
        try {
            Log::info('CoursController.store: ');
            $request->validate([
                'nom' => 'required|string|max:255',
                'ue' => 'required|string|max:255',
                'prof' => 'required|integer',
            ]);
            //créer un cours
            $cours =
                [
                    'nom_user' => $request->nom,
                    'nom_ue' => $request->ue,
                    'prof_id' => $request->prof
                ];
            Log::info($cours);
            $coursnew = Cours::create($cours);
            //rediriger vers la page show avec id
            return $this->show($coursnew->id);
        } catch (ModelNotFoundException $e) {
            Log::error('CoursController.store: une erreur est survenue lors de la création d\'un cours');
            Log::error($e->getMessage());
            return back()->withError($e->getMessage())->withInput();
        }
    }

    //showSearch method pour un cours , donne le formulaire de recherche d'un cours
    public function showSearch()
    {
        try {
            Log::info('CoursController.showSearch: ');
            return Inertia::render('Cour/Search');
        } catch (ModelNotFoundException $e) {
            return back()->withError($e->getMessage())->withInput();
        }
    }

    //searchByName method pour un cours , donne les résultats de la recherche d'un cours par nom
    public function searchByName(Request $request)
    {
        try {
            Log::info('CoursController.searchByName: ');
            $request->validate([
                'nom' => 'required|string|max:255'
            ]);
            $cours = Cours::where('nom_user', 'like', '%' . $request->nom . '%')->get();
            $coursArray = [];
            Log::info($cours);
            /*
            exemple de cours {
                "id":1,
                "nom_user":"Test",
                "nom_ue":"UE TEST",
                "prof_id":1,"
                created_at":"2024-01-04T01:49:02.000000Z",
                "updated_at":"2024-01-04T01:49:02.000000Z"}
            */
            // il nous faut id,nom , ue , prof
            foreach ($cours as $c) {
                $coursArray[] = [
                    'id' => $c->id,
                    'nom' => $c->nom_user,
                    'ue' => $c->nom_ue,
                    'prof' => $c->prof_id
                ];
            }
            //render search result avec les cours trouvés
            return Inertia::render('Cour/SearchResult', [
                'cours' => $coursArray
            ]);
        } catch (ModelNotFoundException $e) {
            return back()->withError($e->getMessage())->withInput();
        }
    }

    // external public method pour avoir la liste des cours
    public static function getCours()
    {
        try {
            Log::info('CoursController.getCours: ');
            // select cours.* prof.nom1 prof.prenom1 from cours join profs on cours.prof_id = profs.id puis jointure sur humains
            $cours = Cours::join('profs', 'cours.prof_id', '=', 'profs.id')
                ->join('humains', 'profs.humain_id', '=', 'humains.id')
                ->select('cours.*', 'humains.nom1', 'humains.prenom1', 'humains.id as pid')
                ->get();
            // créer un array de cours avec chaque cours ayant pour attributs :
            // id , nom , ue , prof ( = nom1 + " " + prenom1)
            Log::info($cours);
            $coursArray = [];
            foreach ($cours as $c) {
                $coursArray[] = [
                    'id' => $c->id,
                    'nom' => $c->nom_user,
                    'ue' => $c->nom_ue,
                    'prof' => $c->nom1 . ' ' . $c->prenom1,
                    'pid' => $c->pid
                ];
            }
            return $coursArray;
        } catch (ModelNotFoundException $e) {
            return back()->withError($e->getMessage())->withInput();
        }
    }
}
