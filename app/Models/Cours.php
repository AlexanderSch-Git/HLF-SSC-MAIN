<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cours extends Model
{
    use HasFactory;

    protected $fillable = ['nom_user', 'nom_ue', 'prof_id'];

    // relation 1:n avec prof
    public function prof()
    {
        return $this->belongsTo(Prof::class);
    }

    // relation 1:n avec seance
    public function seances()
    {
        return $this->hasMany(Seance::class);
    }
}
