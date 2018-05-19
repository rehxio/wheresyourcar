<?php
   ini_set('display_errors', 1);
   error_reporting(E_ALL);
   
   require($_SERVER['DOCUMENT_ROOT'] . "/../vendor/autoload.php");
   
   spl_autoload_register(
      function ($className) {
      $path = $_SERVER['DOCUMENT_ROOT'] . "/classes/{$className}.php";
      if (file_exists($path)) {
         require_once($path);
      }
   });
?>
