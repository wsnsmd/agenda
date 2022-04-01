<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use App\Models\Bidang;
use App\Http\Requests\StoreBidangRequest;
use App\Http\Requests\UpdateBidangRequest;

class BidangController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $bidang = Bidang::orderBy('id')->get();
        return Inertia::render('Master/IndexBidang', [
            'bidang' => $bidang
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Master/CreateBidang');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreBidangRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBidangRequest $request)
    {
        Bidang::create($request->all());
        return Redirect::route('master.bidang.index')->with('success', 'Bidang berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Bidang  $bidang
     * @return \Illuminate\Http\Response
     */
    public function show(Bidang $bidang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Bidang  $bidang
     * @return \Illuminate\Http\Response
     */
    public function edit(Bidang $bidang)
    {
        return Inertia::render('Master/EditBidang', [
            'bidang' => $bidang,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBidangRequest  $request
     * @param  \App\Models\Bidang  $bidang
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBidangRequest $request, Bidang $bidang)
    {
        $bidang->update($request->validated());
        return Redirect::route('master.bidang.index')->with('success', 'Bidang berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Bidang  $bidang
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bidang $bidang)
    {
        $bidang->delete();
        return Redirect::route('master.bidang.index')->with('success', 'Bidang berhasil dihapus.');
    }
}
