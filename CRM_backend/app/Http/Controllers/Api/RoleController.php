<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RoleController extends Controller
{
    /**
     * List all roles available for assignment.
     *
     * Used by the System Administrator when creating or editing users so they
     * can see which role IDs to supply.
     *
     * Authorized role: System Administrator
     */
    public function index(): AnonymousResourceCollection
    {
        $roles = Role::where('is_active', true)->orderBy('role_tier')->get();

        return RoleResource::collection($roles);
    }
}
