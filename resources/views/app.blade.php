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
    <title>My App</title>

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
    <link rel="icon" href="icons/favicon.png">


    <!-- Styles -->
    <link href="{{ asset('css/app.css?v=').env('ASSET_VERSION', 1)}}" rel="stylesheet">
</head>

<body>
    <div id="app"></div>
    <script type="module" src="{{ asset('js/app.js?v=').env('ASSET_VERSION', 1)}}"></script>
</body>

</html>