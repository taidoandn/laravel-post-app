<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Events\PostCreated;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use App\Transformers\PostTransformer;

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

        // return fractal()
        //     ->collection($posts)
        //     ->transformWith(new PostTransformer())
        //     ->toArray();
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

        // return fractal()
        //     ->item($post)
        //     ->transformWith(new PostTransformer())
        //     ->toArray();
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

        // return fractal()
        //     ->item($post)
        //     ->transformWith(new PostTransformer())
        //     ->toArray();
    }
}
