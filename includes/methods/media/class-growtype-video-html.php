<?php

/**
 * Class Growtype_Video_In_Gallery
 */
class Growtype_Video_Html
{
    public function __construct()
    {
    }

    /**
     * @param $external_video_site
     * @return void
     */
    public static function render($parameters)
    {
        ?>
        <div class="growtype-video-main-wrapper"
             data-video-fit="<?php echo $parameters['video_fit'] ?? 'cover' ?>"
             style="<?php echo isset($parameters['video_height']) && !empty($parameters['video_height']) ? 'padding-top:' . $parameters['video_height'] : '' ?>"
        >
            <div class="growtype-video-player"
                 data-type="<?php echo $parameters['video_type'] ?? 'youtube' ?>"
                 data-link="<?php echo $parameters['external_video_link_id'] ?>"
                 data-start="<?php echo $parameters['external_video_start_time'] ?? 0 ?>"
                 data-play-action="<?php echo $parameters['play_action'] ?? 'load' ?>"
                 data-cover="<?php echo $parameters['cover_url'] ?? '' ?>"
                 data-custom-cover-enabled="<?php echo $parameters['custom_cover_enabled'] ?? '' ?>"
                 data-audio-is-muted="<?php echo $parameters['audio_is_muted'] ?? 'false' ?>"
                 data-video-is-looping="<?php echo $parameters['video_is_looping'] ?? 'true' ?>"
            ></div>
            <?php if (isset($parameters['video_type']) && $parameters['video_type'] !== 'html' && isset($parameters['custom_cover_enabled']) && $parameters['custom_cover_enabled'] === 'true') { ?>
                <div class="growtype-video-cover"
                     style="<?php echo isset($parameters['cover_url']) && !empty($parameters['cover_url']) ? 'background-image:url(' . $parameters['cover_url'] . ');background-size: cover;background-position: center;' : ''; ?>"
                ></div>
            <?php } ?>
            <?php if (isset($parameters['play_button']) && $parameters['play_button'] === 'true') { ?>
                <div class="growtype-video-btn-play"></div>
            <?php } ?>
        </div>
        <?php
    }

    /**
     * @param $url
     * @return false|mixed
     */
    public static function get_video_link_parameters($link, $type = 'youtube')
    {
        $external_video_start_time = 0;

        if ($type === 'youtube') {
            if (strpos($link, 'embed') > 0) {
                $external_video_link_id = self::parse_youtube_url($link);
            } else {
                parse_str(parse_url($link, PHP_URL_QUERY), $link_parameters);

                $external_video_link_id = isset($link_parameters['v']) ? $link_parameters['v'] : '';
                $external_video_start_time = isset($link_parameters['t']) ? str_replace('s', '', $link_parameters['t']) : '0';
            }
        } elseif ($type === 'html') {
            $external_video_link_id = $link;
        }

        return [
            'external_video_link_id' => $external_video_link_id,
            'external_video_start_time' => $external_video_start_time,
        ];
    }

    /**
     * @param $external_video_site
     * @param $external_video_link_id
     * @return string
     */
    public static function get_video_iframe_src($attachment_video_parameters)
    {
        $available_video_sites = array (
            'youtube' => 'https://www.youtube.com/embed/' . $attachment_video_parameters['external_video_link_id'] . '?start=' . $attachment_video_parameters['external_video_start_time'] . '&mute=1&enablejsapi=1',
            'vimeo' => 'https://player.vimeo.com/video/',
            'dailymotion' => 'https://www.dailymotion.com/embed/video/',
        );

        return $available_video_sites[$attachment_video_parameters['external_video_site']];
    }

    /**
     * @param $url
     * @return false|mixed
     */
    public static function parse_youtube_url($url)
    {
        $pattern = '#^(?:https?://)?(?:www\.)?(?:youtu\.be/|youtube\.com(?:/embed/|/v/|/watch\?v=|/watch\?.+&v=))([\w-]{11})(?:.+)?$#x';
        preg_match($pattern, $url, $matches);
        return (isset($matches[1])) ? $matches[1] : false;
    }
}
