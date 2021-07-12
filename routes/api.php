<?php

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

Route::group(['prefix' => 'auth', 'namespace' => 'Api'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::get('me', 'AuthController@me');
});

Route::group(['middleware' => ['jwt-auth'], 'namespace' => 'Api'], function () {
    Route::resource('posts', 'PostController');
    Route::post('posts/{post}/likes', 'PostLikeController@store');
    Route::delete('posts/{post}/likes', 'PostLikeController@destroy');

    Route::put('/auth/profile', 'ProfileController@update');
});
