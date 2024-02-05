<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\StoreUserRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Hash;

class RegisterUserController extends Controller
{
    use HttpResponses;

    /**
     * Create User
     * 
     */

    public function register(StoreUserRequest $request)
    {
        try {
            $request->validated($request->only(['name', 'email', 'password']));

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            return $this->success([
                'user' => $user,
                'token' => $user->createToken('API Token')->plainTextToken
            ]);
        } catch (\Throwable $th) {
            return $this->error('', $th, 500);
        }
    }
}
