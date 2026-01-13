<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Jenssegers\Agent\Agent;

use App\Models\Agenda;
use App\Models\Bidang;
use App\Models\Ticker;
use App\Models\Video;
use App\Models\Foto;
use App\Models\ViewSliderAgenda;
use App\Http\Resources\AgendaResource;
use App\Http\Resources\TickerResource;
use App\Http\Resources\VideoResource;
use App\Http\Resources\FotoResource;
use DB;

class FrontController extends Controller
{
    public function __construct() 
    {
        // $agent = new Agent();
        // if($agent->isMobile())
        //     abort(404);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Frontend/Index', [
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function agenda()
    {
        $agenda = AgendaResource::collection(ViewSliderAgenda::get());
        $ticker = TickerResource::collection(Ticker::get());
        return Inertia::render('Frontend/Agenda', [
            'agenda' => $agenda,
            'ticker' => $ticker,
        ]);
    }

    public function video()
    {
        $agenda = AgendaResource::collection(ViewSliderAgenda::get());
        $video = VideoResource::collection(Video::get());
        $ticker = TickerResource::collection(Ticker::get());
        return Inertia::render('Frontend/Video', [
            'agenda' => $agenda,
            'video' => $video,
            'ticker' => $ticker,
        ]);
    }

    public function foto()
    {
        $agenda = AgendaResource::collection(ViewSliderAgenda::get());
        $foto = FotoResource::collection(Foto::get());
        $ticker = TickerResource::collection(Ticker::get());
        return Inertia::render('Frontend/Foto', [
            'agenda' => $agenda,
            'foto' => $foto,
            'ticker' => $ticker,
        ]);
    }
}
