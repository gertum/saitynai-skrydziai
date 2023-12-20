<?php

namespace App\Http\Controllers;

use App\Models\User;
use Database\Seeders\UserRoleSeeder;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
//for changed me
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = auth()->user();

        $isAdmin = $this->hasAdminRole($user);

        // You can now use $isAdmin to determine if the user has an admin role
        if ($isAdmin) {
            // If the user has an admin role, you might want to customize the response accordingly
            return response()->json([
                'user' => $user,
                'isAdmin' => true,
            ]);
        }

        return response()->json([
            'user' => $user,
            'isAdmin' => false,
        ]);
    }



    protected function hasAdminRole($user)
    {
        $hasRole = $user && $user->hasRole(UserRoleSeeder::ROLE_ADMIN);
        return $hasRole;
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        /** @var User $user */
        $user = auth();

        return $this->respondWithToken($user->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        /** @var User $user */
        $user = auth();
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $user->factory()->getTTL() * 60
        ]);
    }
}
