type PageConfig = {
    [key: string]: any // 添加索引签名
    isDark: boolean
    layoutMode: string
    mainAnimation: string
    menuCollapse: boolean
    menuBackground: string[]
    menuWidth: number
    menuColor: string[]
    menuActiveBackground: string[]
    menuActiveColor: string[]
    menuTopBarBackground: string[]
    headerBarTabColor: string[]
    headerBarTabActiveBackground: string[]
    headerBarTabActiveColor: string[]
    headerBarBackground: string[]
    headerBarHoverBackground: string[]
}

export const usePageConfig = defineStore('pageConfig', () => {
    const pageConfig: PageConfig = reactive({
        // 是否黑暗模式
        isDark: false,
        // 页面布局方式，可选值：<Default|Classic|LayoutsStreamline|Double>，
        layoutMode: 'LayoutsDefault',
        // 后台主页面切换动画，可选值<slide-right|slide-left|el-fade-in-linear|el-fade-in|el-zoom-in-center|el-zoom-in-top|el-zoom-in-bottom>
        mainAnimation: 'slide-right',
        // 左侧菜单展开折叠
        menuCollapse: false,
        // 菜单的宽度
        menuWidth: 260,

        /* 侧边菜单 */
        // 侧边菜单背景色
        menuBackground: ['#ffffff', '#1d1e1f'],
        // 侧边菜单文字颜色
        menuColor: ['#303133', '#CFD3DC'],
        // 侧边菜单激活项背景色
        menuActiveBackground: ['#ffffff', '#1d1e1f'],
        // 侧边菜单激活项文字色
        menuActiveColor: ['#409eff', '#3375b9'],
        // 侧边菜单顶栏背景色
        menuTopBarBackground: ['#fcfcfc', '#1d1e1f'],

        /* 顶栏 */
        // 顶栏文字色
        headerBarTabColor: ['#000000', '#CFD3DC'],
        // 顶栏激活项背景色
        headerBarTabActiveBackground: ['#ffffff', '#1d1e1f'],
        // 顶栏激活项文字色
        headerBarTabActiveColor: ['#000000', '#409EFF'],
        // 顶栏背景色
        headerBarBackground: ['#ffffff', '#1d1e1f'],
        // 顶栏悬停时背景色
        headerBarHoverBackground: ['#f5f5f5', '#18222c']
    })

    // 设置pageConfig的属性
    function setPageConfig(name: string, value: any) {
        pageConfig[name] = value
    }

    // 获取颜色配置
    function getColorVal(name: string) {
        const colors = pageConfig[name]
        if (pageConfig.isDark) {
            return colors[1]
        }
        return colors[0]
    }

    // menu宽度
    function menuWidth() {
        // 菜单是否折叠
        return pageConfig.menuCollapse ? '64px' : `${pageConfig.menuWidth}px`
    }

    return { pageConfig, setPageConfig, getColorVal, menuWidth }
})
