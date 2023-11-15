import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'
import vue2Jsx from '@vitejs/plugin-vue2-jsx'
import commonjs from 'vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    vue2Jsx(),
    commonjs(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // 开发环境解决跨域问题，采用node中间件的方法
  // vite 服务器配置代理

  server: {
    proxy: {
      // 远程接口
      '/api': {
        target: 'http://101.42.19.16:6511/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },

      // 本地接口
      '/test': {
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/test/, '')
      }
    }
  }
})
