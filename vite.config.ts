import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
//@ts-ignore
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), vue()],
  resolve: {
    alias: {
      //@ts-ignore
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
