<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Events\PostCreated;
use App\Events\PostUpdated;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::latest()->get();

        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'body' => 'required'
        ]);

        $post = $request->user()->posts()->create($request->only('body'));

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

    public function update(Request $request, Post $post)
    {
        $this->validate($request, [
            'body' => 'required'
        ]);
        $post->update($request->only('body'));

        broadcast(new PostUpdated($post))->toOthers();

        return new PostResource($post);
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response(null, 200);
    }
}
