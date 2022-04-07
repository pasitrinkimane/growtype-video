jQuery('.woocommerce-product-gallery__image.has-growtype-video .video-cover').on('mouseover', function () {
    let mainImg = jQuery(this).closest('.woocommerce-product-gallery__image');
    let video = mainImg.find('iframe');
    if (!mainImg.hasClass('growtype-video-is-active')) {
        mainImg.addClass('growtype-video-is-active');
        video.fadeIn();
        let videoURL = video.prop('src');
        videoURL += "&autoplay=1";
        video.prop('src', videoURL);

        jQuery(this).animate({opacity: 0}, 1000);
    }
});
