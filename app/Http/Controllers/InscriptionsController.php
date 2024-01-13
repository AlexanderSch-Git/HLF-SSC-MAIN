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
    //store inscriptions
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

    //delete inscriptions
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

    //accesseur public pour un utilisateur donné doit retourner les cours auxquels il est inscrit
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
