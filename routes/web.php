<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\BidangController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PenggunaController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\FotoController;
use App\Http\Controllers\TickerController;
use App\Http\Controllers\FrontController;

Route::get('/', [FrontController::class, 'agenda'])->name('front.agenda');
Route::get('/index/foto', [FrontController::class, 'foto'])->name('front.foto');
Route::get('/index/video', [FrontController::class, 'video'])->name('front.video');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard')->middleware(['auth', 'verified']);

// Agenda
Route::get('/agenda', [AgendaController::class, 'index'])->name('agenda.index')->middleware(['auth']);
Route::get('/agenda/create', [AgendaController::class, 'create'])->name('agenda.create')->middleware(['auth']);
Route::post('/agenda', [AgendaController::class, 'store'])->name('agenda.store')->middleware(['auth']);
Route::get('/agenda/{agenda}/edit', [AgendaController::class, 'edit'])->name('agenda.edit')->middleware(['auth']);
Route::put('/agenda/{agenda}', [AgendaController::class, 'update'])->name('agenda.update')->middleware(['auth']);
Route::delete('/agenda/{agenda}', [AgendaController::class, 'destroy'])->name('agenda.destroy')->middleware(['auth']);
Route::get('/agenda/data/index', [AgendaController::class, 'dataIndex'])->name('agenda.data.index');

// Video
Route::get('/video', [VideoController::class, 'index'])->name('video.index')->middleware(['auth']);
Route::get('/video/create', [VideoController::class, 'create'])->name('video.create')->middleware(['auth']);
Route::post('/video', [VideoController::class, 'store'])->name('video.store')->middleware(['auth']);
Route::get('/video/{video}/edit', [VideoController::class, 'edit'])->name('video.edit')->middleware(['auth']);
Route::put('/video/{video}', [VideoController::class, 'update'])->name('video.update')->middleware(['auth']);
Route::delete('/video/{video}', [VideoController::class, 'destroy'])->name('video.destroy')->middleware(['auth']);

// Foto
Route::get('/foto', [FotoController::class, 'index'])->name('foto.index')->middleware(['auth']);
Route::get('/foto/create', [FotoController::class, 'create'])->name('foto.create')->middleware(['auth']);
Route::post('/foto', [FotoController::class, 'store'])->name('foto.store')->middleware(['auth']);
Route::get('/foto/{foto}/edit', [FotoController::class, 'edit'])->name('foto.edit')->middleware(['auth']);
Route::put('/foto/{foto}', [FotoController::class, 'update'])->name('foto.update')->middleware(['auth']);
Route::delete('/foto/{foto}', [FotoController::class, 'destroy'])->name('foto.destroy')->middleware(['auth']);

// Ticker
Route::get('/ticker', [TickerController::class, 'index'])->name('ticker.index')->middleware(['auth']);
Route::get('/ticker/create', [TickerController::class, 'create'])->name('ticker.create')->middleware(['auth']);
Route::post('/ticker', [TickerController::class, 'store'])->name('ticker.store')->middleware(['auth']);
Route::get('/ticker/{ticker}/edit', [TickerController::class, 'edit'])->name('ticker.edit')->middleware(['auth']);
Route::put('/ticker/{ticker}', [TickerController::class, 'update'])->name('ticker.update')->middleware(['auth']);
Route::delete('/ticker/{ticker}', [TickerController::class, 'destroy'])->name('ticker.destroy')->middleware(['auth']);

// Master Bidang
Route::get('/master/bidang', [BidangController::class, 'index'])->name('master.bidang.index')->middleware(['auth']);
Route::get('/master/bidang/create', [BidangController::class, 'create'])->name('master.bidang.create')->middleware(['auth']);
Route::post('/master/bidang', [BidangController::class, 'store'])->name('master.bidang.store')->middleware(['auth']);
Route::get('/master/bidang/{bidang}/edit', [BidangController::class, 'edit'])->name('master.bidang.edit')->middleware(['auth']);
Route::put('/master/bidang/{bidang}', [BidangController::class, 'update'])->name('master.bidang.update')->middleware(['auth']);
Route::delete('/master/bidang/{bidang}', [BidangController::class, 'destroy'])->name('master.bidang.destroy')->middleware(['auth']);

// Master Pengguna
Route::get('/master/pengguna', [PenggunaController::class, 'index'])->name('master.pengguna.index')->middleware(['auth']);
Route::get('/master/pengguna/create', [PenggunaController::class, 'create'])->name('master.pengguna.create')->middleware(['auth']);
Route::post('/master/pengguna', [PenggunaController::class, 'store'])->name('master.pengguna.store')->middleware(['auth']);
Route::get('/master/pengguna/{user}/edit', [PenggunaController::class, 'edit'])->name('master.pengguna.edit')->middleware(['auth']);
Route::put('/master/pengguna/{user}', [PenggunaController::class, 'update'])->name('master.pengguna.update')->middleware(['auth']);
Route::delete('/master/pengguna/{user}', [PenggunaController::class, 'destroy'])->name('master.pengguna.destroy')->middleware(['auth']);

require __DIR__.'/auth.php';
