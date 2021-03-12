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
            'likes' => $this->likes->count(),
            'author' => [
                'data' => new UserResource($this->user)
            ],
            'likers' => [
                'data' => UserResource::collection($this->likers)
            ],
            'user' => [
                'data' => new PostUserResource($this)
            ]
        ];
    }
}
