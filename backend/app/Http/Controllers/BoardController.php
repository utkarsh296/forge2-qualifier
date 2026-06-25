<?php
namespace App\Http\Controllers;
use App\Models\Board;
use Illuminate\Http\Request;

class BoardController extends Controller {
    public function index() {
        return Board::with('lists.cards')->get();
    }
    public function store(Request $request) {
        $board = Board::create($request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string'
        ]));
        return response()->json($board, 201);
    }
    public function show(Board $board) {
        return $board->load('lists.cards.tags', 'lists.cards.members');
    }
    public function update(Request $request, Board $board) {
        $board->update($request->validate([
            'name' => 'sometimes|string',
            'description' => 'nullable|string'
        ]));
        return $board;
    }
    public function destroy(Board $board) {
        $board->delete();
        return response()->json(null, 204);
    }
}