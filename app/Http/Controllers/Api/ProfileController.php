<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileFormRequest;
use App\Http\Resources\UserResource;

class ProfileController extends Controller
{
    public function update(ProfileFormRequest $request)
    {
        auth()->user()->update($request->validated());
        return new UserResource(auth()->user());
    }
}
