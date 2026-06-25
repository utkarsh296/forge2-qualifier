<?php
namespace App\Http\Controllers;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller {
    public function index() {
        return Tag::all();
    }
    public function store(Request $request) {
        $tag = Tag::create($request->validate([
            'name' => 'required|string',
            'color' => 'sometimes|string'
        ]));
        return response()->json($tag, 201);
    }
    public function update(Request $request, Tag $tag) {
        $tag->update($request->validate([
            'name' => 'sometimes|string',
            'color' => 'sometimes|string'
        ]));
        return $tag;
    }
    public function destroy(Tag $tag) {
        $tag->delete();
        return response()->json(null, 204);
    }
}