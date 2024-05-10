import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "tests/setup.tsx",
    css: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["logo.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "online-cinema",
        short_name: "cinema",
        description: "Edit films info",
        theme_color: "#ffffff",
        start_url: "/",
        icons: [
          {
            src: "logo_192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo_512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "logo_512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
