<?php

/**
 * Class Growtype_Video_In_Gallery
 */
class Growtype_Video_Shortcode
{
    public function __construct()
    {
        if (!is_admin() && !wp_is_json_request()) {
            add_shortcode('growtype_video', array ($this, 'growtype_video_shortcode'));
        }
    }

    /**
     *
     */
    function growtype_video_shortcode($atts)
    {
        extract(shortcode_atts(array (
            'video_url' => '',
            'video_type' => 'youtube',
            'cover_url' => '',
            'play_action' => 'load',
            'video_fit' => 'cover',
            'play_button' => false,
            'video_height' => false,
            'custom_cover_enabled' => false,
            'audio_is_muted' => false,
            'video_is_looping' => true,
        ), $atts));

        if (empty($video_url)) {
            return null;
        }

        ob_start();

        $parameters = Growtype_Video_Html::get_video_link_parameters($video_url, $video_type);

        $parameters = array_merge($parameters, $atts);

        echo Growtype_Video_Html::render($parameters);

        return ob_get_clean();
    }
}
