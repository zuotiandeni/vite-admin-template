import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { isNavigationFailure, NavigationFailureType } from 'vue-router'
import router from '@/router/index'

/**
 * 导航失败有错误消息的路由push
 * @param to — 导航位置，同 router.push
 */
export const routePush = async (to: Object) => {
    try {
        const failure = await router.push(to)
        if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
            ElMessage({
                message: '导航失败，导航守卫被拦截!',
                type: 'error'
            })
        } else if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
            ElMessage({
                message: '导航失败，它在导航目标位置!',
                type: 'warning'
            })
        }
    } catch (error) {
        ElMessage({
            message: '导航失败，路由无效!',
            type: 'error'
        })
    }
}

/**
 * 打开侧边菜单
 * @param menu 菜单数据
 */
export const onClickMenu = (menu: RouteRecordRaw) => {
    switch (menu.meta?.menu_type) {
        case 'iframe':
        case 'tab':
            routePush({ path: menu.path })
            break
        case 'link':
            window.open(menu.path, '_blank')
            break
        default:
            ElMessage({
                message: '导航失败，无法识别菜单类型!',
                type: 'error'
            })
            break
    }
}
