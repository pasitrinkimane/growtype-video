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
    jQuery('.growtype-video-player[data-type="html"]').each(function (index, videoContainer) {
        var videoTag = document.createElement('video');
        var sourceTag = document.createElement('source');

        sourceTag.setAttribute('src', jQuery(videoContainer).attr('data-link'));
        sourceTag.setAttribute('type', 'video/mp4');

        videoTag.appendChild(sourceTag);

        videoTag.muted = true;
        videoTag.autoplay = false;
        videoTag.controls = false;
        videoTag.preload = 'auto';
        videoTag.loop = true;
        videoTag.poster = jQuery(videoContainer).attr('data-cover');

        jQuery(videoContainer).append(videoTag)

        initVideoPlayer(videoTag, videoContainer, 'html');
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

function initVideoPlayer(video, videoContainer = null, videoType = 'youtube') {
    let target = video.target ? video.target : video;
    let targetWrapper = target.h ? target.h : videoContainer;
    let container = target.v ? jQuery(target.v) : jQuery(videoContainer);

    /**
     * Mute video
     */
    const audioIsMuted = container.attr('data-audio-is-muted');

    if (videoType !== 'html') {
        if (audioIsMuted || container.attr('data-play-action') === 'load' || container.attr('data-play-action') === 'mouseover') {
            target.mute();
        }
    }

    if (container.attr('data-play-action') === 'load') {
        initVideoPlay(target, targetWrapper, videoType)
    } else if (container.attr('data-play-action') === 'mouseover') {
        /**
         * On cover mouseover
         */
        jQuery(targetWrapper).closest('.growtype-video-main-wrapper').find('.growtype-video-cover').on('mouseover', function () {
            initVideoPlay(target, targetWrapper, videoType)
        });

        /**
         * On play btn mouseover
         */
        jQuery(targetWrapper).closest('.growtype-video-main-wrapper').find('.growtype-video-btn-play').on('mouseover', function () {
            initVideoPlay(target, targetWrapper, videoType)
        });

        /**
         * On video mouseover
         */
        jQuery(targetWrapper).on('mouseover', function () {
            initVideoPlay(target, targetWrapper, videoType)
        });
    } else if (container.attr('data-play-action') === 'click') {
        /**
         * On cover click
         */
        jQuery(targetWrapper).closest('.growtype-video-main-wrapper').find('.growtype-video-cover').on('click', function () {
            initVideoPlay(target, targetWrapper, videoType)
        });

        /**
         * On play btn click
         */
        jQuery(targetWrapper).closest('.growtype-video-main-wrapper').find('.growtype-video-btn-play').on('click', function () {
            initVideoPlay(target, targetWrapper, videoType)
        });

        /**
         * On video mouseover
         */
        jQuery(targetWrapper).on('click', function () {
            initVideoPlay(target, targetWrapper, videoType, 'click')
        });
    }
}

function initVideoPlay(video, videoContainer = null, videoType = 'youtube', initEvent = null) {
    let iframeWrapper = video.h ? video.h : videoContainer

    jQuery(iframeWrapper).closest('.growtype-video-main-wrapper').find('.growtype-video-cover').fadeOut();
    jQuery(iframeWrapper).closest('.growtype-video-main-wrapper').find('.growtype-video-btn-play').fadeOut();
    jQuery(iframeWrapper).animate({opacity: 1}, 500);

    if (videoType === 'html') {
        if (jQuery(video).get(0).paused) {
            video.play()
        } else {
            if (initEvent === 'click') {
                video.load()
                jQuery(iframeWrapper).closest('.growtype-video-main-wrapper').find('.growtype-video-btn-play').fadeIn();
            }
        }
    } else {
        video.playVideo();
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
