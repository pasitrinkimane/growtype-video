/**
 * Init video play actions
 */
jQuery(window).on("load", function () {
    setupVideoPlay();
});

jQuery(document).on('pjax:end', function (t) {
    setupVideoPlay();
});

/**
 * Setup video play
 */
function setupVideoPlay() {
    initYoutubeApi();
    initHtmlVideo();
}

/**
 * Html video setup
 */
function initHtmlVideo() {
    jQuery('.growtype-video-player[data-type="html"]').each(function (index, videoPlayer) {
        var videoTag = document.createElement('video');
        var sourceTag = document.createElement('source');

        sourceTag.setAttribute('src', jQuery(videoPlayer).attr('data-link'));
        sourceTag.setAttribute('type', 'video/mp4');

        videoTag.appendChild(sourceTag);

        videoTag.muted = true;
        videoTag.autoplay = false;
        videoTag.controls = false;
        videoTag.preload = 'auto';
        videoTag.loop = true;
        videoTag.poster = jQuery(videoPlayer).attr('data-cover');

        jQuery(videoPlayer).append(videoTag)

        initVideoPlayer(videoTag, $(videoPlayer), 'html');
    });
}

/**
 * Youtube setup
 */
function initYoutubeApi() {

    if (jQuery('.growtype-video-player[data-type="youtube"]').length === 0) {
        return;
    }

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function () {
        let player = [];
        jQuery('.growtype-video-player[data-type="youtube"]').each(function (index, element) {

            const videoWrapper = jQuery(element).closest('.growtype-video-main-wrapper');
            const videoId = jQuery(element).attr('data-link');
            const videoStartTime = jQuery(element).attr('data-start');
            const customCoverEnabled = jQuery(element).attr('data-custom-cover-enabled');

            if (!videoWrapper.hasClass('growtype-video-is-active')) {
                videoWrapper.addClass('growtype-video-is-active');
            }

            player[index] = new YT.Player(jQuery(element)[0], {
                height: '100%',
                width: '100%',
                videoId: videoId,
                playerVars: {
                    autoplay: 0,
                    loop: 0,
                    start: videoStartTime,
                    controls: 0,
                    showinfo: 0,
                    modestbranding: 0
                },
                events: {
                    'onReady': initVideoPlayer,
                    'onStateChange': onPlayerStateChange
                }
            });

            function onPlayerStateChange(event) {
                let element = jQuery(event.target.v);

                if (event.data === 0 && element.attr('data-video-is-looping') === 'true') {
                    jQuery(element).animate({opacity: 1}, 1000);
                    jQuery(element).closest('.growtype-video-main-wrapper').removeClass('growtype-video-is-active');
                    player[index].loadVideoById({
                        videoId: videoId,
                        startSeconds: videoStartTime,
                    });
                }
            }
        });
    }
}

function initVideoPlayer(video, videoPlayer = null, videoType = 'youtube') {

    let videoTag = $(video);
    let videoContainer = $(video).closest('.growtype-video-main-wrapper');

    if (videoType === 'youtube') {
        videoPlayer = $(video.target.g);
        videoTag = video.target;
        videoContainer = $(video.target.g).closest('.growtype-video-main-wrapper');
    }

    /**
     * Mute video
     */
    const audioIsMuted = videoPlayer.attr('data-audio-is-muted');

    if (audioIsMuted === 'true') {
        if (videoType === 'html') {
            if (videoPlayer.attr('data-play-action') === 'load' || videoPlayer.attr('data-play-action') === 'mouseover') {
                videoTag.prop('muted', true);
            }
        } else if (videoType === 'youtube') {
            videoTag.mute()
        }
    }

    if (videoPlayer.attr('data-play-action') === 'load') {
        initVideoPlay(videoTag, videoContainer, videoType)
    } else if (videoPlayer.attr('data-play-action') === 'mouseover') {

        /**
         * On cover mouseover
         */
        videoContainer.find('.growtype-video-cover').on('mouseover', function () {
            initVideoPlay(videoTag, videoContainer, videoType)
        });

        /**
         * On play btn mouseover
         */
        videoContainer.find('.growtype-video-btn-play').on('mouseover', function () {
            initVideoPlay(videoTag, videoContainer, videoType)
        });

        /**
         * On video mouseover
         */
        videoContainer.on('mouseover', function () {
            initVideoPlay(videoTag, videoContainer, videoType)
        });
    } else if (videoPlayer.attr('data-play-action') === 'click') {

        /**
         * On cover click
         */
        videoContainer.find('.growtype-video-cover').on('click', function () {
            initVideoPlay(videoTag, videoContainer, videoType)
        });

        /**
         * On play btn click
         */
        videoContainer.find('.growtype-video-btn-play').on('click', function () {
            initVideoPlay(videoTag, videoContainer, videoType);
            event.stopPropagation();
        });

        /**
         * On video mouseover
         */
        videoContainer.on('click', function () {
            initVideoPlay(videoTag, videoContainer, videoType, 'click')
        });
    }
}

function initVideoPlay(videoTag, videoContainer = null, videoType = 'youtube', initEvent = null) {
    videoContainer.find('.growtype-video-cover').fadeOut();
    videoContainer.find('.growtype-video-btn-play').fadeOut();

    if (videoType === 'html') {
        if (videoTag.get(0).paused) {
            videoTag[0].play()
        } else {
            if (initEvent === 'click') {
                videoTag[0].load()
                videoContainer.find('.growtype-video-btn-play').fadeIn();
            }
        }
    } else {
        videoTag.playVideo();
    }
}

/**
 * Woocommerce Thumbnails add video icon
 */
if (jQuery('.woocommerce-product-gallery__image.has-growtype-video').length > 0) {
    setTimeout(function () {
        let imagesWithVideoTitles = {};
        jQuery('.woocommerce-product-gallery__image.has-growtype-video').each(function (index, element) {
            let mainImg = jQuery(element);
            let video = mainImg.find('iframe');
            let videoCover = mainImg.find('.growtype-video-cover');
            let imageTitleWithExtension = /[^/]*jQuery/.exec(videoCover.find('img').attr('data-large_image'))[0];
            let imageTitle = imageTitleWithExtension.replace(/\.[^/.]+jQuery/, "")
            imagesWithVideoTitles[imageTitle] = imageTitle;
        });

        jQuery('.woocommerce-product-gallery .product-image-thumbnail').each(function (index, element) {
            let thumbnail = jQuery(element);
            let thumbnailImage = thumbnail.find('img');
            let thumbnailTitleWithExtension = /[^/]*jQuery/.exec(thumbnailImage.attr('src'))[0];
            let thumbnailTitle = thumbnailTitleWithExtension.replace(/\.[^/.]+jQuery/, "")

            Object.values(imagesWithVideoTitles).map(function (imageTitle) {
                if (thumbnailTitle.indexOf(imageTitle + '-400x300') >= 0) {
                    thumbnail.addClass('has-growtype-video');
                }
            });
        });
    }, 1000);
}
