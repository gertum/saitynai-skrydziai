<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ErrorController
{
    public function error(Request $request)
    {
        $error = $request->get('error');
        return Inertia::render('Error',['error'=>$error]);
    }
}
