// vite.config.ts
import Inspect from 'vite-plugin-inspect';
import { defineConfig } from 'vite';
import path from 'path';
import viteImagemin from '@vheemstra/vite-plugin-imagemin'

// The minifiers you want to use:
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngQuant from 'imagemin-pngquant'
import imageminSvgo from 'imagemin-svgo'


export default defineConfig({
  plugins: [
    Inspect(),
		viteImagemin({
			plugins: {
				jpg: imageminMozjpeg(),
				png: imageminPngQuant(),
				svg: imageminSvgo()
			},
		}),
  ],
	resolve: {
    alias: {
      // Подключаем только базовый функционал Lottie
      'lottie-web': 'lottie-web/build/player/lottie_light.min.js'
    }
  }
});