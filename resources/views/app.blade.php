<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <meta name="description" content="Buku Tamu Elektronik">
        <meta name="keywords" content="Buku Tamu Elektronik">
        <meta name="author" content="IT BPSDM Prov. Kaltim">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Icons -->
        <link rel="shortcut icon" href="{{ asset('favicon-32x32.png') }}">
        <link rel="icon" sizes="192x192" type="image/png" href="{{ asset('android-icon-192x192.png') }}">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-icon-precomposed.png') }}">
        
        <!-- Styles -->
        <link href="https://rsms.me/inter/inter.css" rel="stylesheet">
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">

        <!-- Scripts -->
        @routes
        <script src="{{ mix('js/app.js') }}" defer></script>
    </head>
    <body class="font-sans antialiased">
        @inertia

        @env ('local')
            <script src="http://localhost:8080/js/bundle.js"></script>
        @endenv
    </body>
</html>
