<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;


/**
 * Ce controlleur est défini par breeze dans son systeme d'authentification clef en main
 * Le profil utilisateur n'est pas actuellement implémenté car l'état du projet est : ALPHA - Proof of concept
 * De ce fait chaque utilisateur est considéré comme un admin et peut donc modifier les données de l'application à sa guise
 * - il est donc à la fois étudiant, professeur, et administratif(PA)
 *
 * //NOTE A MOI MEME :
 * Ne pas implémenter les gestions des autorisations et des rôles car futur implémentations de Microsoft Graph API pour gérer les rôles et les autorisations
 * https://learn.microsoft.com/en-us/azure/active-directory-b2c/enable-authentication-react-spa-app-options?tabs=popup
 *
 * Il faudra refaire le système d'authentification avec Microsoft Graph API ou Azure AD B2C
 */
class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
