<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Humain extends Model
{
    use HasFactory;
    protected $fillable = ['humain_id', 'trigramme'];

    // relation 1:1 avec prof
    public function prof()
    {
        return $this->hasOne(Prof::class);
    }
}
