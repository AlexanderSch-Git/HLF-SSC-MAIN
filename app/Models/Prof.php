<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prof extends Model
{
    use HasFactory;
    protected $fillable = ['humain_id', 'trigramme'];

    // relation 1:1 avec humain
    public function humain()
    {
        return $this->belongsTo(Humain::class);
    }

    // relation n:1 avec cours
    public function cours()
    {
        return $this->hasMany(Cours::class);
    }
}
