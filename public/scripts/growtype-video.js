!function(){var e,t={658:function(){function e(){!function(){if(0===jQuery('.growtype-video-player[data-type="youtube"]').length)return;var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(e,o),window.onYouTubeIframeAPIReady=function(){var e=[];jQuery('.growtype-video-player[data-type="youtube"]').each((function(o,r){var a=jQuery(r).closest(".growtype-video-main-wrapper"),n=jQuery(r).attr("data-link"),i=jQuery(r).attr("data-start");jQuery(r).attr("data-custom-cover-enabled");function u(t){var r=jQuery(t.target.v);0===t.data&&"true"===r.attr("data-video-is-looping")&&(jQuery(r).animate({opacity:1},1e3),jQuery(r).closest(".growtype-video-main-wrapper").removeClass("growtype-video-is-active"),e[o].loadVideoById({videoId:n,startSeconds:i}))}a.hasClass("growtype-video-is-active")||a.addClass("growtype-video-is-active"),e[o]=new YT.Player(jQuery(r)[0],{height:"100%",width:"100%",videoId:n,playerVars:{autoplay:0,loop:0,start:i,controls:0,showinfo:0,modestbranding:0},events:{onReady:t,onStateChange:u}})}))}}(),jQuery('.growtype-video-player[data-type="html"]').each((function(e,o){var r=document.createElement("video"),a=document.createElement("source");a.setAttribute("src",jQuery(o).attr("data-link")),a.setAttribute("type","video/mp4"),r.appendChild(a),r.muted=!0,r.autoplay=!1,r.controls=!1,r.preload="auto",r.loop=!0,r.poster=jQuery(o).attr("data-cover"),jQuery(o).append(r),t(r,o,"html")}))}function t(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"youtube",a=e.target?e.target:e,n=a.h?a.h:t,i=a.v?jQuery(a.v):jQuery(t),u=i.attr("data-audio-is-muted");"html"!==r&&(u||"load"===i.attr("data-play-action")||"mouseover"===i.attr("data-play-action"))&&a.mute(),"load"===i.attr("data-play-action")?o(a,n,r):"mouseover"===i.attr("data-play-action")?(jQuery(n).closest(".growtype-video-main-wrapper").find(".growtype-video-cover").on("mouseover",(function(){o(a,n,r)})),jQuery(n).closest(".growtype-video-main-wrapper").find(".growtype-video-btn-play").on("mouseover",(function(){o(a,n,r)})),jQuery(n).on("mouseover",(function(){o(a,n,r)}))):"click"===i.attr("data-play-action")&&(jQuery(n).closest(".growtype-video-main-wrapper").find(".growtype-video-cover").on("click",(function(){o(a,n,r)})),jQuery(n).closest(".growtype-video-main-wrapper").find(".growtype-video-btn-play").on("click",(function(){o(a,n,r)})),jQuery(n).on("click",(function(){o(a,n,r,"click")})))}function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"youtube",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=e.h?e.h:t;jQuery(a).closest(".growtype-video-main-wrapper").find(".growtype-video-cover").fadeOut(),jQuery(a).closest(".growtype-video-main-wrapper").find(".growtype-video-btn-play").fadeOut(),jQuery(a).animate({opacity:1},500),"html"===o?jQuery(e).get(0).paused?e.play():"click"===r&&(e.load(),jQuery(a).closest(".growtype-video-main-wrapper").find(".growtype-video-btn-play").fadeIn()):e.playVideo()}jQuery(window).on("load",(function(){e()})),jQuery(document).on("pjax:end",(function(t){e()})),jQuery(".woocommerce-product-gallery__image.has-growtype-video").length>0&&setTimeout((function(){var e={};jQuery(".woocommerce-product-gallery__image.has-growtype-video").each((function(t,o){var r=jQuery(o),a=(r.find("iframe"),r.find(".growtype-video-cover")),n=/[^/]*jQuery/.exec(a.find("img").attr("data-large_image"))[0].replace(/\.[^/.]+jQuery/,"");e[n]=n})),jQuery(".woocommerce-product-gallery .product-image-thumbnail").each((function(t,o){var r=jQuery(o),a=r.find("img"),n=/[^/]*jQuery/.exec(a.attr("src"))[0].replace(/\.[^/.]+jQuery/,"");Object.values(e).map((function(e){n.indexOf(e+"-400x300")>=0&&r.addClass("has-growtype-video")}))}))}),1e3)},84:function(){}},o={};function r(e){var a=o[e];if(void 0!==a)return a.exports;var n=o[e]={exports:{}};return t[e](n,n.exports,r),n.exports}r.m=t,e=[],r.O=function(t,o,a,n){if(!o){var i=1/0;for(p=0;p<e.length;p++){o=e[p][0],a=e[p][1],n=e[p][2];for(var u=!0,d=0;d<o.length;d++)(!1&n||i>=n)&&Object.keys(r.O).every((function(e){return r.O[e](o[d])}))?o.splice(d--,1):(u=!1,n<i&&(i=n));if(u){e.splice(p--,1);var c=a();void 0!==c&&(t=c)}}return t}n=n||0;for(var p=e.length;p>0&&e[p-1][2]>n;p--)e[p]=e[p-1];e[p]=[o,a,n]},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={821:0,202:0};r.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,n,i=o[0],u=o[1],d=o[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(a in u)r.o(u,a)&&(r.m[a]=u[a]);if(d)var p=d(r)}for(t&&t(o);c<i.length;c++)n=i[c],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return r.O(p)},o=self.webpackChunkplugin=self.webpackChunkplugin||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}(),r.O(void 0,[202],(function(){return r(658)}));var a=r.O(void 0,[202],(function(){return r(84)}));a=r.O(a)}();
//# sourceMappingURL=growtype-video.js.map