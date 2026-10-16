<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PipelineStageController;
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
| Pipeline Stages — List (all authenticated CRM roles)
| System Admin gets full stage list with opportunity counts.
| Non-admin or ?active_only=true returns active stages for dropdowns.
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/pipeline-stages', [PipelineStageController::class, 'index']);
});

/*
|--------------------------------------------------------------------------
| Administration Routes (System Administrator only)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'role:System Administrator'])->group(function () {

    // ------------------------------------------------------------------
    // User Management
    // ------------------------------------------------------------------
    Route::prefix('users')->group(function () {
        Route::get('/',                          [UserController::class, 'index']);       // View Users
        Route::post('/',                         [UserController::class, 'store']);       // Create User
        Route::put('/{user}',                    [UserController::class, 'update']);      // Edit User
        Route::patch('/{user}/status',           [UserController::class, 'updateStatus']); // Update User Status (active/inactive)
        Route::put('/{user}/role',               [UserController::class, 'assignRole']); // Assign / Change Role
    });

    // ------------------------------------------------------------------
    // Role Management (read-only listing for assignment UI)
    // ------------------------------------------------------------------
    Route::get('/roles', [RoleController::class, 'index']); // View available roles

    // ------------------------------------------------------------------
    // Pipeline Stage Management
    // ------------------------------------------------------------------
    Route::prefix('pipeline-stages')->group(function () {
        Route::post('/',                [PipelineStageController::class, 'store']);        // Add a new stage
        Route::put('/{stage}',          [PipelineStageController::class, 'update']);       // Edit stage (name / order / flags)
        Route::patch('/{stage}/status', [PipelineStageController::class, 'toggleStatus']); // Activate / Deactivate
        Route::post('/reorder',         [PipelineStageController::class, 'reorder']);      // Bulk reorder
        Route::delete('/{stage}',       [PipelineStageController::class, 'destroy']);      // Delete (blocked if opportunities exist)
    });
});

