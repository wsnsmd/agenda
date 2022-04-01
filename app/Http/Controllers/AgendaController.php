<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use App\Models\Agenda;
use App\Models\Bidang;
use App\Http\Resources\AgendaResource;
use App\Http\Resources\AgendaKalResource;
use App\Http\Requests\StoreAgendaRequest;
use App\Http\Requests\UpdateAgendaRequest;
use App\Events\Refresh;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $agenda = AgendaResource::collection(Agenda::orderBy('tanggal', 'desc')->orderBy('jam_mulai', 'desc')->limit(300)->get());
        return Inertia::render('Agenda/Index', [
            'agenda' => $agenda,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $bidang = Bidang::orderBy('id')->get();
        return Inertia::render('Agenda/Create', [
            'bidang' => $bidang,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAgendaRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAgendaRequest $request)
    {
        Agenda::create($request->validated());
        broadcast(new Refresh('agenda', 'update'));
        return Redirect::route('agenda.index')->with('success', 'Agenda berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Agenda  $agenda
     * @return \Illuminate\Http\Response
     */
    public function show(Agenda $agenda)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Agenda  $agenda
     * @return \Illuminate\Http\Response
     */
    public function edit(Agenda $agenda)
    {
        $bidang = Bidang::orderBy('id')->get();
        return Inertia::render('Agenda/Edit', [
            'bidang' => $bidang,
            'agenda' => $agenda
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAgendaRequest  $request
     * @param  \App\Models\Agenda  $agenda
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAgendaRequest $request, Agenda $agenda)
    {
        $agenda->update($request->validated());
        broadcast(new Refresh('agenda', 'update'));
        return Redirect::route('agenda.index')->with('success', 'Agenda berhasil diubah.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Agenda  $agenda
     * @return \Illuminate\Http\Response
     */
    public function destroy(Agenda $agenda)
    {
        $agenda->delete();
        broadcast(new Refresh('agenda', 'update'));
        return Redirect::route('agenda.index')->with('success', 'Agenda berhasil dihapus.');
    }

    public function dataIndex(Request $request)
    {
        $start = $request::get('start');
        $end = $request::get('end');
        $kalendar = AgendaKalResource::collection(Agenda::whereBetween('tanggal', [$start, $end])->get());

        return response()->json($kalendar, 200);
    }
}
