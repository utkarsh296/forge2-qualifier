<?php
namespace App\Http\Controllers;
use App\Models\KanbanList;
use Illuminate\Http\Request;

class ListController extends Controller {
    public function index() {
        return KanbanList::with('cards')->get();
    }
    public function store(Request $request) {
        $list = KanbanList::create($request->validate([
            'board_id' => 'required|exists:boards,id',
            'name' => 'required|string',
            'order' => 'integer'
        ]));
        return response()->json($list, 201);
    }
    public function show(KanbanList $kanbanList) {
        return $kanbanList->load('cards');
    }
    public function update(Request $request, KanbanList $kanbanList) {
        $kanbanList->update($request->validate([
            'name' => 'sometimes|string',
            'order' => 'sometimes|integer'
        ]));
        return $kanbanList;
    }
    public function destroy(KanbanList $kanbanList) {
        $kanbanList->delete();
        return response()->json(null, 204);
    }
}