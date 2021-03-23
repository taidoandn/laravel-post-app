<?php

namespace App\Http\Resources;

use App\Http\Resources\UserResource;
use App\Http\Resources\PostUserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'likes_count' => $this->likes->count(),
            'created_at' => $this->created_at->diffForHumans(),
            'author' => new UserResource($this->user),
            'likers' => UserResource::collection($this->likers),
            'user' => new PostUserResource($this)
        ];
    }
}
