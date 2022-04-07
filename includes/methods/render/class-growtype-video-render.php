<?php

/**
 * Class Growtype_Video_Render
 */
class Growtype_Video_Render
{
    public function __construct()
    {
        add_filter('attachment_fields_to_edit', array ($this, 'attachment_fields_to_edit_extend'), 20, 2);
        add_filter('edit_attachment', array ($this, 'edit_attachment_extend'), 20, 1);
        add_filter('woocommerce_single_product_image_thumbnail_html', array ($this, 'woocommerce_single_product_image_thumbnail_html_extend'), 10, 2);
        add_action('woocommerce_product_thumbnails', array ($this, 'woocommerce_product_thumbnails_extend'), 20);
    }

    /**
     * Add form field to get video link id for product image
     **/
    function attachment_fields_to_edit_extend($form_fields, $attachment)
    {
        if ($_POST['action'] === 'get-attachment') {
            $post_id = (int)$_POST['id'];

            if (empty($post_id)) {
                return $form_fields;
            }

            $available_video_sites = ['youtube'];
            $nonce = wp_create_nonce('growtype_video_attach_' . $attachment->ID);
            $attach_image_action_url = admin_url("media-upload.php?tab=library&post_id=$post_id");

            $field_value = get_post_meta($attachment->ID, 'growtype_video_external_video_link_id', true);
            $external_video_site = get_post_meta($attachment->ID, 'growtype_video_external_video_site', true);
            $youtube = ($external_video_site == 'youtube') ? 'checked' : '';
            $vimeo = ($external_video_site == 'vimeo') ? 'checked' : '';
            $checked = '';

            if (empty($youtube) && empty($vimeo)) {
                $checked = 'checked';
            }

            $form_fields['growtype_video_external_video_link_id'] = array (
                'value' => $field_value ? $field_value : '',
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
                'value' => $external_video_site,
                'html' => $growtype_video_external_video_site_html,
                'helps' => $growtype_video_external_video_site_helps
            );
        }

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
        $external_video_link_id = get_post_meta($attachment_id, 'growtype_video_external_video_link_id', true);
        $external_video_site = get_post_meta($attachment_id, 'growtype_video_external_video_site', true);

        if (!empty($external_video_link_id) && !empty($external_video_site)) {
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
            <div data-thumb="<?php echo esc_url($thumbnail_src[0]) ?>" data-thumb-alt="<?php echo esc_attr($alt_text) ?>" class="woocommerce-product-gallery__image has-growtype-video">
                <?php if ($external_video_site === 'youtube') { ?>
                    <iframe width="100%" src="https://www.youtube.com/embed/<?php echo $external_video_link_id ?>?mute=1&enablejsapi=1" data-lazy-src="https://www.youtube.com/embed/<?php echo $external_video_link_id ?>?mute=1&enablejsapi=1" class="lazyloaded"></iframe>
                    <div class="video-cover" style="">
                        <?php echo $image ?>
                        <img class="video-play-icon" src="<?php echo GROWTYPE_VIDEO_URL_PUBLIC . 'icons/play.svg' ?>" alt="">
                    </div>
                <?php } elseif ($external_video_site === 'vimeo') { ?>

                <?php } ?>
            </div>
            <?php
        }

        return $wc_gallery_image_html;
    }

    /**
     * @global type $woocommerce
     * @global type $product
     * Add new html layout of single product thumbnails
     */
    function woocommerce_product_thumbnails_extend($html)
    {
        global $woocommerce;
        global $post, $product;

//        return '';

//        $attachment_ids = $product->get_gallery_image_ids();
//        $enable_lightbox = 'yes';
//
//        if ($attachment_ids) {
//            $loop = 0;
//            $columns = apply_filters('woocommerce_product_thumbnails_columns', 3);
//            $newhtml = '<div class="thumbnails columns-' . $columns . '">';
//            foreach ($attachment_ids as $attachment_id) {
//                $classes = array ('zoom');
//                if ($loop == 0 || $loop % $columns == 0) {
//                    $classes[] = 'first';
//                }
//                if (($loop + 1) % $columns == 0) {
//                    $classes[] = 'last';
//                }
//                $image_link = wp_get_attachment_url($attachment_id);
//                if (!$image_link) {
//                    continue;
//                }
//                $video_link = '';
//                $props = wc_get_product_attachment_props($attachment_id, 'true');
//                $image = wp_get_attachment_image($attachment_id, apply_filters('single_product_small_thumbnail_size', 'shop_thumbnail'), 0, $props);
//                $image_class = esc_attr(implode(' ', $classes));
//                $image_title = esc_attr(get_the_title($attachment_id));
//                $external_video_link_id = get_post_meta($attachment_id, 'external_video_link_id', true);
//                $external_video_site = get_post_meta($attachment_id, 'external_video_site', true);
//                if (!empty($external_video_link_id) && !empty($external_video_site)) {
//                    switch ($external_video_site) {
//                        case 'youtube':
//                            $video_link = ($enable_lightbox == 'yes') ? 'https://www.youtube.com/watch?v=' . $external_video_link_id : 'https://www.youtube.com/embed/' . $external_video_link_id;
//                            break;
//                        case 'vimeo':
//                            $video_link = ($enable_lightbox == 'yes') ? 'https://vimeo.com/' . $external_video_link_id : 'https://player.vimeo.com/video/' . $external_video_link_id;
//                            break;
//                    }
//                }
//                $video = '';
//                if (!empty($video_link)) {
//                    $video = 'is-video';
//                }
//                $link = (empty($video_link)) ? $image_link : $video_link;
//                if (isset($props['gallery_thumbnail_src'])) {
//                    $newhtml .= '<a href="' . $link . '" class="' . $image_class . ' ' . $video . '" title="' . $image_title . '" caption="' . $props['caption'] . '" data-rel="prettyPhoto[product-gallery]"><span class="img-inner" style="background:url(' . $props['gallery_thumbnail_src'] . ');background-size: cover;background-position: center;"></span></a>';
//                } else {
//                    $newhtml .= '<a href="' . $link . '" class="' . $image_class . ' ' . $video . '" title="' . $image_title . '" caption="' . $props['caption'] . '" data-rel="prettyPhoto[product-gallery]"><span class="img-inner" style="background:url(' . $props['url'] . ');background-size: cover;background-position: center;"></span></a>';
//                }
//                $loop++;
//            }
//            $newhtml .= '</div>';
//        }
//        echo $newhtml;
    }
}
