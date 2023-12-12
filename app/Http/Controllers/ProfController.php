<?php
namespace App\Http\Controllers;

use App\Models\Prof;
use App\Models\Humain;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfController extends Controller
{
    // Afficher tous les profs
    public function index()
    {
        $profs = Prof::with('humain')->get();
        return Inertia::render('Profs/Index', ['profs' => $profs]);
    }

    // Créer un nouveau prof
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'humain_id' => 'required|exists:humains,id',
            'trigramme' => 'required|max:4'
        ]);

        Prof::create($validatedData);
        return redirect()->route('profs.index');
    }

    // Afficher un seul prof
    public function show($id)
    {
        $prof = Prof::with('humain')->findOrFail($id);
        return Inertia::render('Profs/Show', ['prof' => $prof]);
    }

    // Mettre à jour un prof
    public function update(Request $request, $id)
    {
        $prof = Prof::findOrFail($id);

        $validatedData = $request->validate([
            'humain_id' => 'required|exists:humains,id',
            'trigramme' => 'required|max:4'
        ]);

        $prof->update($validatedData);
        return redirect()->route('profs.index');
    }

    // Supprimer un prof
    public function destroy($id)
    {
        $prof = Prof::findOrFail($id);
        $prof->delete();
        return redirect()->route('profs.index');
    }
}