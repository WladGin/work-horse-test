<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

//Route::get('/', function () {
//    return view('welcome');
//});

Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
