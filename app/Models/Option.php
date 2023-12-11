<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'nom'];

    // relation n:n avec groupe classe
    public function seances()
    {
        return $this->hasMany(GroupeClasse::class);
    }
}
