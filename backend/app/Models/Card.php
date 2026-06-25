<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Card extends Model {
    protected $fillable = ['list_id', 'title', 'description', 'due_date', 'order'];
    public function list() {
        return $this->belongsTo(KanbanList::class, 'list_id');
    }
    public function tags() {
        return $this->belongsToMany(Tag::class, 'card_tag');
    }
    public function members() {
        return $this->belongsToMany(Member::class, 'card_member');
    }
}