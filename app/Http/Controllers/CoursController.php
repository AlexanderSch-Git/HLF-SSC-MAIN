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
    /**
     * Affiche la page d'index ( la liste) des cours
     *
     * @return Response
     */
    public function index()
    {
        try {
            Log::info('CoursController.index: ');
            $cours = Cours::join('profs', 'cours.prof_id', '=', 'profs.id')
                ->join('humains', 'profs.humain_id', '=', 'humains.id')
                ->select('cours.*', 'humains.nom1', 'humains.prenom1', 'humains.id as pid')
                ->get();
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

    /**
     * Affiche la page d'un cours
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        try {
            Log::info('CoursController.show: ');
            // get les infos du cours + nom1 et prenom1 du prof avec jointure sur profs et humains
            $cour = Cours::join('profs', 'cours.prof_id', '=', 'profs.id')
                ->join('humains', 'profs.humain_id', '=', 'humains.id')
                ->select('cours.id as cid', 'cours.*', 'humains.nom1', 'humains.prenom1', 'humains.id as pid')
                ->findOrFail($id);
            return Inertia::render('Cour/Show', [
                'cour' => $cour
            ]);
        } catch (ModelNotFoundException $e) {
            return back()->withError($e->getMessage())->withInput();
        }
    }

    /**
     * Affiche la page de création d'un cours
     *
     * @return Response
     */
    public function create()
    {
        try {
            Log::info('CoursController.create: ');
            $profs = ProfController::getProfs();
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

    /**
     * Methode de création d'un cours
     * @param Request $request // Récupère la requête émise par le formulaire
     * @return Response
     */
    public function store(Request $request)
    {
        try {
            Log::info('CoursController.store: ');
            $request->validate([
                'nom' => 'required|string|max:255',
                'ue' => 'required|string|max:255',
                'prof' => 'required|integer',
            ]);
            $cours =
                [
                    'nom_user' => $request->nom,
                    'nom_ue' => $request->ue,
                    'prof_id' => $request->prof
                ];
            $coursnew = Cours::create($cours);
            return $this->show($coursnew->id);
        } catch (ModelNotFoundException $e) {
            Log::error('CoursController.store: une erreur est survenue lors de la création d\'un cours');
            Log::error($e->getMessage());
            return back()->withError($e->getMessage())->withInput();
        }
    }

    /**
     * Affiche la page de recherche d'un cours
     * @return Response
     */
    public function showSearch()
    {
        try {
            Log::info('CoursController.showSearch: ');
            return Inertia::render('Cour/Search');
        } catch (ModelNotFoundException $e) {
            return back()->withError($e->getMessage())->withInput();
        }
    }

    /**
     * Methode de recherche d'un cours par nom
     * @param Request $request // Récupère la requête émise par le formulaire
     * @return Response
     */
    public function searchByName(Request $request)
    {
        try {
            Log::info('CoursController.searchByName: ');
            $request->validate([
                'nom' => 'required|string|max:255'
            ]);
            $cours = Cours::where('nom_user', 'like', '%' . $request->nom . '%')->get();
            $coursArray = [];
            foreach ($cours as $c) {
                $coursArray[] = [
                    'id' => $c->id,
                    'nom' => $c->nom_user,
                    'ue' => $c->nom_ue,
                    'prof' => $c->prof_id
                ];
            }
            return Inertia::render('Cour/SearchResult', [
                'cours' => $coursArray
            ]);
        } catch (ModelNotFoundException $e) {
            return back()->withError($e->getMessage())->withInput();
        }
    }

    /**
     * Accesseur de la liste des cours public
     * @return array ['id', 'nom', 'ue', 'prof', 'pid']
     */
    public static function getCours()
    {
        try {
            Log::info('CoursController.getCours: ');
            $cours = Cours::join('profs', 'cours.prof_id', '=', 'profs.id')
                ->join('humains', 'profs.humain_id', '=', 'humains.id')
                ->select('cours.*', 'humains.nom1', 'humains.prenom1', 'humains.id as pid')
                ->get();
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
