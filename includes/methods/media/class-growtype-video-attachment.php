<?php

/**
 * Class Growtype_Video_In_Gallery
 */
class Growtype_Video_Attachment
{
    const ATTACHMENT_VIDEO_PARAMETERS_ENABLED = false;

    public function __construct()
    {
        if (self::ATTACHMENT_VIDEO_PARAMETERS_ENABLED) {
            add_filter('attachment_fields_to_edit', array ($this, 'attachment_fields_to_edit_extend'), 20, 2);
            add_filter('edit_attachment', array ($this, 'edit_attachment_extend'), 20, 1);
        }
    }

    /**
     * @param $attachment_id
     * @return array
     * extra parameters in attachment for video
     */
    public static function get_video_parameters($attachment_id)
    {
        $external_video_link_id = get_post_meta($attachment_id, 'growtype_video_external_video_link_id', true);
        $external_video_site = get_post_meta($attachment_id, 'growtype_video_external_video_site', true);
        $external_video_start_time = get_post_meta($attachment_id, 'growtype_video_external_video_start_time', true);

        $attachment_video_parameters = [
            'external_video_link_id' => $external_video_link_id,
            'external_video_site' => !empty($external_video_site) ? $external_video_site : 'youtube',
            'external_video_start_time' => !empty($external_video_start_time) ? $external_video_start_time : '0',
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

        $attachment_video_parameters = self::get_video_parameters($attachment_id);

        return !empty($attachment_video_parameters['external_video_link_id']) && !empty($attachment_video_parameters['external_video_site']);
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
        $attachment_video_parameters = self::get_video_parameters($attachment->ID);
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
}
