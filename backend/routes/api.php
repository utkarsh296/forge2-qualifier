<?php
use App\Http\Controllers\BoardController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\MemberController;
use Illuminate\Support\Facades\Route;

Route::apiResource('boards', BoardController::class);
Route::apiResource('lists', ListController::class);
Route::apiResource('cards', CardController::class);
Route::apiResource('tags', TagController::class);
Route::apiResource('members', MemberController::class);

Route::post('cards/{card}/tags', [CardController::class, 'attachTag']);
Route::delete('cards/{card}/tags/{tagId}', [CardController::class, 'detachTag']);
Route::post('cards/{card}/members', [CardController::class, 'attachMember']);
Route::delete('cards/{card}/members/{memberId}', [CardController::class, 'detachMember']);