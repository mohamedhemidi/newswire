<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Settings;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    use HttpResponses;

    public function updateSettings(Request $request, Settings $settings)
    {
        $user = Auth::user();

        if ($user->settings) {
            $user->settings->update([
                'user_id' => Auth::user()->id,
                'sources' => serialize($request->sources),
                'categories' => serialize($request->categories),
                'authors' => serialize($request->authors),
            ]);
            return $this->success([
                'message' => 'Settings are updated successfully!'
            ]);
        } else {
            $settings->create([
                'user_id' => Auth::user()->id,
                'sources' => serialize($request->sources),
                'categories' => serialize($request->categories),
                'authors' => serialize($request->authors),
            ]);
            return $this->success([
                'message' => 'Settings are created successfully!'
            ]);
        }
    }


    public function getCategories()
    {
        $categories = [];
        $data = News::select('category')->whereNotNull('category')->groupBy('category')->get();

        foreach ($data as $item) {
            $categories[] = (object) [ucwords(str_replace('-', ' ', $item->category)) => $item->category];
        }

        return response()->json([
            'categories' => $categories
        ]);
    }

    public function getSources()
    {
        $sources = [];
        $data = News::select('source')->whereNotNull('source')->groupBy('source')->get();

        foreach ($data as $item) {
            $sources[] = (object) [ucwords(str_replace('-', ' ', $item->source)) => $item->source];
        }

        return response()->json([
            'sources' => $sources
        ]);
    }

    public function getSettings()
    {
        $user = Auth::user();

        return response()->json([
            'categories' => unserialize($user->settings->categories),
            'sources' => unserialize($user->settings->sources)
        ]);
    }
}
