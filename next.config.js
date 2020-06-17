const withPWA = require('next-pwa');
const emoji = require('remark-emoji');
const withPlugins = require('next-compose-plugins');
const withMDX = require('@next/mdx')({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [emoji]
    }
});
const isProd = process.env.NODE_ENV !== 'development';

module.exports = withPlugins(
    [
        [
            withMDX,
            {
                pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx']
            }
        ],
        [
            withPWA,
            {
                pwa: {
                    disable: !isProd,
                    dest: 'public',
                    skipWaiting: false,
                    register: false,
                    runtimeCaching: [{
                            urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'static-font-assets',
                                expiration: {
                                    maxEntries: 4,
                                    maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
                                }
                            }
                        },
                        {
                            urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'static-image-assets',
                                expiration: {
                                    maxEntries: 64,
                                    maxAgeSeconds: 24 * 60 * 60 // 24 hours
                                }
                            }
                        },
                        {
                            urlPattern: /\.(?:css|less)$/i,
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'static-style-assets',
                                expiration: {
                                    maxEntries: 16,
                                    maxAgeSeconds: 24 * 60 * 60 // 24 hours
                                }
                            }
                        },
                        {
                            urlPattern: /\.(?:json|xml|csv)$/i,
                            handler: 'NetworkFirst',
                            options: {
                                cacheName: 'static-data-assets',
                                expiration: {
                                    maxEntries: 16,
                                    maxAgeSeconds: 24 * 60 * 60 // 24 hours
                                }
                            }
                        }
                    ]
                }
            }
        ]
    ], {
        typescript: {
            ignoreDevErrors: true,
            ignoreBuildErrors: true
        }
    }
);