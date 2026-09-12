<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:5173'),
        // 'https://meetora-frontend.onrender.com',
    ],
    // 'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // 'allowed_origins' => [
    //     'https://meetoraa.tech',
    //     'https://www.meetoraa.tech',
    // ],

    // 'supports_credentials' => true,

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];