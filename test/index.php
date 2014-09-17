<!doctype>
<html>
<head>
    <meta charset="utf-8">
    <title>Test Async-Script</title>
    <script>
    <?php
        echo file_get_contents("../async.js");
    ?>
    </script>
</head>
<body>
    <p id="status">Running script...</p>
</body>
</html>