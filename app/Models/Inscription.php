<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    use HasFactory;
    //filable cours_id et user_id
    protected $fillable = [
        'cours_id',
        'user_id',
    ];
}
