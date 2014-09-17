<!doctype>
<html>
<head>
    <meta charset="utf-8">
    <title>Test Async-Script</title>
    <script>
    <?php
        echo file_get_contents("../test-async.js");
    ?>
    </script>
</head>
<body>
    <p id="status">Running script...</p>
</body>
</html>