<?php

namespace App\Console\Commands;

use App\Models\News;
use App\Models\ScheduleLog;
use DateTime;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Http;

class TheGuardianNewsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tg-news:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Populate news table with most recent news in last half hour from The Guardian News API';

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


        $url = "https://content.guardianapis.com/search?format=json&show-fields=bodyText,thumbnail&page-size=10&api-key=" . env('THE_GUARDIAN_API_KEY');

        $news = Http::timeout(30)->retry(3, 100)->get($url);


        $data = $news->json();

        foreach ($data['response']['results'] as $item) {
            $newsTime = new DateTime($item['webPublicationDate']);

            if (isset($latestRecord->executed_at) && $newsTime->format('Y-m-d H:i:s') > $latestRecord->executed_at) {
                News::create([
                    'source' => 'the-guardian',
                    'title' => $item['webTitle'],
                    'article' => $item['fields']['bodyText'],
                    'category' => strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $item['pillarName']))),
                    'image_url' => isset($item['fields']['thumbnail']) ? $item['fields']['thumbnail'] : null,
                    'article_url' => $item['webUrl'],
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
