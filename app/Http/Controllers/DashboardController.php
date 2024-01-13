<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Seance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

use function PHPSTORM_META\map;

class DashboardController extends Controller
{
    //index render la pge dashboard
    public function index()
    {
        $seances = Seance::all();

        $cours = CoursController::getCours();

        $inscriptions = InscriptionsController::getInscriptions(auth()->user()->id);

        //creer un dict de seances
        $seancesDict = [];
        foreach ($seances as $seance) {
            $seancesDict[$seance['id']] = $seance;
        }

        //creer un dict de cours
        $coursDict = [];
        foreach ($cours as $cour) {
            $coursDict[$cour['id']] = $cour;
        }

        $mesCours = [];
        foreach ($inscriptions as $inscription) {
            array_push($mesCours, $coursDict[$inscription->cours_id]);
        }

        $mesCoursDict = [];
        foreach ($mesCours as $cour) {
            $mesCoursDict[$cour['id']] = $cour;
        }
        //create array of events
        $events = [];
        foreach ($seances as $seance) {
            // si l'id du cours de la seance est dans le tableau des cours de l'utilisateur
            if (array_key_exists($seance->cours_id, $mesCoursDict)) {
                $titre = $coursDict[$seance->cours_id]['nom'];
                //debut = "yyyy-mm:ddThh:mm:ss" , on peut les déduire de
                //seance->date qui suit le format "dd-mm-yyyy" donc a reformater en "yyyy-mm-dd"
                //+seance->heure_debut qui suit le format "hh:mm" et ss vaut tjr 00
                //nb t est le séparateur entre date et heure
                $date = explode('-', $seance->date);
                $heure = explode(':', $seance->heure_debut);
                $debut = $date[2] . '-' . $date[1] . '-' . $date[0] . 'T' . $heure[0] . ':' . $heure[1] . ':00';
                //fin = "yyyy-mm:ddThh:mm:ss" , on peut les déduire de
                //seance->date qui suit le format "dd-mm-yyyy" donc a reformater en "yyyy-mm-dd"
                //+seance->heure_fin qui suit le format "hh:mm" et ss vaut tjr 00
                //nb t est le séparateur entre date et heure
                $heure = explode(':', $seance->heure_fin);
                $fin = $date[2] . '-' . $date[1] . '-' . $date[0] . 'T' . $heure[0] . ':' . $heure[1] . ':00';
                //push event to events array
                array_push($events, [
                    'title' => $titre,
                    'start' => $debut,
                    'end' => $fin,
                ]);
            }
        }

        return Inertia::render('Dashboard', [
            'auth', auth()->user(),
            'events' => $events,
            'seances' => $seances,
            'cours' => $cours,
            'inscriptions' => $mesCours,
        ]);
    }
}
