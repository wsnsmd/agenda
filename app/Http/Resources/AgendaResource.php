<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class AgendaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'tempat' => $this->tempat,
            'tanggal' => Carbon::parse($this->tanggal)->format('d-m-Y'),
            'jam_mulai' => $this->jam_mulai,
            'jam_selesai' => $this->jam_selesai,
            'secara' => $this->secara,
            'pic' => $this->pic,
            'keterangan' => $this->keterangan,
            'bidang' => $this->bidang->only('id', 'nama'),            
        ];
    }
}
