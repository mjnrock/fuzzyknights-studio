<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/metro/4.2.44/css/metro-all.min.css" />
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/metro/4.2.44/js/metro.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jcanvas/21.0.1/min/jcanvas.min.js"></script>

        <title>FuzzyKnights Studio</title>
    </head>
    <body>
        <?php
            echo "Hey";
        ?>
        <div><?= "cats"; ?></div>

        <script type="module">
            import WebSocketHelper from "./assets/js/WebSocketHelper.js";
            const WS = new WebSocketHelper();
            
            setTimeout(() => {
                WS.Send({ msg: "Hey" });
            }, 100);
        </script>
    </body>
</html>