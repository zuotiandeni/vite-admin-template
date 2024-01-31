import router from '@/router/index'
/**
 * 根据路由 meta.title 设置浏览器标题
 */
export function setTitleFromRoute() {
    if (typeof router.currentRoute.value.meta.title !== 'string') {
        return
    }
    nextTick(() => {
        const title = useTitle()
        title.value = router.currentRoute.value.meta.title as string
    })
}
