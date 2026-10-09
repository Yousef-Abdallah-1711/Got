<?php

use Roots\Acorn\Application;

if (! file_exists($autoload = __DIR__ . '/vendor/autoload.php')) {
    wp_die(__('Composer autoload file not found. Run composer install in the theme directory.', 'got-sage'));
}

require $autoload;

if (! class_exists(Application::class)) {
    wp_die(__('Acorn is not installed. Run composer install in the theme directory.', 'got-sage'));
}

Application::configure()
    ->withProviders([
        App\Providers\ThemeServiceProvider::class,
    ])
    ->boot();
