/**
 * Thumbnails add video icon
 */
if (jQuery('.woocommerce-product-gallery__image.has-growtype-video').length > 0) {
    setTimeout(function () {
        let imagesWithVideoTitles = {};
        jQuery('.woocommerce-product-gallery__image.has-growtype-video').each(function (index, element) {
            let mainImg = jQuery(element);
            let video = mainImg.find('iframe');
            let videoCover = mainImg.find('.video-cover');
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
jQuery('.growtype-video-main-wrapper .video-cover').on('mouseover', function () {
    let mainImg = jQuery(this).closest('.growtype-video-main-wrapper');
    let video = mainImg.find('iframe');
    let videoCover = mainImg.find('.video-cover');

    if (!mainImg.hasClass('growtype-video-is-active')) {
        mainImg.addClass('growtype-video-is-active');
        video.fadeIn();
        let videoURL = video.prop('src');
        videoURL += "&autoplay=1";
        video.prop('src', videoURL);

        jQuery(this).animate({opacity: 0}, 1000);
    }
});
