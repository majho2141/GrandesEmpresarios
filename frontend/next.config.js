/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuración para WSL en Windows
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000, // Comprobar cambios cada segundo
      aggregateTimeout: 300, // Retrasar la reconstrucción
      ignored: /node_modules/,
    };
    return config;
  },
};

module.exports = nextConfig; 