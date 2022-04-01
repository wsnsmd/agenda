<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use App\Models\Ticker;
use App\Http\Resources\TickerResource;
use App\Http\Requests\StoreTickerRequest;
use App\Http\Requests\UpdateTickerRequest;
use App\Events\Refresh;

class TickerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ticker = TickerResource::collection(Ticker::get());
        return Inertia::render('Ticker/Index', [
            'ticker' => $ticker,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Ticker/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTickerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTickerRequest $request)
    {
        Ticker::create($request->validated());
        broadcast(new Refresh('ticker', 'update'));
        return Redirect::route('ticker.index')->with('success', 'Ticker berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ticker  $ticker
     * @return \Illuminate\Http\Response
     */
    public function show(Ticker $ticker)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Ticker  $ticker
     * @return \Illuminate\Http\Response
     */
    public function edit(Ticker $ticker)
    {
        return Inertia::render('Ticker/Edit', [
            'ticker' => $ticker
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTickerRequest  $request
     * @param  \App\Models\Ticker  $ticker
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTickerRequest $request, Ticker $ticker)
    {
        $ticker->update($request->validated());
        broadcast(new Refresh('ticker', 'update'));
        return Redirect::route('ticker.index')->with('success', 'Ticker berhasil diubah.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ticker  $ticker
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ticker $ticker)
    {
        $ticker->delete();
        broadcast(new Refresh('ticker', 'update'));
        return Redirect::route('ticker.index')->with('success', 'Ticker berhasil dihapus.');
    }
}
