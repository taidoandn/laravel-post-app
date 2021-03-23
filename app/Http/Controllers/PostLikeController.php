<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Events\PostLiked;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;

class PostLikeController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }

    public function store(Post $post)
    {
        $this->authorize('like', $post);

        $post->likes()->create([
            'user_id' => auth()->id(),
        ]);

        broadcast(new PostLiked($post))->toOthers();

        return new PostResource($post->fresh());
    }

    public function destroy(Post $post)
    {
        $this->authorize('unlike', $post);

        $post->likes()->where('user_id', auth()->id())->delete();

        broadcast(new PostLiked($post))->toOthers();

        return new PostResource($post->fresh());
    }
}
