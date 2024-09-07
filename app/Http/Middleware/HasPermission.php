<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Symfony\Component\HttpFoundation\Response;

class HasPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Récupérer le nom de la route actuelle
        $routeName = Route::currentRouteName();
        // Vérifier si l'utilisateur est authentifié
        Log::info("HasPermission");
        Log::info($routeName);
        //check if user has super admin role
        if ($request->user()->hasRole('Super-Admin')) {
            return $next($request);
        };

        // Vérifier si l'utilisateur a la permission associée à cette route
        if ($routeName && !$request->user()->can($routeName)) {
            // Optionnel : Afficher une erreur si l'utilisateur n'a pas la permission
            throw UnauthorizedException::forPermissions([$routeName]);
        };

        return $next($request);
    }
}
