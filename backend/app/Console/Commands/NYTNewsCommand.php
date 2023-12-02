<?php

namespace App\Console\Commands;

use App\Models\News;
use App\Models\ScheduleLog;
use DateTime;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class NYTNewsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'nyt-news:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Populate news table with most recent news in last half hour from NewYork Times News API';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        /*
        // Fetching the most recent execution for time comparison
        */

        $latestRecord = ScheduleLog::where('scheduled_task_name', '=', $this->signature)->latest('executed_at')->first();


        /*
        // Populating news table with ALL recent news logic
        */

        $url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=&api-key=" . env('NY_TIMES_API_KEY');

        $news = Http::timeout(30)->retry(3, 100)->get($url);

        $data = $news->json();

        foreach ($data['response']['docs'] as $item) {
            $newsTime = new DateTime($item['pub_date']);

            if (isset($latestRecord->executed_at) && $newsTime->format('Y-m-d H:i:s') > $latestRecord->executed_at) {
                News::create([
                    'source' => 'new-york-times',
                    'title' => isset($item['headline']['main']) ? $item['headline']['main'] : null,
                    'article' => isset($item['lead_paragraph']) ? $item['lead_paragraph'] : null,
                    'category' => isset($item['section_name']) ? strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $item['section_name']))) : null,
                    'image_url' => isset($item['multimedia'][0]) ? 'https://www.nytimes.com/' . $item['multimedia'][0]['url'] : null,
                    'article_url' => isset($item['web_url']) ? $item['web_url'] : null,
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
