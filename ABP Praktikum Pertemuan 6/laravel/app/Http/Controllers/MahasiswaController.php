<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    /**
     * Menampilkan halaman utama
     */
    public function index()
    {
        return view('mahasiswa.index');
    }

    /**
     * Membaca file JSON dan mengembalikan data mahasiswa
     * dalam format JSON untuk request AJAX
     */
    public function getData()
    {
        // Path ke file JSON
        $filePath = public_path('data/mahasiswa.json');

        // Cek apakah file ada
        if (!file_exists($filePath)) {
            return response()->json([
                'success' => false,
                'message' => 'File data tidak ditemukan.'
            ], 404);
        }

        // Baca isi file JSON
        $jsonContent = file_get_contents($filePath);

        // Decode JSON menjadi array PHP
        $mahasiswa = json_decode($jsonContent, true);

        // Cek jika JSON tidak valid
        if (json_last_error() !== JSON_ERROR_NONE) {
            return response()->json([
                'success' => false,
                'message' => 'Format data tidak valid.'
            ], 500);
        }

        // Kembalikan data dalam format JSON
        return response()->json([
            'success' => true,
            'total' => count($mahasiswa),
            'data' => $mahasiswa
        ]);
    }
}
