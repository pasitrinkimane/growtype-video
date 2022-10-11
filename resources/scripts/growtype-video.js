/**
 * Thumbnails add video icon
 */
if (jQuery('.woocommerce-product-gallery__image.has-growtype-video').length > 0) {
    setTimeout(function () {
        let imagesWithVideoTitles = {};
        jQuery('.woocommerce-product-gallery__image.has-growtype-video').each(function (index, element) {
            let mainImg = jQuery(element);
            let video = mainImg.find('iframe');
            let videoCover = mainImg.find('.growtype-video-cover');
            let imageTitleWithExtension = /[^/]*$/.exec(videoCover.find('img').attr('data-large_image'))[0];
            let imageTitle = imageTitleWithExtension.replace(/\.[^/.]+$/, "")
            imagesWithVideoTitles[imageTitle] = imageTitle;
        });

        jQuery('.woocommerce-product-gallery .product-image-thumbnail').each(function (index, element) {
            let thumbnail = jQuery(element);
            let thumbnailImage = thumbnail.find('img');
            let thumbnailTitleWithExtension = /[^/]*$/.exec(thumbnailImage.attr('src'))[0];
            let thumbnailTitle = thumbnailTitleWithExtension.replace(/\.[^/.]+$/, "")

            Object.values(imagesWithVideoTitles).map(function (imageTitle) {
                if (thumbnailTitle.indexOf(imageTitle + '-400x300') >= 0) {
                    thumbnail.addClass('has-growtype-video');
                }
            });
        });
    }, 1000);
}

/**
 *  PLay video
 */
function initVideoPlay($this) {
    const videoWrapper = jQuery($this).closest('.growtype-video-main-wrapper');
    const videoPlayer = videoWrapper.find('.growtype-video-player');
    const videoCover = videoWrapper.find('.growtype-video-cover');
    const type = jQuery($this).attr('data-type');

    if (!videoWrapper.hasClass('growtype-video-is-active')) {
        // jQuery($this).animate({opacity: 0}, 0);

        if (type === 'youtube') {
            initYoutubeApi($this);
        } else if (type === 'html') {
            initHtmlVideo($this);
        }

        videoWrapper.addClass('growtype-video-is-active');
    }
}

function initHtmlVideo(video) {
    var videoTag = document.createElement('video');
    var sourceTag = document.createElement('source');

    sourceTag.setAttribute('src', video.attr('data-link'));
    sourceTag.setAttribute('type', 'video/mp4');

    videoTag.appendChild(sourceTag);

    jQuery(video).animate({opacity: 1}, 500);

    jQuery(video).closest('.growtype-video-main-wrapper').find('.growtype-video-cover').fadeOut();

    videoTag.muted = true;
    videoTag.autoplay = true;
    videoTag.controls = false;
    videoTag.preload = 'auto';
    videoTag.loop = true;
    videoTag.poster = video.attr('data-cover');

    video.append(videoTag)
}

/**
 * Youtube setup
 */
function initYoutubeApi(video) {
    const videoId = video.attr('data-link');
    const videoStartTime = video.attr('data-start');
    let player;

    player = new YT.Player(video[0], {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
            autoplay: 1,
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
        jQuery(event.target.g).animate({opacity: 1}, 500);
        event.target.mute();
        event.target.playVideo();
    }

    function onPlayerStateChange(event) {
        if (event.data === 0) {
            jQuery(video).animate({opacity: 1}, 1000);
            jQuery(video).closest('.growtype-video-main-wrapper').removeClass('growtype-video-is-active');
            player.loadVideoById({
                videoId: videoId,
                startSeconds: videoStartTime,
            });
        }
    }
}

/**
 * Setup video play
 */
function setupVideoPlay() {

    let playAction = jQuery('.growtype-video-player').attr('data-play-action');

    setTimeout(function () {
        if (playAction === 'load') {
            initVideoPlay(jQuery('.growtype-video-player'));
        } else if (playAction === 'mouseover') {
            jQuery('.growtype-video-main-wrapper').on('mouseover', function () {
                initVideoPlay(jQuery(this).find('.growtype-video-player'));
            });
        } else if (playAction === 'click') {
            jQuery('.growtype-video-main-wrapper').on('click', function () {
                event.preventDefault();
                initVideoPlay(jQuery(this).find('.growtype-video-player'));
            });
        }
    }, 500)
}

/**
 * Init video play actions
 */
setupVideoPlay();

jQuery(document).on('pjax:end', function (t) {
    setupVideoPlay();
});
