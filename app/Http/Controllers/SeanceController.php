<?php

namespace App\Http\Controllers;

use App\Models\Cours;
use App\Models\Seance;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

use function Laravel\Prompts\search;

class SeanceController extends Controller
{
    //affiche la liste des seances
    public function index()
    {
        //get toutes les séance jointure sur cours et prof
        try {
            Log::info('SeanceController@index');
            //get toutes les séances trier par cours
            $seances = Seance::with('cours')->orderBy('cours_id')->get();
            //get tous les cours
            $cours = Cours::all();
            //render la page index avec les séances et les cours
            return Inertia::render('Seance/Index', [
                'Seances' => $seances,
                'Cours' => $cours
            ]);
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
            //3 get tous les groupes de classe
            $gcs = GroupeClasseController::getGroupeClasses();
            //4 render la page create avec les cours et les profs
            return Inertia::render('Seance/Create', [
                'Cours' => $cours,
                'Profs' => $profs,
                'Gcs' => $gcs
            ]);
        } catch (ModelNotFoundException $e) {
            Log::error($e);
            return Inertia::render('Error', ['message' => 'Seance not found.']);
        }
    }

    private function internStore($seance)
    {
        //log for laravale
        Log::info('SeanceController@internStore');
        //log la request
        Log::info($seance);
        //on crée la séance
        $seance = Seance::create($seance);
        //on redirige vers la page index
        return redirect()->route('seances.index');
    }
    //créer une nouvelle séance
    //  definition de seance : protected $fillable = ['prof_id', 'cours_id', 'mode', 'date', 'heure_debut', 'heure_fin', 'groupe_classe_id'];
    public function store(Request $request)
    {
        ///log for laravale
        Log::info('SeanceController@store');
        //log la request
        Log::info($request);
        //si periodicité == 0 alors on crée une séance unique
        if ($request->periodicite == 0) {

            Log::info('SeanceController@store séance unique détectée');
            //on crée la séance
            $temp = new \DateTime($request->dateDeDebut);
            $datas = [
                "prof_id" => $request->prof,
                "cours_id" => $request->cour,
                "mode" => $request->mode,
                "date" => $temp->format('d-m-Y'),
                "heure_debut" => $request->heureDeDebut[0] . ':' . $request->heureDeDebut[1],
                "heure_fin" => $request->heureDeFin[0] . ':' . $request->heureDeFin[1],
                "groupe_classe_id" => $request->groupeClass
            ];
            //utiliser la fonction internStore pour créer la séance
            $this->internStore($datas);
        } else {
            Log::info('SeanceController@store periodicité détectée');
            //sinon on crée chaque récurance de la séance
            $seancesTab = []; // tableau qui contiendra toutes les dates au quelles on doit créer une séance
            $dateDeDebut = new \DateTime($request->dateDeDebut);
            //on ajoute la date de début au tableau
            //dictionnaire des jours de la semaine 1 = lundi, 2 = mardi, etc...
            $joursDeLaSemaine = [
                1 => 'Lundi',
                2 => 'Mardi',
                3 => 'Mercredi',
                4 => 'Jeudi',
                5 => 'Vendredi',
                6 => 'Samedi',
                7 => 'Dimanche'
            ];
            while ($dateDeDebut <= new \DateTime($request->dateDeFin)) {
                //récuperer le jour de la semaine converti en string
                $jourDeLaSemaine = $joursDeLaSemaine[$dateDeDebut->format('N')];
                Log::info("test pour: " . $jourDeLaSemaine . ' ' . $dateDeDebut->format('d-m-Y'));
                //si le jour de la semaine est dans le tableau des jours de la requete
                if (in_array($jourDeLaSemaine, $request->jours)) {
                    //on ajoute la date au tableau au format "NomDuJourDeLaSemaine, dd-mm-yyyy"
                    Log::info('candidat valide');
                    array_push($seancesTab, new \DateTime($dateDeDebut->format('d-m-Y')));
                }
                //on ajoute 1 jour à la date de début$
                $dateDeDebut->add(new \DateInterval('P1D'));
            }

            Log::info($seancesTab);
            // foreach ($seancesTab as $recurrence)
            foreach ($seancesTab as $recurrence) {
                //on crée la séance
                $datas = [
                    "prof_id" => $request->prof,
                    "cours_id" => $request->cour,
                    "mode" => $request->mode,
                    "date" => $recurrence->format('d-m-Y'),
                    "heure_debut" => $request->heureDeDebut[0] . ':' . $request->heureDeDebut[1],
                    "heure_fin" => $request->heureDeFin[0] . ':' . $request->heureDeFin[1],
                    "groupe_classe_id" => $request->groupeClass
                ];
                //utiliser la fonction internStore pour créer la séance
                $this->internStore($datas);
            }
        }
        //sinon on calcul toutes les occurances et on crée les séances
    }
}
