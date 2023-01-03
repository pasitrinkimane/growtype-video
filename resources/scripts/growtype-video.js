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
    jQuery('.growtype-video-player[data-type="html"]').each(function (index, element) {
        var videoTag = document.createElement('video');
        var sourceTag = document.createElement('source');

        sourceTag.setAttribute('src', jQuery(element).attr('data-link'));
        sourceTag.setAttribute('type', 'video/mp4');

        videoTag.appendChild(sourceTag);

        jQuery(element).animate({opacity: 1}, 500);

        jQuery(element).closest('.growtype-video-main-wrapper').find('.growtype-video-cover').fadeOut();

        videoTag.muted = true;
        videoTag.autoplay = true;
        videoTag.controls = false;
        videoTag.preload = 'auto';
        videoTag.loop = true;
        videoTag.poster = jQuery(element).attr('data-cover');

        jQuery(element).append(videoTag)
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
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });

            function onPlayerReady(event) {
                let element = jQuery(event.target.v);

                /**
                 * Mute video
                 */
                const audioIsMuted = element.attr('data-audio-is-muted');

                if (audioIsMuted || element.attr('data-play-action') === 'load' || element.attr('data-play-action') === 'mouseover') {
                    event.target.mute();
                }

                if (element.attr('data-play-action') === 'load') {
                    playVideo(event)
                } else if (element.attr('data-play-action') === 'mouseover') {
                    jQuery(event.target.h).on('mouseover', function () {
                        playVideo(event)
                    });
                } else if (element.attr('data-play-action') === 'click') {
                }
            }

            function playVideo(event) {
                jQuery(event.target.h).animate({opacity: 1}, 500);
                event.target.playVideo();
            }

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
