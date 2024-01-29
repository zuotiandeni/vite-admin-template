import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// css 浏览器补全
import autoprefixer from 'autoprefixer'
// 兼容旧版本浏览器
import legacy from '@vitejs/plugin-legacy'

// elementPlus按需加载相关配置
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        // 指定构建目标为 es2015...这里保持和browserslistrc一致
        target: ['es2015', 'chrome78', 'firefox60', 'ie11', 'safari17', 'edge17']
    },
    plugins: [
        vue(),
        vueJsx(),
        legacy({
            // targets: ['defaults', 'not IE 11'] 不设置此项时，将加载.browserslistrc
        }),
        // elementPlus按需加载 start
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        })
        // elementPlus按需加载 end
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        postcss: {
            plugins: [
                autoprefixer({
                    grid: true
                })
            ]
        },
        // 配置 CSS 预处理器的选项
        preprocessorOptions: {
            scss: {
                // additionalData 选项允许我们在每个 Sass 文件的顶部引入指定的 SCSS 文件
                // additionalData: `@import "@/assets/var.scss";` // 这样，定义的变量就可以在任何地方使用了
            }
        }
    }
})
