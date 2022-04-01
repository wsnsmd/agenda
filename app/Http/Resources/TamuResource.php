<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TamuResource extends JsonResource
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
            'nama' => $this->nama,
            'jabatan' => $this->jabatan,
            'hp' => $this->hp,
            'instansi' => $this->instansi,
            'keperluan' => $this->keperluan,
            'foto' => $this->foto,
            'bidang_id' => $this->bidang_id,
            'temu' => $this->temu,
            'tanggal' => $this->created_at->format('d-m-Y H:i'),
            'bidang' => $this->bidang->only('id', 'nama'),            
        ];
    }
}
