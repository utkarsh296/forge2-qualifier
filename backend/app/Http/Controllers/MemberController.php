<?php
namespace App\Http\Controllers;
use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller {
    public function index() {
        return Member::all();
    }
    public function store(Request $request) {
        $member = Member::create($request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:members'
        ]));
        return response()->json($member, 201);
    }
    public function update(Request $request, Member $member) {
        $member->update($request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:members,email,'.$member->id
        ]));
        return $member;
    }
    public function destroy(Member $member) {
        $member->delete();
        return response()->json(null, 204);
    }
}