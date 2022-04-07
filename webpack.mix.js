let mix = require('laravel-mix');

mix.setPublicPath('./public');
mix.setResourceRoot('./')

mix
    .sass('resources/styles/growtype-video.scss', 'styles')

mix
    .js('resources/scripts/growtype-video.js', 'scripts')

mix
    .copyDirectory('resources/plugins', 'public/plugins')
    .copyDirectory('resources/icons', 'public/icons')

mix
    .sourceMaps()
    .version();
