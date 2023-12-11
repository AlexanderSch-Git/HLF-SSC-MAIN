<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreateController extends Controller
{
    public function show(User $user)
    {
        return Inertia::render('Create', ['user' => $user]);
    }
}
