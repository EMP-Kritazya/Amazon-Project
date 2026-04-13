import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // "key": resolve(__dirname, 'path/to/file.html')
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "login.html"),
        signup: resolve(__dirname, "signup.html"),
        checkout: resolve(__dirname, "checkout.html"),
        orders: resolve(__dirname, "orders.html"),
      },
    },
  },
  server: {
    proxy: {
      "/auth": "http://localhost:4000",
    },
  },
});
