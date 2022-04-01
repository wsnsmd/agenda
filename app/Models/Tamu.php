<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tamu extends Model
{
    use HasFactory;
    
    protected $guarded = [];

    public function bidang()
    {
        return $this->belongsTo(Bidang::class);
    }
}
