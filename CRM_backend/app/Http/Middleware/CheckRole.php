<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        if (! $user || ! $user->role) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. No active role assigned to this account.',
            ], 403);
        }

        $userRole = strtolower(trim($user->role->role_name));
        $allowedRoles = array_map(fn ($r) => strtolower(trim($r)), $roles);

        if (! in_array($userRole, $allowedRoles, true)) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden. Your current role does not have permission for this resource.',
            ], 403);
        }

        return $next($request);
    }
}
