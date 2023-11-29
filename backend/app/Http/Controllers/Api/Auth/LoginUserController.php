<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\LoginUserRequest;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;

class LoginUserController extends Controller
{
    use HttpResponses;

    /**
     * Login the User
     * 
     */

    public function login(LoginUserRequest $request)
    {
       try {
        $request->validated($request->only(['email', 'password']));

        if(!Auth::attempt($request->only(['email', 'password']))) {
            return $this->error('', 'Credentials do not match', 401);
        }

        $user = User::where('email', $request->email)->first();

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
       } catch (\Throwable $th) {
        return $this->error('', $th, 500);
     }
    }
}
