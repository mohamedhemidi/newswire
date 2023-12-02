<?php

namespace App\Console\Commands;

use App\Models\News;
use App\Models\ScheduleLog;
use DateTime;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class NewsAPICommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news-api:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Populate news table with most recent news in last half hour from Newsapi.org API';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        /*
        // Fetching the most recent execution time for news time comparison
        */

        $latestRecord = ScheduleLog::where('scheduled_task_name', '=', $this->signature)->latest('executed_at')->first();


        /*
        // Populating news table with ALL recent news logic
        */


        $url = "https://newsapi.org/v2/everything?sources=abc-news,al-jazeera-english,der-tagesspiegel,the-washington-post,time,business-insider-uk&language=en&from=2023-11-29&to=2023-11-29&sortBy=popularity&pageSize=100&apiKey=" . env('NEWSAPI_API_KEY');

        $news = Http::timeout(30)->retry(3, 100)->get($url);


        $data = $news->json();

        foreach ($data['articles'] as $item) {
            $newsTime = new DateTime($item['publishedAt']);

            if (isset($latestRecord->executed_at) && $newsTime->format('Y-m-d H:i:s') > $latestRecord->executed_at) {
                News::create([
                    'source' => 'newsapi-org',
                    'title' => $item['title'],
                    'article' => $item['content'],
                    'category' => 'general',
                    'image_url' => $item['urlToImage'],
                    'article_url' => $item['url'],
                    'date_published' => $newsTime,
                ]);
            }
        }

        /*
        /
        // Log execution time for next execution reference
        /
        */

        ScheduleLog::create(['executed_at' => now(), 'scheduled_task_name' => $this->signature]);
    }
}
