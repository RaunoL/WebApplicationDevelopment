<?php
// require 'vendor/autoload.php';
require('/var/www/html/share/vendor/autoload.php');

$app = new \Slim\App;

//database connection
include './db_conn.php';

//routes
include './routes/get_routes.php';
include './routes/post_routes.php';

// Run the application
$app->run();