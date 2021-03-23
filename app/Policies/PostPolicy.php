<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PostPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function like(User $user, Post $post)
    {
        if ($user->id === $post->user_id || $post->isLikedBy($user)) {
            return false;
        }

        return true;
    }

    public function unlike(User $user, Post $post)
    {
        if ($user->id === $post->user_id || !$post->isLikedBy($user)) {
            return false;
        }

        return true;
    }
}
