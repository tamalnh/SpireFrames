/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",            // emit pure HTML/CSS/JS to `out/`
  trailingSlash: true,         // /portfolio/foo/ → /portfolio/foo/index.html
  images: {
    unoptimized: true          // required: no Next image optimizer on Pages
  },
  env: {
    NEXT_PUBLIC_ENABLE_ADMIN:
      process.env.NEXT_PUBLIC_ENABLE_ADMIN ??
      (process.env.NODE_ENV !== "production" ? "true" : "false")
  }
};

module.exports = nextConfig;