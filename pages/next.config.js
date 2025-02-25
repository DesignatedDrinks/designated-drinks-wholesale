/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", 
  basePath: "/designated-drinks-wholesale", // Your GitHub repo name
  assetPrefix: "/designated-drinks-wholesale/",
  images: {
    unoptimized: true, // Ensures images work on GitHub Pages
  },
};

module.exports = nextConfig;
