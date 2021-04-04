<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;

class JWTAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            if ($e instanceof TokenBlacklistedException) {
                return response()->json(['message' => 'Token cannot be used, please get a new one.'], 400);
            } else if ($e instanceof TokenInvalidException) {
                return response()->json(['message' => 'Token is invalid.'], 403);
            } else if ($e instanceof TokenExpiredException) {
                $refreshed  = JWTAuth::refresh($request->header('Authorization'));
                return response()->json([
                    'message' => 'Token is expired.',
                    'access_token' => $refreshed,
                ], 401);
            } else if ($e instanceof JWTException) {
                return response()->json(['message' => 'Token is not provided.'], Response::HTTP_BAD_REQUEST);
            }
        }

        return $next($request);
    }
}
