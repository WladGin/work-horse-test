<?php

use App\Http\Controllers\Api\ApiContactController;
use Illuminate\Support\Facades\Route;

Route::prefix('/contacts')->name('api.contacts.')->group(function () {
    Route::post('/', [ApiContactController::class, 'store'])->name('store');
    Route::put('/{contact}', [ApiContactController::class, 'update'])->name('update');
    Route::delete('/{contact}', [ApiContactController::class, 'destroy'])->name('destroy');
});
