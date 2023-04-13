<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <!--
  Customize this policy to fit your own app's needs. For more guidance, please refer to the docs:
      https://cordova.apache.org/docs/en/latest/
  Some notes:
    * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly
    * Disables use of inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:
      * Enable inline JS: add 'unsafe-inline' to default-src
  -->
    <meta http-equiv="Content-Security-Policy" content="default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: content:">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">

    <meta name="theme-color" content="#fff">
    <meta name="format-detection" content="telephone=no">
    <meta name="msapplication-tap-highlight" content="no">
    <title>AMTS</title>

    <base href="{{asset('')}}">

    <!-- Styles -->
    <link href="{{ asset('css/app.css?v=').env('ASSET_VERSION', 1)}}" rel="stylesheet">
    <link href="{{ asset('fonts/icons.css?v=').env('ASSET_VERSION', 1)}}" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body>
    <div id="app"></div>
    <script type="module" src="{{ asset('js/app.js?v=').env('ASSET_VERSION', 1)}}"></script>
</body>

</html>