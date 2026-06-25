<?php
namespace App\Http\Controllers;
use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller {
    public function index() {
        return Card::with('tags', 'members')->get();
    }
    public function store(Request $request) {
        $card = Card::create($request->validate([
            'list_id' => 'required|exists:lists,id',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'order' => 'integer'
        ]));
        return response()->json($card->load('tags', 'members'), 201);
    }
    public function show(Card $card) {
        return $card->load('tags', 'members');
    }
    public function update(Request $request, Card $card) {
        $card->update($request->validate([
            'list_id' => 'sometimes|exists:lists,id',
            'title' => 'sometimes|string',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'order' => 'sometimes|integer'
        ]));
        return $card->load('tags', 'members');
    }
    public function destroy(Card $card) {
        $card->delete();
        return response()->json(null, 204);
    }
    public function attachTag(Request $request, Card $card) {
        $card->tags()->syncWithoutDetaching([$request->tag_id]);
        return $card->load('tags');
    }
    public function detachTag(Card $card, $tagId) {
        $card->tags()->detach($tagId);
        return $card->load('tags');
    }
    public function attachMember(Request $request, Card $card) {
        $card->members()->syncWithoutDetaching([$request->member_id]);
        return $card->load('members');
    }
    public function detachMember(Card $card, $memberId) {
        $card->members()->detach($memberId);
        return $card->load('members');
    }
}