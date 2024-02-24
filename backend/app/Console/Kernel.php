<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // User Auth Session expiration
        $schedule->command('sanctum:prune-expired --hours=24')->daily();
        
        // NewsApi.org API
        $schedule->command('news-api:cron')->everyTwoMinutes();
        // New York Times News API
        $schedule->command('nyt-news:cron')->everyTwoMinutes();
        // The Guardian News API
        $schedule->command('tg-news:cron')->everyTwoMinutes();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
