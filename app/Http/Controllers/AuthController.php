<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
//for changed me
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

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
        return response()->json(auth()->user());
    }
//    public function me(Request $request)
//    {
//        $accessToken = $request->cookie('access_token'); // Retrieve the access_token from the cookie
//
//        if (!$accessToken) {
//            return response()->json(['error' => 'Unauthorized'], 401);
//        }
//
//        try {
//            $user = JWTAuth::setToken($accessToken)->toUser(); // Authenticate the user using JWTAuth
//            return response()->json($user);
//        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
//            return response()->json(['error' => 'Token Expired'], 401);
//        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
//            return response()->json(['error' => 'Token Invalid'], 401);
//        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
//            return response()->json(['error' => 'Token Absent'], 401);
//        }
//    }

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
