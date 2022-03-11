const plugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
    webpack(config, { webpack }) {
        config.plugins.push(
            new webpack.ProvidePlugin({
                React: "react",
            }),
        );

        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            exclude: /node_modules/,
            use: ["raw-loader", "glslify-loader"],
        });

        return config;
    },
};

// Manage i18n.
if (process.env.EXPORT !== "true") {
    nextConfig.i18n = {
        locales: ["en-US"],
        defaultLocale: "en-US",
    };
}

module.exports = plugins(
    [
        [
            {
                workboxOpts: {
                    swDest: process.env.NEXT_EXPORT
                        ? "service-worker.js"
                        : "static/service-worker.js",
                    runtimeCaching: [
                        {
                            urlPattern: /^https?.*/,
                            handler: "NetworkFirst",
                            options: {
                                cacheName: "offlineCache",
                                expiration: {
                                    maxEntries: 200,
                                },
                            },
                        },
                    ],
                },
                async rewrites() {
                    return [
                        {
                            source: "/service-worker.js",
                            destination: "/_next/static/service-worker.js",
                        },
                    ];
                },
            },
        ],
        withBundleAnalyzer,
    ],
    nextConfig,
);
