// vite.config.ts
import Inspect from 'vite-plugin-inspect';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [
    Inspect()
  ],
	resolve: {
    alias: {
      // Подключаем только базовый функционал Lottie
      'lottie-web': 'lottie-web/build/player/lottie_light.min.js'
    }
  }
});