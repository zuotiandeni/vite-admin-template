import { cloneDeep, isEmpty } from 'lodash-es'
/**
 * 对iframe的url进行编码
 */
function encodeRoutesURI(data: RouteRecordRaw[]) {
    data.forEach((item: RouteRecordRaw) => {
        if (item.meta?.menu_type === 'iframe') {
            item.path = `/admin/iframe/${encodeURIComponent(item.path)}`
        }

        if (item.children && item.children.length) {
            item.children = encodeRoutesURI(item.children)
        }
    })
    return data
}

// 类型声明
type NavState = {
    activeIndex: number
    activeRoute: RouteLocationNormalizedLoaded | null
    tabsView: RouteLocationNormalizedLoaded[]
    tabsViewRoutes: RouteRecordRaw[]
    tabFullScreen: boolean
}

export const useNavTabs = defineStore(
    'navTabs',
    () => {
        const navState: NavState = reactive({
            // 激活tab的index
            activeIndex: 0,
            // 当前激活的tab
            activeRoute: null,
            // tab列表
            tabsView: [],
            // 从后台加载到的菜单路由列表
            tabsViewRoutes: [],
            // 是否全屏
            tabFullScreen: false
        })

        // 添加tab
        function addTab(tabRoute: RouteLocationNormalizedLoaded) {
            const route = cloneDeep(tabRoute)
            // 当前点击的菜单是否允许加入到tabs列表中？
            if (!route.meta.addtab) return
            const tabItem = navState.tabsView.find((item) => {
                return item.path === route.path
            })
            if (tabItem) {
                tabItem.params = !isEmpty(route.params) ? route.params : tabItem.params
                tabItem.query = !isEmpty(route.query) ? route.query : tabItem.query
            } else {
                navState.tabsView.push(route)
            }
        }

        // 关闭tab
        function closeTab(index: number) {
            // const navItemIndex = navState.tabsView.findIndex(item => {
            // 	return item.path === route.path
            // })
            navState.tabsView.splice(index, 1)
        }

        function setTabsViewRoutes(data: RouteRecordRaw[]) {
            navState.tabsViewRoutes = encodeRoutesURI(data)
        }

        // 设置当前选中的tab
        const setActiveRoute = (tabRoute: RouteLocationNormalizedLoaded) => {
            const route = cloneDeep(tabRoute)
            const currentRouteIndex = navState.tabsView.findIndex((item) => {
                return item.path === route.path
            })
            if (currentRouteIndex === -1) return
            navState.activeRoute = route
            navState.activeIndex = currentRouteIndex
        }

        return { navState, addTab, closeTab, setActiveRoute, setTabsViewRoutes }
    },
    {
        persist: {
            key: 'nav-tabs',
            storage: localStorage
        }
    }
)
