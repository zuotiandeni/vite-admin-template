import { fileURLToPath, URL } from 'node:url'
// import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// js兼容旧版本浏览器
import legacy from '@vitejs/plugin-legacy'

// elementPlus按需加载相关配置
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 自动导入图标
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

// 此项分割包的配置会被 rollupOptions.output.manualChunks覆盖
import { splitVendorChunkPlugin } from 'vite'

// 图片资源压缩
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// const pathSrc = path.resolve(__dirname, 'src')

// // lightningcss，用于替代postcss
// import { browserslistToTargets } from 'lightningcss'
// // 用于配合lightningcss进行转义，达到对旧版本浏览器的支持
// import browserslist from 'browserslist'

// css 浏览器补全 用于postcss
import autoprefixer from 'autoprefixer'

// unocss优化
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        // 指定构建目标为 es2015...这里保持和browserslistrc一致，使用了legacy则不再设置此项，否则build警告
        // target: ['es2015', 'chrome78', 'firefox60', 'ie11', 'safari17', 'edge17'],
        // 使用 lightningcss 压缩 css
        // cssMinify: 'lightningcss'，默认使用esbuild
        // cssTarget: 默认与target一致
        // 小于此阈值的导入或引用资源将内联为 base64 编码(默认值，4096)
        assetsInlineLimit: 4096,
        chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
        // Vite 使用 Terser 这个 JavaScript 压缩工具来对输出的代码进行压缩优化。不会和rollupOptions.output.compact冲突
        minify: 'terser', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
        sourcemap: false,
        // https://terser.org/docs/options/#compress-options
        terserOptions: {
            compress: {
                keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
                drop_console: true, // 生产环境去除 console
                drop_debugger: true // 生产环境去除 debugger
            },
            format: {
                comments: false // 删除注释
            }
        },
        rollupOptions: {
            output: {
                assetFileNames: 'assets/[name].[hash][extname]',
                entryFileNames: 'js/[name].[hash].js',
                chunkFileNames: 'js/[name].[hash].js',
                // 用于配置 Rollup 输出的代码是否启用紧凑模式（即是否移除注释、空格、换行等）
                compact: true
                // 手动指定代码分块（chunks）。在这里，将 'vue'、'vue-router' 和 'pinia' 这三个库手动分块，以便更好地利用浏览器的缓存机制。
                // 此项会 会覆盖 splitVendorChunkPlugin 选用一个即可
                // manualChunks: {
                //     vue: ['vue', 'vue-router', 'pinia', 'lodash-es']
                // }
            }
            // 此选项会将列出来的包在打包时排除在外
            // external: ['vue', 'vue-router', 'pinia', 'lodash-es']
        }
    },
    // https://esbuild.github.io/api/#drop
    // esbuild: {
    //     drop: ['console'] // 这个也可以去除console，还有更多配置
    // },
    plugins: [
        vue(),
        vueJsx(),
        legacy({
            // targets: ['defaults', 'not IE 11'] 不设置此项时，将加载.browserslistrc
        }),
        // elementPlus按需加载 start
        AutoImport({
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ['vue', '@vueuse/core', 'pinia', 'vue-router'],
            // 是否在 vue 模板中自动导入
            vueTemplate: true,
            resolvers: [
                // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
                ElementPlusResolver(),
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon'
                })
            ],
            eslintrc: {
                enabled: true
            },
            //  自动导入组件类型声明文件位置
            dts: fileURLToPath(new URL('auto-imports.d.ts', import.meta.url))
        }),
        Components({
            resolvers: [
                // 自动导入 Element Plus 组件
                ElementPlusResolver({
                    importStyle: 'sass' // 命名空间必须设置这个
                }),
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep']
                })
            ],
            // 自动导入组件类型声明文件位置
            dts: fileURLToPath(new URL('components.d.ts', import.meta.url))
        }),
        Icons({
            // 自动安装图标
            autoInstall: true
        }),
        // elementPlus按需加载 end
        // 压缩图片
        ViteImageOptimizer(),
        // 此项分割包的配置会被 rollupOptions.output.manualChunks覆盖
        splitVendorChunkPlugin(),
        UnoCSS()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        // 排除一些会重复依赖的包
        dedupe: ['vue', '@vue/runtime-core', 'lodash-es']
    },
    css: {
        // // 默认为postcss，设置为lightningcss，则postcss不会有作用
        // transformer: 'lightningcss',
        // lightningcss: {
        //     // browserslist('>= 0.25%')
        //     // browserslist()无参数则会查找配置文件
        //     targets: browserslistToTargets(browserslist())
        // },
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
                additionalData: `@use "@/styles/var.scss" as *;` // 这样，定义的变量就可以在任何地方使用了
            }
        }
    }
})
