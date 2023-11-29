<?php

namespace App\Http\Controllers\Api\Auth;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\HttpResponses;

class LogoutUserController extends Controller
{
    use HttpResponses;

    /**
     * Logout the User
     * 
     */
    
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return $this->success([
            'message' => 'You have succesfully been logged out and your token has been removed'
        ]);
    }
}
