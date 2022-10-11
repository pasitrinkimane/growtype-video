<?php

/**
 * Class Growtype_Video_In_Gallery
 */
class Growtype_Video_Thumbnail
{
    public function __construct()
    {
        if (class_exists('WooCommerce')) {
            add_filter('woocommerce_single_product_image_thumbnail_html', array ($this, 'woocommerce_single_product_image_thumbnail_html_extend'), 10, 2);
        }
    }

    /**
     * Replace the single product thumbnail html with blank content
     */
    function woocommerce_single_product_image_thumbnail_html_extend($wc_gallery_image_html, $attachment_id)
    {
        if (Growtype_Video_Attachment::is_enabled_on_attachment($attachment_id)) {
            $attachment_video_parameters = Growtype_Video_Attachment::get_video_parameters($attachment_id);
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
                <?php echo Growtype_Video_Html::render($attachment_video_parameters, $image) ?>
            </div>
            <?php
        } else {
            echo $wc_gallery_image_html;
        }
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

        $attachment_video_parameters = Growtype_Video_Attachment::get_video_parameters($attachment_id);

        return Growtype_Video_Html::render($attachment_video_parameters, $image);
    }
}
