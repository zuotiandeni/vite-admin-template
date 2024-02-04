import { usePageConfig } from '@/stores/page-config'
const pageConfig = usePageConfig()
// 为html添加class，实现应用暗黑模式
function updateHtmlDarkClass(val: boolean) {
    const htmlEl = document.getElementsByTagName('html')[0]
    if (val) {
        htmlEl.setAttribute('data-bs-theme', 'dark')
        htmlEl.setAttribute('class', 'dark')
    } else {
        htmlEl.setAttribute('data-bs-theme', 'light')
        htmlEl.setAttribute('class', '')
    }
}

/**
 * 切换暗黑模式
 */
// const toggleDark = useToggle(isDark)

const isDark = useDark({
    storageKey: 'theme-appearance',
    // onChanged会使attribute、valueDark这些值无效
    onChanged(dark) {
        updateHtmlDarkClass(dark)
        pageConfig.setPageConfig('isDark', dark)
    }
})

const toggleDark = useToggle(isDark)
const toggleTheme = (event: { clientX: any; clientY: any }) => {
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    // 兼容性处理
    // @ts-ignore
    if (!document.startViewTransition) {
        toggleDark()
        return
    }
    // @ts-ignore
    const transition = document.startViewTransition(async () => {
        toggleDark()
    })
    transition.ready.then(() => {
        const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
        document.documentElement.animate(
            {
                clipPath: isDark.value ? [...clipPath].reverse() : clipPath
            },
            {
                duration: 400,
                easing: 'ease-in',
                pseudoElement: isDark.value
                    ? '::view-transition-old(root)'
                    : '::view-transition-new(root)'
            }
        )
    })
}

export default toggleTheme
