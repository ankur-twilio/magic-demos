<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MagicController extends Controller
{

    public function index()
    {
        return view('magic.magic');
    }
}