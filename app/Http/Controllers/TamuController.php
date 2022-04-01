<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use App\Models\Tamu;
use App\Models\Bidang;
use App\Http\Resources\TamuResource;
use App\Http\Requests\StoreTamuRequest;
use App\Http\Requests\UpdateTamuRequest;
use Str;
use Storage;

class TamuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tamu = TamuResource::collection(Tamu::orderBy('id', 'desc')->get());
        return Inertia::render('Tamu/Index', [
            'tamu' => $tamu
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTamuRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTamuRequest $request)
    {
        dd($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tamu  $tamu
     * @return \Illuminate\Http\Response
     */
    public function show(Tamu $tamu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tamu  $tamu
     * @return \Illuminate\Http\Response
     */
    public function edit(Tamu $tamu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTamuRequest  $request
     * @param  \App\Models\Tamu  $tamu
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTamuRequest $request, Tamu $tamu)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tamu  $tamu
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tamu $tamu)
    {
        $tamu->delete();
        return Redirect::route('tamu.index')->with('success', 'Tamu berhasil dihapus.');
    }

    public function indexFront() 
    {
        $bidang = Bidang::orderBy('id')->get();
        return Inertia::render('Frontend/Tamu', [
            'bidang' => $bidang
        ]);
    }

    public function storeFront(StoreTamuRequest $request)
    {
        try 
        {
            if($request->validated())
            {
                $image_64 = $request->foto;
                $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];
                $replace = substr($image_64, 0, strpos($image_64, ',')+1);
                $foto = str_replace($replace, '', $image_64);
                $foto = str_replace(' ', '+', $foto);
                $fotoName = Str::random(10).'.'.$extension;
                Storage::disk('public')->put($fotoName, base64_decode($foto));
                $tamu = new Tamu;
                $tamu->nama = $request->nama;
                $tamu->instansi = $request->instansi;
                $tamu->jabatan = $request->jabatan;
                $tamu->hp = $request->hp;
                $tamu->bidang_id = $request->bidang_id;
                $tamu->temu = $request->temu;
                $tamu->keperluan = $request->keperluan;
                $tamu->foto = $fotoName;
                $tamu->save();

                return Redirect::route('sukses')->with('success', 'Data berhasil disimpan.');
            }
        }
        catch(\Exception $e) 
        {
            return $e->getMessage();
        }
    }
}
