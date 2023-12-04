<?php

use App\Http\Controllers\Api\Auth\LoginUserController;
use App\Http\Controllers\Api\Auth\LogoutUserController;
use App\Http\Controllers\Api\Auth\RegisterUserController;
use App\Http\Controllers\Api\News\NewsController;
use App\Http\Controllers\Api\User\SettingsController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});



// Auth
Route::post('/auth/login', [LoginUserController::class, 'login']);
Route::post('/auth/register', [RegisterUserController::class, 'register']);

// News & Filters
Route::post('/news', [NewsController::class, 'index']);
Route::get('/getCategories', [SettingsController::class, 'getCategories']);
Route::get('/getSources', [SettingsController::class, 'getSources']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/auth/logout', [LogoutUserController::class, 'logout']);
    Route::post('/user/settings/update', [SettingsController::class, 'updateSettings']);
});
