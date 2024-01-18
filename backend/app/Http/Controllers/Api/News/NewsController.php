<?php

namespace App\Http\Controllers\Api\News;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NewsController extends Controller
{

    use HttpResponses;

    public function index(Request $request)
    {
        /*
        //@ If user is AUTHENTICATED
        */
        if ($request->user('sanctum')) {
            try {
                $user = $request->user('sanctum');
                // fetch news based on filters request
                $preferredCategories = unserialize($user->settings->categories);

                $preferredSources = unserialize($user->settings->sources);

                $query = News::query();

                $query->select('id', 'source', 'title', 'category', 'image_url', 'article_url', 'date_published','article_url','updated_at');

                $query->search($request->keyword);


                if ($preferredCategories && !isset($request->categories) && !isset($request->keyword)) {
                    $query->whereIn('category',  $preferredCategories);
                }
                if ($preferredSources && !isset($request->sources) && !isset($request->keyword)) {
                    $query->whereIn('source', $preferredSources);
                }

                // return $query->toSql();

                $filteredNews = $query->orderBy('date_published', 'desc')->paginate(25)->appends($request->all());

                return $this->success($filteredNews);
                
            } catch (\Throwable $th) {
                return $this->error('', $th, 500);
            }

            /*
        //@ If user is GUEST
        */
        } else {
            try {
                $query = News::query();

                $query->select('id', 'source', 'title', 'category', 'image_url', 'article_url', 'date_published','article_url','updated_at');

                $query->search($request->keyword);

                if ($request->categories) {
                    $query->whereIn('category',  $request->categories);
                }
                if ($request->sources) {
                    $query->whereIn('source', $request->sources);
                }

                $filteredNews = $query->orderBy('date_published', 'desc')->paginate(25)->appends($request->all());

                return $this->success([
                    $filteredNews
                ]);
            } catch (\Throwable $th) {
                return $this->error('', $th, 500);
            }
        }
    }


    public function show($id)
    {
        $item = News::find($id);

        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        return $this->success([
            $item
        ]);
    }
}
