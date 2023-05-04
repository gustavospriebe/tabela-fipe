/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "apiplaca.com.br",
                port: "",
            },
        ],
    },
};

module.exports = nextConfig;
