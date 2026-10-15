<?php

/**
 * CRM IT Park - Postman Collection Bundler
 * 
 * Automatically scans all controller subdirectories (Auth/, Leads/, Tickets/...)
 * inside tests/Postman/ and bundles their endpoints under the master "CRM" collection.
 * 
 * Usage:
 *   php tests/Postman/bundle.php
 */

$baseDir = __DIR__;
$masterFile = $baseDir . DIRECTORY_SEPARATOR . 'CRM.postman_collection.json';

$subdirs = glob($baseDir . DIRECTORY_SEPARATOR . '*', GLOB_ONLYDIR);
$items = [];

foreach ($subdirs as $dir) {
    $folderName = basename($dir);
    $endpointsFile = $dir . DIRECTORY_SEPARATOR . 'endpoints.json';

    if (file_exists($endpointsFile)) {
        $endpoints = json_decode(file_get_contents($endpointsFile), true);
        if (is_array($endpoints)) {
            $items[] = [
                'name' => $folderName,
                'description' => "Endpoints for {$folderName} Controller",
                'item' => $endpoints,
            ];
        }
    }
}

$masterCollection = [
    'info' => [
        '_postman_id' => 'crm-master-collection-itpark',
        'name' => 'CRM',
        'description' => 'CRM IT Park API Collection',
        'schema' => 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    ],
    'item' => $items,
];

file_put_contents($masterFile, json_encode($masterCollection, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

echo "Successfully built CRM.postman_collection.json" . PHP_EOL;
foreach ($items as $item) {
    echo "  - Added folder: " . $item['name'] . " (" . count($item['item']) . " endpoints)" . PHP_EOL;
}
