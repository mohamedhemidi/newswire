<?php

use App\Http\Controllers\Api\Auth\LoginUserController;
use App\Http\Controllers\Api\Auth\LogoutUserController;
use App\Http\Controllers\Api\Auth\RegisterUserController;
use Illuminate\Support\Facades\Route;

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


// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });


//* Public routes */ 
//
// Auth
Route::post('/auth/login', [LoginUserController::class, 'login'])->name('login');
Route::post('/auth/register', [RegisterUserController::class, 'register'])->name('register');


//* Protected routes */ 
//
Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::post('/auth/logout', [LogoutUserController::class, 'logout'])->name('logout');
    Route::get('/news', function() {
        return "News are coming";
    });
});
