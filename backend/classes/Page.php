<?php
   class Page {

      public static function home() {
         $template = new Template();
         $template->display('base.html.twig');
      }

      public static function users() {
         $template = new Template();
         $template->display('base.html.twig');
      }

      public static function error($code) {
         include("/var/www/errorpages/$code.html");
      }
   }
?>
