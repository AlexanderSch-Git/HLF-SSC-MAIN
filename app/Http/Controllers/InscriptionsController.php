<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Inscription;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class InscriptionsController extends Controller
{
    /**
     * Méthode pour créer une inscription à un cours pour un utilisateur danbs la base de données
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        try {
            Log::info('InscriptionsController@store');
            $request->validate([
                'cours_id' => 'required',
                'user_id' => 'required',
            ]);

            $inscription = Inscription::create([
                'cours_id' => $request->cours_id,
                'user_id' => $request->user_id,
            ]);

            //return le dashboard
            return redirect()->route('dashboard');
        } catch (ModelNotFoundException $e) {
            Log::error($e);
            return Inertia::render('Error', ['message' => 'Inscription not found.']);
        }
    }

    /**
     * Méthode pour supprimer une inscription à un cours pour un utilisateur dans la base de données
     *
     * @param Request $request
     * @return Response
     */
    public function destroy(Request $request)
    {
        try {
            Log::info('InscriptionsController@destroy');
            $request->validate([
                'cours_id' => 'required',
            ]);
            $id = $request->cours_id;
            $inscription = Inscription::where('cours_id', $id)->delete();
            //return le dashboard
            return redirect()->route('dashboard');
        } catch (ModelNotFoundException $e) {
            Log::error($e);
            return Inertia::render('Error', ['message' => 'Inscription not found.']);
        }
    }

    /**
     * Accesseur public pour récupérer les inscriptions d'un utilisateur
     *
     * @param int $user_id
     * @return Response
     */
    public static function getInscriptions($user_id)
    {
        try {
            Log::info('InscriptionsController@getInscriptions');
            $inscriptions = Inscription::where('user_id', $user_id)->get();
            return $inscriptions;
        } catch (ModelNotFoundException $e) {
            Log::error($e);
            return Inertia::render('Error', ['message' => 'Inscription not found.']);
        }
    }
}
