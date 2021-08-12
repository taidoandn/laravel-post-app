<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Events\PostCreated;
use App\Events\PostDeleted;
use App\Events\PostUpdated;
use App\Http\Requests\PostRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::with('user', 'likes', 'likers')
            ->latest()
            ->paginate(5);

        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request)
    {
        $post = auth()->user()->posts()->create($request->validated());

        broadcast(new PostCreated($post))->toOthers();

        return new PostResource($post);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }

    public function update(PostRequest $request, Post $post)
    {
        $this->authorize('update', $post);

        $post->update($request->validated());

        broadcast(new PostUpdated($post))->toOthers();

        return new PostResource($post);
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        broadcast(new PostDeleted($post))->toOthers();

        $post->delete();

        return response(null, 200);
    }
}
