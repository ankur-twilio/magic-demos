<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta Information -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Twilio Magic Demo</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@400;900&family=Playfair+Display&display=swap" rel="stylesheet">
    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css' rel='stylesheet' type='text/css'>
    

    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css"/>
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick-theme.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.8/sweetalert2.min.css" integrity="sha256-fzppLPp25b5mADxpqFQxFE3B7tqJZUmVELA0u42SUic=" crossorigin="anonymous" />
    
    <script
      src="https://code.jquery.com/jquery-2.2.4.min.js"
      integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
      crossorigin="anonymous"></script>
    <!-- Scripts -->
    
    <!-- Slick -->
    @yield('scripts', '')



</head>
<body>

        <!-- Main Content -->
        @yield('content')

    <!-- Footer Scripts -->
    @yield('fscripts', '')
    <!-- JavaScript -->
    <script src="{{ mix('js/app.js') }}"></script>

</body>
</html>