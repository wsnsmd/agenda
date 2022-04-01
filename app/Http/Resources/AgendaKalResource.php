<?php

namespace App\Http\Resources;
use Carbon\Carbon;

use Illuminate\Http\Resources\Json\JsonResource;

class AgendaKalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $start = $this->tanggal.'T'.$this->jam_mulai;
        return [
            'id' => $this->id,
            'title' => $this->title,
            'start' => $start,
        ];
    }
}
