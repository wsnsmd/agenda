<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use App\Models\Video;
use App\Http\Resources\VideoResource;
use App\Http\Requests\StoreVideoRequest;
use App\Http\Requests\UpdateVideoRequest;
use App\Events\Refresh;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $video = VideoResource::collection(Video::get());
        return Inertia::render('Video/Index', [
            'video' => $video,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Video/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreVideoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreVideoRequest $request)
    {
        Video::create($request->validated());
        broadcast(new Refresh('video', 'update'));
        return Redirect::route('video.index')->with('success', 'Video berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function show(Video $video)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function edit(Video $video)
    {
        return Inertia::render('Video/Edit', [
            'video' => $video
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateVideoRequest  $request
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateVideoRequest $request, Video $video)
    {
        $video->update($request->validated());
        broadcast(new Refresh('video', 'update'));
        return Redirect::route('video.index')->with('success', 'Video berhasil diubah.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function destroy(Video $video)
    {
        $video->delete();
        broadcast(new Refresh('video', 'update'));
        return Redirect::route('video.index')->with('success', 'Video berhasil dihapus.');
    }
}
