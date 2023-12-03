<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class News extends Model
{
    use HasFactory;

    protected $fillable = ['source', 'title', 'article', 'category', 'image_url', 'article_url', 'date_published'];

    protected $searchable = [
        'title', 'article', 'category', 'source'
    ];

    protected $hidden = ["article"];

    public function scopeSearch(Builder $builder, $query = '')
    {
        foreach ($this->searchable as $searchable) {
            $builder->orWhere($searchable, 'like', "%$query%");
        }
        return $builder;
    }
}
