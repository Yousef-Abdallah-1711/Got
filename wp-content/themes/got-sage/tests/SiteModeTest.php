<?php

declare(strict_types=1);

$test_options = [];
$test_option_reads = 0;
$test_option_writes = 0;

function get_option($option, $default = false)
{
    $GLOBALS['test_option_reads']++;

    return $GLOBALS['test_options'][$option] ?? $default;
}

function update_option($option, $value, $autoload = null): bool
{
    $GLOBALS['test_option_writes']++;

    return false;
}

require_once dirname(__DIR__) . '/app/Support/SiteMode.php';

use App\Support\SiteMode;

function check_mode(string $expected, string $message): void
{
    $actual = SiteMode::get_mode();

    if ($actual !== $expected) {
        fwrite(STDERR, "FAIL {$message}: expected {$expected}, got {$actual}\n");
        exit(1);
    }

    echo "PASS {$message}\n";
}

check_mode('coming_soon', 'missing mode defaults to Coming Soon');

$GLOBALS['test_options']['got_site_mode'] = 'store';
check_mode('store', 'stored Store mode is returned');

$GLOBALS['test_options']['got_site_mode'] = 'coming_soon';
check_mode('coming_soon', 'stored Coming Soon mode is returned');

$GLOBALS['test_options']['got_site_mode'] = 'unexpected';
check_mode('coming_soon', 'unknown mode falls back to Coming Soon');

$GLOBALS['test_options']['got_site_mode'] = ['store'];
check_mode('coming_soon', 'malformed mode falls back to Coming Soon');

if ($GLOBALS['test_option_reads'] !== 5) {
    fwrite(STDERR, "FAIL getter reads the plugin-owned option on every call\n");
    exit(1);
}

if ($GLOBALS['test_option_writes'] !== 0) {
    fwrite(STDERR, "FAIL getter never writes site mode\n");
    exit(1);
}

echo "PASS getter reads without writing\n";
