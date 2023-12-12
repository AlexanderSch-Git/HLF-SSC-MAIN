<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Humain extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom1',
        'nom2',
        'prenom1',
        'prenom2',
        'prenom3',
        'date_de_naissance',
        'telephone',
        'email',
    ];

    // relation 1:1 avec prof
    public function prof()
    {
        return $this->hasOne(Prof::class);
    }
}
