<?php
   class Template {
      private $loader;
      private $twig;

      public function __construct() {
         $this->loader = new Twig_Loader_Filesystem('../templates/');
         $this->twig = new Twig_Environment($this->loader);
      }

      public function display($url) {
         $this->twig->display($url);
      }
   }
?>
