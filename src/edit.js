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
import {PlainText, useBlockProps, ColorPalette, InspectorControls} from '@wordpress/block-editor';

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

    return (
        <div {...blockProps}>
            <InspectorControls key={'inspector'}>
                <Panel>
                    <PanelBody
                        title={__('Main settings', 'growtype-video')}
                        icon="admin-plugins"
                    >
                        <PanelRow>
                            <TextControl
                                label={__('Video url', 'growtype-video')}
                                help={'Demo video url: https://static.pexels.com/lib/videos/free-videos.mp4'}
                                onChange={(val) => updateShortcode('video_url', val)}
                                value={attributes.video_url}
                            />
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                label={__('Poster url', 'growtype-video')}
                                onChange={(val) => updateShortcode('cover_url', val)}
                                value={attributes.cover_url}
                            />
                        </PanelRow>
                        <PanelRow>
                            <SelectControl
                                label="Video type"
                                options={[
                                    {
                                        label: 'Youtube',
                                        value: 'youtube',
                                    },
                                    {
                                        label: 'Vimeo',
                                        value: 'vimeo',
                                    },
                                    {
                                        label: 'Html',
                                        value: 'html',
                                    }
                                ]}
                                onChange={(val) => updateShortcode('video_type', val)}
                            />
                        </PanelRow>
                        <PanelRow>
                            <SelectControl
                                label="Play action"
                                options={[
                                    {
                                        label: 'Load',
                                        value: 'load',
                                    },
                                    {
                                        label: 'Mouseover',
                                        value: 'mouseover',
                                    },
                                    {
                                        label: 'Click',
                                        value: 'click',
                                    }
                                ]}
                                onChange={(val) => updateShortcode('play_action', val)}
                            />
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                label={__('Parent class', 'growtype-video')}
                                onChange={(val) => updateShortcode('parent_class', val)}
                                value={attributes.id}
                            />
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                label={__('Parent ID', 'growtype-video')}
                                onChange={(val) => updateShortcode('parent_id', val)}
                                value={attributes.id}
                            />
                        </PanelRow>
                    </PanelBody>
                    <PanelBody
                        title={__('Preview settings', 'growtype-video')}
                        icon="admin-plugins"
                    >
                        <PanelRow>
                            <SelectControl
                                label="Video fit"
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
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                label={__('Video height', 'growtype-video')}
                                onChange={(val) => updateShortcode('video_height', val)}
                                value={attributes.video_height}
                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label="Active"
                                help={
                                    attributes.full_width
                                        ? 'Video is full width.'
                                        : 'Video not full width.'
                                }
                                checked={attributes.full_width ? true : false}
                                onChange={(val) => updateShortcode('full_width', val)}
                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label="Play button"
                                checked={attributes.play_button ? true : false}
                                onChange={(val) => updateShortcode('play_button', val)}
                            />
                        </PanelRow>
                    </PanelBody>
                </Panel>
            </InspectorControls>

            <div {...useBlockProps({className: 'components-placeholder'})}>
                <label
                    htmlFor={inputId}
                    className="components-placeholder__label"
                >
                    <Icon icon={shortcode}/>
                    {__('Growtype video shortcode')}
                </label>
                <PlainText
                    className="blocks-shortcode__textarea"
                    id={inputId}
                    value={attributes.shortcode}
                    aria-label={__('Shortcode text')}
                    placeholder={__('Write shortcode here…')}
                    onChange={(val) => setAttributes({shortcode: val})}
                />
            </div>
        </div>
    );
}
