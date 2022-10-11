<?php

/**
 * Class Growtype_Video_In_Gallery
 */
class Growtype_Video_Scripts
{
    public function __construct()
    {
        add_filter('wp_footer', array ($this, 'add_scripts'));
    }

    /**
     * Add scripts
     */
    function add_scripts()
    {
        ?>
        <script>
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        </script>
        <?php
    }
}
