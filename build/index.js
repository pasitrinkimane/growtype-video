!function(){"use strict";var e,t={734:function(){var e=window.wp.element,t=window.wp.blocks;var n=window.wp.i18n,l=window.wp.components,o=window.wp.blockEditor,r=window.wp.compose,a=function(t){let{icon:n,size:l=24,...o}=t;return(0,e.cloneElement)(n,{width:l,height:l,...o})},i=window.wp.primitives,c=(0,e.createElement)(i.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(i.Path,{d:"M16 4.2v1.5h2.5v12.5H16v1.5h4V4.2h-4zM4.2 19.8h4v-1.5H5.8V5.8h2.5V4.2h-4l-.1 15.6zm5.1-3.1l1.4.6 4-10-1.4-.6-4 10z"})),u=JSON.parse('{"u2":"growtype/video"}'),s=(0,e.createElement)(i.SVG,{width:"35",height:"35",viewBox:"0 0 35 35",fill:"none",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)("path",{d:"M0.579738 26.2702H9.31891C9.31891 28.1128 14.952 28.8498 14.952 24.5329V23.2168C13.5832 25.0067 12.2144 25.3752 10.0033 25.3752C3.15937 25.3752 -0.052009 20.9003 0.000636649 14.8987C0.0532823 8.89715 3.31731 4.47492 9.74008 4.52756C11.688 4.52756 13.7938 5.10667 15.2152 6.84397L15.3732 4.84344H24.007V24.5329C24.007 37.6417 0.579738 37.0626 0.579738 26.2702ZM9.21362 15.2146C9.21362 19.0578 14.8467 19.0578 14.8467 15.162C14.8467 11.2662 9.21362 11.2136 9.21362 15.2146Z",fill:"#315344"}));(0,t.registerBlockType)(u.u2,{icon:s,example:{attributes:{shortcode:"Growtype video"}},edit:function t(i){var u=i.attributes,s=i.setAttributes,d=(0,o.useBlockProps)(),v=(0,r.useInstanceId)(t),h="blocks-shortcode-input-".concat(v),p=function(e,t,n){var l,o,r;s((l={},o=e,r="custom"===n?t.selectedItem.value:t,o in l?Object.defineProperty(l,o,{value:r,enumerable:!0,configurable:!0,writable:!0}):l[o]=r,l));var a="[growtype_video";Object.entries(u).map((function(l){if("shortcode"!==l[0]){var o=l[0],r=l[1];o===e&&(r="custom"===n?t.selectedItem.value:t),"boolean"==typeof r&&(r=r?"true":"false"),r.length>0&&(a+=" "+o+'="'+r+'"')}})),s({shortcode:a+="]"})};return 0!==Object.entries(u).length&&""!==u.shortcode||(u.shortcode="[growtype_video]"),(0,e.createElement)("div",d,(0,e.createElement)(o.InspectorControls,{key:"inspector"},(0,e.createElement)(l.Panel,null,(0,e.createElement)(l.PanelBody,{title:(0,n.__)("Main settings","growtype-video"),icon:"admin-plugins"},(0,e.createElement)(l.PanelRow,null,(0,e.createElement)(l.TextControl,{label:(0,n.__)("Video url","growtype-video"),help:"Demo video url: https://static.pexels.com/lib/videos/free-videos.mp4",onChange:function(e){return p("video_url",e)},value:u.video_url})),(0,e.createElement)(l.PanelRow,null,(0,e.createElement)(l.TextControl,{label:(0,n.__)("Poster url","growtype-video"),onChange:function(e){return p("cover_url",e)},value:u.cover_url})),(0,e.createElement)(l.PanelRow,null,(0,e.createElement)(l.SelectControl,{label:"Video type",options:[{label:"Youtube",value:"youtube"},{label:"Vimeo",value:"vimeo"},{label:"Html",value:"html"}],onChange:function(e){return p("video_type",e)}})),(0,e.createElement)(l.PanelRow,null,(0,e.createElement)(l.SelectControl,{label:"Play action",options:[{label:"Load",value:"load"},{label:"Mouseover",value:"mouseover"},{label:"Click",value:"click"}],onChange:function(e){return p("play_action",e)}})),(0,e.createElement)(l.PanelRow,null,(0,e.createElement)(l.TextControl,{label:(0,n.__)("Parent class","growtype-video"),onChange:function(e){return p("parent_class",e)},value:u.id})),(0,e.createElement)(l.PanelRow,null,(0,e.createElement)(l.TextControl,{label:(0,n.__)("Parent ID","growtype-video"),onChange:function(e){return p("parent_id",e)},value:u.id}))),(0,e.createElement)(l.PanelBody,{title:(0,n.__)("Preview settings","growtype-video"),icon:"admin-plugins"},(0,e.createElement)(l.PanelRow,null,(0,e.createElement)(l.SelectControl,{label:"Video fit",options:[{label:"Cover",value:"cover"},{label:"Initial",value:"initial"}],onChange:function(e){return p("video_fit",e)}})),(0,e.createElement)(l.PanelRow,null,(0,e.createElement)(l.TextControl,{label:(0,n.__)("Video height","growtype-video"),onChange:function(e){return p("video_height",e)},value:u.video_height})),(0,e.createElement)(l.PanelRow,null,(0,e.createElement)(l.ToggleControl,{label:"Active",help:u.full_width?"Video is full width.":"Video not full width.",checked:!!u.full_width,onChange:function(e){return p("full_width",e)}})),(0,e.createElement)(l.PanelRow,null,(0,e.createElement)(l.ToggleControl,{label:"Play button",checked:!!u.play_button,onChange:function(e){return p("play_button",e)}}))))),(0,e.createElement)("div",(0,o.useBlockProps)({className:"components-placeholder"}),(0,e.createElement)("label",{htmlFor:h,className:"components-placeholder__label"},(0,e.createElement)(a,{icon:c}),(0,n.__)("Growtype video shortcode")),(0,e.createElement)(o.PlainText,{className:"blocks-shortcode__textarea",id:h,value:u.shortcode,"aria-label":(0,n.__)("Shortcode text"),placeholder:(0,n.__)("Write shortcode here…"),onChange:function(e){return s({shortcode:e})}})))},save:function(t){var n=t.attributes,l=o.useBlockProps.save();return(0,e.createElement)("div",l,n.shortcode)}})}},n={};function l(e){var o=n[e];if(void 0!==o)return o.exports;var r=n[e]={exports:{}};return t[e](r,r.exports,l),r.exports}l.m=t,e=[],l.O=function(t,n,o,r){if(!n){var a=1/0;for(s=0;s<e.length;s++){n=e[s][0],o=e[s][1],r=e[s][2];for(var i=!0,c=0;c<n.length;c++)(!1&r||a>=r)&&Object.keys(l.O).every((function(e){return l.O[e](n[c])}))?n.splice(c--,1):(i=!1,r<a&&(a=r));if(i){e.splice(s--,1);var u=o();void 0!==u&&(t=u)}}return t}r=r||0;for(var s=e.length;s>0&&e[s-1][2]>r;s--)e[s]=e[s-1];e[s]=[n,o,r]},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};l.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,r,a=n[0],i=n[1],c=n[2],u=0;if(a.some((function(t){return 0!==e[t]}))){for(o in i)l.o(i,o)&&(l.m[o]=i[o]);if(c)var s=c(l)}for(t&&t(n);u<a.length;u++)r=a[u],l.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return l.O(s)},n=self.webpackChunkplugin=self.webpackChunkplugin||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var o=l.O(void 0,[431],(function(){return l(734)}));o=l.O(o)}();