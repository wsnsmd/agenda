<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use App\Models\Foto;
use App\Http\Resources\FotoResource;
use App\Http\Requests\StoreFotoRequest;
use App\Http\Requests\UpdateFotoRequest;
use App\Events\Refresh;
use Str;
use Storage;

class FotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $foto = FotoResource::collection(Foto::get());
        return Inertia::render('Foto/Index', [
            'foto' => $foto,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Foto/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreFotoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreFotoRequest $request)
    {
        if($request->validated())
        {
            $file = $request->file('file');
            $nama_file = Str::random(10).'_'.time().'.'.$file->getClientOriginalExtension();
            $path = $request->file->storeAs('public/foto', $nama_file);
            $foto = new Foto;
            $foto->title = $request->title;
            $foto->subtitle = $request->subtitle;
            $foto->file = $path;
            $foto->tampil = $request->tampil;

            if($foto->save())
            {
                broadcast(new Refresh('foto', 'update'));
                return Redirect::route('foto.index')->with('success', 'Foto berhasil ditambahkan.');
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Foto  $foto
     * @return \Illuminate\Http\Response
     */
    public function show(Foto $foto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Foto  $foto
     * @return \Illuminate\Http\Response
     */
    public function edit(Foto $foto)
    {
        return Inertia::render('Foto/Edit', [
            'foto' => $foto
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateFotoRequest  $request
     * @param  \App\Models\Foto  $foto
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateFotoRequest $request, Foto $foto)
    {
        if($request->validated())
        {
            $foto->title = $request->title;
            $foto->subtitle = $request->subtitle;
            $foto->tampil = $request->tampil;
            if(!empty($request->file('file')))
            {
                $file_lama = $foto->file;
                $file = $request->file('file');
                $nama_file = Str::random(10).'_'.time().'.'.$file->getClientOriginalExtension();
                $path = $request->file->storeAs('public/foto', $nama_file);
                $foto->file = $path;
                Storage::delete($file_lama);
            }
            $foto->save();
            broadcast(new Refresh('foto', 'update'));
            return Redirect::route('foto.index')->with('success', 'Foto berhasil diubah.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Foto  $foto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Foto $foto)
    {
        $file = $foto->file;
        $foto->delete();
        Storage::delete($file);
        broadcast(new Refresh('foto', 'update'));
        return Redirect::route('foto.index')->with('success', 'Foto berhasil dihapus.');
    }
}
