import {__} from '@wordpress/i18n';

/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import {
    TextControl,
    TextareaControl,
    Panel,
    PanelBody,
    PanelRow,
    CustomSelectControl,
    SelectControl,
    ToggleControl,
    __experimentalNumberControl as NumberControl
} from '@wordpress/components';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
    PlainText,
    useBlockProps,
    InspectorControls,
    InspectorAdvancedControls
} from '@wordpress/block-editor';

import {useInstanceId} from '@wordpress/compose';

import {Icon, shortcode} from '@wordpress/icons';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
    const blockProps = useBlockProps();
    const instanceId = useInstanceId(Edit);
    const inputId = `blocks-shortcode-input-${instanceId}`;

    const updateShortcode = (attribute_key, val, inputType) => {
        if (inputType === 'custom') {
            setAttributes({[attribute_key]: val.selectedItem.value})
        } else {
            setAttributes({[attribute_key]: val})
        }

        let shortcodeTag = '[growtype_video';
        Object.entries(attributes).map(function (element) {
            if (element[0] !== 'shortcode') {
                let propertyKey = element[0];
                let propertyValue = element[1];

                if (propertyKey === attribute_key) {
                    if (inputType === 'custom') {
                        propertyValue = val.selectedItem.value
                    } else {
                        propertyValue = val;
                    }
                }

                if (typeof propertyValue === "boolean") {
                    propertyValue = propertyValue ? 'true' : 'false'
                }

                if (propertyValue.length > 0) {
                    shortcodeTag += ' ' + propertyKey + '=' + '"' + propertyValue + '"'
                }
            }
        })

        shortcodeTag += ']';

        setAttributes({shortcode: shortcodeTag})
    };

    if (Object.entries(attributes).length === 0 || attributes.shortcode === '') {
        attributes.shortcode = '[growtype_video]'
    }

    let exampleVideos = {
        'youtube': 'https://www.youtube.com/embed/BHACKCNDMW8',
        'html': 'https://static.pexels.com/lib/videos/free-videos.mp4',
    }

    return (
        <div {...blockProps}>
            <InspectorControls key={'inspector'}>
                <Panel>
                    <PanelBody
                        title={__('Main settings', 'growtype-video')}
                        icon="admin-plugins"
                    >
                        <SelectControl
                            label={__('Video type', 'growtype-video')}
                            options={[
                                {
                                    label: 'Youtube',
                                    value: 'youtube',
                                },
                                {
                                    label: 'Html',
                                    value: 'html',
                                }
                            ]}
                            value={attributes.video_type}
                            onChange={(val) => updateShortcode('video_type', val)}
                        />
                        <TextControl
                            label={__('Video url', 'growtype-video')}
                            help={'Demo video url: ' + exampleVideos[attributes.video_type]}
                            onChange={(val) => updateShortcode('video_url', val)}
                            value={attributes.video_url}
                        />
                        <SelectControl
                            label={__('Play action', 'growtype-video')}
                            options={[
                                {
                                    label: 'On page load (audio must be muted)',
                                    value: 'load',
                                },
                                {
                                    label: 'On mouseover (audio must be muted)',
                                    value: 'mouseover',
                                },
                                {
                                    label: 'On click',
                                    value: 'click',
                                }
                            ]}
                            value={attributes.play_action}
                            onChange={(val) => updateShortcode('play_action', val)}
                        />
                        <ToggleControl
                            label={__('Video is looping', 'growtype-video')}
                            checked={attributes.video_is_looping ? true : false}
                            onChange={(val) => updateShortcode('video_is_looping', val)}
                        />
                    </PanelBody>
                    <PanelBody
                        title={__('Preview settings', 'growtype-video')}
                        icon="admin-plugins"
                    >
                        <SelectControl
                            label="Video fit"
                            value={attributes.video_fit}
                            options={[
                                {
                                    label: 'Cover',
                                    value: 'cover',
                                },
                                {
                                    label: 'Initial',
                                    value: 'initial',
                                }
                            ]}
                            onChange={(val) => updateShortcode('video_fit', val)}
                        />
                        <TextControl
                            label={__('Video height', 'growtype-video')}
                            onChange={(val) => updateShortcode('video_height', val)}
                            value={attributes.video_height}
                        />
                        <ToggleControl
                            label={__('Video play button', 'growtype-video')}
                            checked={attributes.play_button ? true : false}
                            onChange={(val) => updateShortcode('play_button', val)}
                        />
                        <SelectControl
                            label={__('Cover type', 'growtype-video')}
                            value={attributes.video_cover_type}
                            options={[
                                {
                                    label: 'Default',
                                    value: 'default',
                                },
                                {
                                    label: 'Custom',
                                    value: 'custom',
                                },
                                {
                                    label: 'Youtube',
                                    value: 'youtube',
                                }
                            ]}
                            onChange={(val) => updateShortcode('video_cover_type', val)}
                        />
                        {
                            attributes.video_cover_type === 'custom' ?
                                <TextControl
                                    label={__('Custom cover url', 'growtype-video')}
                                    onChange={(val) => updateShortcode('cover_url', val)}
                                    value={attributes.cover_url}
                                />
                                : ''
                        }
                    </PanelBody>
                    <PanelBody
                        title={__('Audio settings', 'growtype-video')}
                        icon="admin-plugins"
                    >
                        <ToggleControl
                            label={__('Muted', 'growtype-video')}
                            checked={attributes.audio_is_muted ? true : false}
                            onChange={(val) => updateShortcode('audio_is_muted', val)}
                        />
                    </PanelBody>
                </Panel>
            </InspectorControls>

            <InspectorAdvancedControls>
                <TextControl
                    label={__('Parent class', 'growtype-video')}
                    onChange={(val) => updateShortcode('parent_class', val)}
                    value={attributes.id}
                />
                <TextControl
                    label={__('Parent ID', 'growtype-video')}
                    onChange={(val) => updateShortcode('parent_id', val)}
                    value={attributes.id}
                />
            </InspectorAdvancedControls>

            <div {...useBlockProps({className: 'components-placeholder'})}>
                <label
                    htmlFor={inputId}
                    className="components-placeholder__label"
                >
                    <Icon icon={shortcode}/>
                    {__('Growtype video shortcode', 'growtype-video')}
                </label>
                <PlainText
                    className="blocks-shortcode__textarea"
                    id={inputId}
                    value={attributes.shortcode}
                    aria-label={__('Shortcode text', 'growtype-video')}
                    placeholder={__('Write shortcode here…', 'growtype-video')}
                    onChange={(val) => setAttributes({shortcode: val})}
                />
            </div>
        </div>
    );
}
