<?php

/**
 * Class Growtype_Video_Render
 */
class Growtype_Video_Render
{
    const ATTACHMENT_VIDEO_PARAMETERS_ENABLED = false;

    public function __construct()
    {
        if (self::ATTACHMENT_VIDEO_PARAMETERS_ENABLED) {
            add_filter('attachment_fields_to_edit', array ($this, 'attachment_fields_to_edit_extend'), 20, 2);
            add_filter('edit_attachment', array ($this, 'edit_attachment_extend'), 20, 1);
        }

        add_filter('woocommerce_single_product_image_thumbnail_html', array ($this, 'woocommerce_single_product_image_thumbnail_html_extend'), 10, 2);
    }

    /**
     * @param $attachment_id
     * @return array
     */
    public static function get_attachment_video_parameters($attachment_id)
    {
        $external_video_link_id = get_post_meta($attachment_id, 'growtype_video_external_video_link_id', true);
        $external_video_site = get_post_meta($attachment_id, 'growtype_video_external_video_site', true);

        $attachment_video_parameters = [
            'external_video_link_id' => $external_video_link_id,
            'external_video_site' => !empty($external_video_site) ? $external_video_site : 'youtube',
        ];

        return apply_filters('growtype_video_attachment_video_parameters', $attachment_video_parameters, $attachment_id);
    }

    /**
     * @param $attachment_id
     * @return bool
     */
    public static function is_enabled_on_attachment($attachment_id): bool
    {
        if (!$attachment_id) {
            $attachment_id = get_post_thumbnail_id();
        }

        $attachment_video_parameters = self::get_attachment_video_parameters($attachment_id);

        return !empty($attachment_video_parameters['external_video_link_id']) && !empty($attachment_video_parameters['external_video_site']);
    }

    /**
     * @param $size
     * @param $attachment_id
     * @return mixed|string|void
     */
    public static function get_product_thumbnail($size = 'woocommerce_thumbnail', $attachment_id = false)
    {
        if (has_post_thumbnail()) {
            if (!$attachment_id) {
                $attachment_id = get_post_thumbnail_id();
            }

            $image = wp_get_attachment_image(
                $attachment_id,
                $size
            );

        } elseif (wc_placeholder_img_src()) {
            $image = wc_placeholder_img($size);
        }

        $attachment_video_parameters = self::get_attachment_video_parameters($attachment_id);

        return self::get_video_iframe($attachment_video_parameters['external_video_link_id'], $attachment_video_parameters['external_video_site'], $image);
    }

    /**
     * Add form field to get video link id for product image
     **/
    function attachment_fields_to_edit_extend($form_fields, $attachment)
    {
        $post_id = (int)$_POST['id'];
        $nonce = wp_create_nonce('growtype_video_attach_' . $attachment->ID);
        $attach_image_action_url = admin_url("media-upload.php?tab=library&post_id=$post_id");
        $available_video_sites = ['youtube'];
        $attachment_video_parameters = self::get_attachment_video_parameters($attachment->ID);
        $youtube = ($attachment_video_parameters['external_video_site'] == 'youtube') ? 'checked' : '';
        $vimeo = ($attachment_video_parameters['external_video_site'] == 'vimeo') ? 'checked' : '';
        $checked = '';

        if (empty($youtube) && empty($vimeo)) {
            $checked = 'checked';
        }

        $form_fields['growtype_video_external_video_link_id'] = array (
            'value' => $attachment_video_parameters['external_video_link_id'] ? $attachment_video_parameters['external_video_link_id'] : '',
            'input' => "text",
            'label' => __('Video Link ID')
        );

        $growtype_video_external_video_site_html = '';
        $growtype_video_external_video_site_helps = 'How to get video link id?<br>';

        foreach ($available_video_sites as $available_video_site) {
            if ($available_video_site === 'youtube') {
                $growtype_video_external_video_site_html .= "<input type='radio' name='attachments[{$attachment->ID}][growtype_video_external_video_site]' value='youtube' $youtube $checked> Youtube";
                $growtype_video_external_video_site_helps .= __("Youtube: https://www.youtube.com/watch?v={video_id}", 'growtype-video');
            } elseif ($available_video_site === 'vimeo') {
                $growtype_video_external_video_site_html .= "<input type='radio' name='attachments[{$attachment->ID}][growtype_video_external_video_site]' value='vimeo' $vimeo $checked> Vimeo";
                $growtype_video_external_video_site_helps .= __("Vimeo: https://vimeo.com/{video_id}", 'growtype-video');
            }
        }

        $form_fields['growtype_video_external_video_site'] = array (
            'input' => 'html',
            'value' => $attachment_video_parameters['external_video_site'],
            'html' => $growtype_video_external_video_site_html,
            'helps' => $growtype_video_external_video_site_helps
        );

        return $form_fields;
    }

