import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetUno,
    transformerDirectives,
    transformerVariantGroup
} from 'unocss'

export default defineConfig({
    // shortcuts: {
    //     'border-main': 'border-$vp-c-divider',
    //     'bg-main': 'bg-gray-400',
    //     'bg-base': 'bg-white dark:bg-hex-1a1a1a'
    // },
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
            warn: true
        })
    ],
    // theme: {
    //     colors: {
    //         primary: '#3eaf7c'
    //     },
    //     fontFamily: {
    //         mono: 'var(--vt-font-family-mono)'
    //     }
    // },
    transformers: [transformerDirectives(), transformerVariantGroup()]
})
/*
1、 presetAttributify：用于启用 unocss 的属性选择器模式（attributify mode）。
    在属性选择器模式下，unocss 可以通过 HTML 属性来定义样式，而不仅限于类名选择器。这样可以提供更灵活的样式定义方式。

2、 presetIcons：用于启用 unocss 的图标处理功能。
    通过调用 presetIcons 并传入一些配置选项，可以使用 unocss 方便地处理图标，包括缩放、警告等功能。

3、 presetUno：这是 unocss 的核心预设。调用 presetUno 函数会加载 unocss 的核心样式和功能，为项目提供一些基本的样式和处理能力。

4、 transformerDirectives：用于启用 unocss 的指令转换器。
    指令转换器可以处理 CSS 中的指令，例如 @apply、@screen 等，使其在 unocss 中起作用。

5、 transformerVariantGroup：用于启用 unocss 的变体规则转换器。
    变体规则转换器可以处理 CSS 中的变体规则，例如 hover、focus 等，使其在 unocss 中起作用。
*/
