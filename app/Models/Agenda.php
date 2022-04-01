<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    use HasFactory;
    protected $guarded = [];
    // protected $casts = [
    //     'tanggal'  => 'date',
    // ];

    public function getJamMulaiAttribute($value)
    {
        return substr($value, 0, 5);
    }

    public function getJamSelesaiAttribute($value)
    {
        return substr($value, 0, 5);
    }

    public function bidang()
    {
        return $this->belongsTo(Bidang::class);
    }
}
