<?php

namespace App\Models;

use App\Models\Like;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    const MAX_LIKES = 5;

    protected $fillable = [
        'body'
    ];

    public function likesRemaining(User $user)
    {
        return self::MAX_LIKES - $this->likes->where('user_id', $user->id)->count();
    }

    public function maxLikesReached($user)
    {
        return $this->likesRemaining($user) <= 0;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    public function likers()
    {
        return $this->hasManyThrough(
            User::class,
            Like::class,
            'likeable_id',
            'id',
            'id',
            'user_id',
        )
            ->where('likeable_type', Post::class)
            ->groupBy('likes.user_id', 'likes.likeable_id');
    }
}
