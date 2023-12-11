<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupeClasse extends Model
{
    use HasFactory;

    protected $fillable = ['option_id', 'annee', 'numero_groupe'];

    //relation n:1 avec option
    public function option()
    {
        return $this->belongsTo(Option::class);
    }

    //relation 1:n avec seance
    public function seances()
    {
        return $this->hasMany(Seance::class);
    }
}
