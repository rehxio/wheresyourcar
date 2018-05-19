<?php
   require('base.php');

   $page = new Page();

   Flight::route('/', ['Page' , 'home']);
   Flight::route('/users', ['Page' , 'users']);
   Flight::map('notFound', function() {
      header("HTTP/1.0 404 Not Found");
      Page::error(404);
   });
   
   Flight::route('/users/@name:[A-Za-z]+(/@id:[0-9]{3})', function($name, $id) {
      echo "Usuario $name con ID: $id";
   });

   Flight::start();
?>