    /**
     * Save form field of video link to display video on product image
     **/
    function edit_attachment_extend($attachment_id)
    {
        if (isset($_REQUEST['attachments'][$attachment_id]['growtype_video_external_video_link_id'])) {
            $external_video_link_id = $_REQUEST['attachments'][$attachment_id]['growtype_video_external_video_link_id'];
            update_post_meta($attachment_id, 'growtype_video_external_video_link_id', $external_video_link_id);
        }
        if (isset($_REQUEST['attachments'][$attachment_id]['growtype_video_external_video_site'])) {
            $external_video_site = $_REQUEST['attachments'][$attachment_id]['growtype_video_external_video_site'];
            update_post_meta($attachment_id, 'growtype_video_external_video_site', $external_video_site);
        }
    }

    /**
     * Replace the single product thumbnail html with blank content
     */
    function woocommerce_single_product_image_thumbnail_html_extend($wc_gallery_image_html, $attachment_id)
    {
        if (self::is_enabled_on_attachment($attachment_id)) {
            $attachment_video_parameters = self::get_attachment_video_parameters($attachment_id);
            $thumbnail_w = wc_get_product_attachment_props($attachment_id, 'true')['src_w'];
            $thumbnail_h = wc_get_product_attachment_props($attachment_id, 'true')['src_h'];
            $flexslider = (bool)apply_filters('woocommerce_single_product_flexslider_enabled', get_theme_support('wc-product-gallery-slider'));
            $gallery_thumbnail = wc_get_image_size('gallery_thumbnail');
            $thumbnail_size = apply_filters('woocommerce_gallery_thumbnail_size', array ($gallery_thumbnail['width'], $gallery_thumbnail['height']));
            $image_size = apply_filters('woocommerce_gallery_image_size', $flexslider ? 'woocommerce_single' : $thumbnail_size);
            $full_size = apply_filters('woocommerce_gallery_full_size', apply_filters('woocommerce_product_thumbnails_large_size', 'full'));
            $thumbnail_src = wp_get_attachment_image_src($attachment_id, $thumbnail_size);
            $full_src = wp_get_attachment_image_src($attachment_id, $full_size);
            $alt_text = trim(wp_strip_all_tags(get_post_meta($attachment_id, '_wp_attachment_image_alt', true)));
            $image = wp_get_attachment_image(
                $attachment_id,
                $image_size,
                false,
                apply_filters(
                    'woocommerce_gallery_image_html_attachment_image_params',
                    array (
                        'title' => _wp_specialchars(get_post_field('post_title', $attachment_id), ENT_QUOTES, 'UTF-8', true),
                        'data-caption' => _wp_specialchars(get_post_field('post_excerpt', $attachment_id), ENT_QUOTES, 'UTF-8', true),
                        'data-src' => esc_url($full_src[0]),
                        'data-large_image' => esc_url($full_src[0]),
                        'data-large_image_width' => esc_attr($full_src[1]),
                        'data-large_image_height' => esc_attr($full_src[2]),
                        'class' => esc_attr('wp-post-image'),
                    ),
                    $attachment_id,
                    $image_size
                )
            );
            ?>
            <div data-thumb="<?php echo esc_url($thumbnail_src[0]) ?>" data-thumb-alt="<?php echo esc_attr($alt_text) ?>?video=true" class="woocommerce-product-gallery__image has-growtype-video">
                <?php echo self::get_video_iframe($attachment_video_parameters['external_video_link_id'], $attachment_video_parameters['external_video_site'], $image) ?>
            </div>
            <?php
        } else {
            echo $wc_gallery_image_html;
        }
    }

    /**
     * @param $external_video_site
     * @return void
     */
    public static function get_video_iframe($external_video_link_id, $external_video_site, $image)
    {
        ?>
        <div class="growtype-video-main-wrapper">
            <iframe width="100%" src="<?php echo self::get_video_iframe_src($external_video_site, $external_video_link_id) ?>" data-lazy-src="<?php echo self::get_video_iframe_src($external_video_site, $external_video_link_id) ?>" class="lazyloaded"></iframe>
            <div class="video-cover" style="">
                <?php echo $image ?>
                <img class="video-play-icon" src="<?php echo GROWTYPE_VIDEO_URL_PUBLIC . 'images/play.svg' ?>" alt="">
            </div>
        </div>
        <?php
    }

    /**
     * @param $external_video_site
     * @param $external_video_link_id
     * @return string
     */
    public static function get_video_iframe_src($external_video_site, $external_video_link_id)
    {
        $available_video_sites = array (
            'youtube' => 'https://www.youtube.com/embed/' . $external_video_link_id . '?mute=1&enablejsapi=1',
            'vimeo' => 'https://player.vimeo.com/video/',
            'dailymotion' => 'https://www.dailymotion.com/embed/video/',
        );

        return $available_video_sites[$external_video_site];
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
