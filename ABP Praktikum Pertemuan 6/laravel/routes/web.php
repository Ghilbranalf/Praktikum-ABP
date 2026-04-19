<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MahasiswaController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Route halaman utama
Route::get('/', [MahasiswaController::class, 'index'])->name('mahasiswa.index');

// Route AJAX untuk mengambil data mahasiswa
Route::get('/api/mahasiswa', [MahasiswaController::class, 'getData'])->name('mahasiswa.data');
