import { usePageConfig } from '@/stores/page-config'

// 为html添加class，实现应用暗黑模式
function updateHtmlDarkClass(val: boolean) {
    const htmlEl = document.getElementsByTagName('html')[0]
    if (val) {
        htmlEl.setAttribute('class', 'dark')
    } else {
        htmlEl.setAttribute('class', '')
    }
}

// const isDark = useDark({
//     onChanged(dark) {
//         const pageConfig = usePageConfig()
//         updateHtmlDarkClass(dark)
//         pageConfig.setPageConfig('isDark', dark)
//     }
// })

/**
 * 切换暗黑模式
 */
// const toggleDark = useToggle(isDark)

const isDark = useDark({
    onChanged(dark) {
        const pageConfig = usePageConfig()
        updateHtmlDarkClass(dark)
        pageConfig.setPageConfig('isDark', dark)
    }
})
const toggleDark = useToggle(isDark)

export default toggleDark
