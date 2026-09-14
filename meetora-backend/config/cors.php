<?php

// return [

//     'paths' => ['api/*', 'sanctum/csrf-cookie'],

//     'allowed_methods' => ['*'],

//     'allowed_origins' => [
//         env('FRONTEND_URL', 'http://localhost:5173'),
//         // 'https://meetora-frontend.onrender.com',
//     ],
//     // 'paths' => ['api/*', 'sanctum/csrf-cookie'],

//     // 'allowed_origins' => [
//     //     'https://meetoraa.tech',
//     //     'https://www.meetoraa.tech',
//     // ],

//     // 'supports_credentials' => true,

//     'allowed_origins_patterns' => [],

//     'allowed_headers' => ['*'],

//     'exposed_headers' => [],

//     'max_age' => 0,

//     'supports_credentials' => true,

// ];


// return [

//     'paths' => ['api/*', 'sanctum/csrf-cookie'],

//     'allowed_methods' => ['*'],

//     'allowed_origins' => [
//         env('VITE_API_BASE_URL', 'https://meetora-frontend.onrender.com'),
//     ],

//     'allowed_origins_patterns' => [],

//     'allowed_headers' => ['*'],

//     'exposed_headers' => [],
//     'APP_ENV'=>'production',
//     'APP_DEBUG'=>false,
//     'APP_URL'=>'https://meetora-nu9q.onrender.com',
//     'max_age' => 0,

//     'supports_credentials' => true,

// ];

return [

    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:5173'),
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];