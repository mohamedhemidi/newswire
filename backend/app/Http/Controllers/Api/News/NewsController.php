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

    public function guestIndex()
    {
        return "Guest not authenticated";
    }


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

                $query->search($request->keyword);

                if ($preferredCategories) {
                    $query->whereIn('category',  $preferredCategories);
                }
                if ($preferredSources) {
                    $query->whereIn('source', $preferredSources);
                }

                // return $query->toSql();

                $filteredNews = $query->get();
                $count = $filteredNews->count();

                return $this->success([
                    'count' => $count,
                    'data' => $filteredNews
                ]);
            } catch (\Throwable $th) {
                return $this->error('', $th, 500);
            }

            /*
        //@ If user is GUEST
        */
        } else {
            try {
                $query = News::query();

                $query->search($request->keyword);

                if ($request->categories) {
                    $query->whereIn('category',  $request->categories);
                }
                if ($request->sources) {
                    $query->whereIn('source', $request->sources);
                }

                $filteredNews = $query->get();
                $count = $filteredNews->count();

                return $this->success([
                    'count' => $count,
                    'data' => $filteredNews
                ]);
            } catch (\Throwable $th) {
                return $this->error('', $th, 500);
            }
        }
    }
}
