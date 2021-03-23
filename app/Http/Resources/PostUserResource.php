<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostUserResource extends JsonResource
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
            'owner' => optional(auth()->user())->id === $this->user_id,
            'liked' => $this->isLiked(),
        ];
    }

    protected function isLiked()
    {
        if (!$user = auth()->user()) {
            return false;
        }
        return $this->isLikedBy($user);
    }
}
