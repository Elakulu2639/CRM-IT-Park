<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authentication API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

/*
|--------------------------------------------------------------------------
| User & Role Management  (System Administrator only)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'role:System Administrator'])->group(function () {

    // ------------------------------------------------------------------
    // User Management
    // ------------------------------------------------------------------
    Route::prefix('users')->group(function () {
        Route::get('/',                          [UserController::class, 'index']);       // View Users
        Route::post('/',                         [UserController::class, 'store']);       // Create User
        Route::get('/{user}',                    [UserController::class, 'show']);        // View User
        Route::put('/{user}',                    [UserController::class, 'update']);      // Edit User
        Route::post('/{user}/activate',          [UserController::class, 'activate']);    // Activate User
        Route::post('/{user}/deactivate',        [UserController::class, 'deactivate']); // Deactivate User (+ reassign)
        Route::put('/{user}/role',               [UserController::class, 'assignRole']); // Assign / Change Role
    });

    // ------------------------------------------------------------------
    // Role Management (read-only listing for assignment UI)
    // ------------------------------------------------------------------
    Route::get('/roles', [RoleController::class, 'index']); // View available roles
});
