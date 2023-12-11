<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seance extends Model
{
    use HasFactory;
    protected $fillable = ['prof_id', 'cours_id', 'mode', 'date', 'heure_debut', 'heure_fin', 'groupe_classe_id'];

    // relation n:1 prof
    public function prof()
    {
        return $this->belongsTo(Prof::class);
    }

    // relation n:1 cours
    public function cours()
    {
        return $this->belongsTo(Cours::class);
    }

    // relation n:1 groupe_classe
    public function groupe_classe()
    {
        return $this->belongsTo(GroupeClasse::class);
    }
}
