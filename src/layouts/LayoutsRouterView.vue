<script setup lang="ts">
import { usePageConfig } from '@/stores/page-config'
import { useNavTabs } from '@/stores/nav-tabs'
import { mainHeight as layoutMainScrollbarStyle } from '@/utils/layouts'

const pageConfig = usePageConfig()
const navTabs = useNavTabs()

const route = useRoute()
const state: layoutsRouterViewState = reactive({
    componentKey: route.path,
    keepAliveComponentNameList: []
})

// 添加keep-alive的路由信息
const addKeepAliveComponentName = function (keepAliveName: string) {
    if (keepAliveName) {
        let exist = state.keepAliveComponentNameList.find((name) => {
            return name === keepAliveName
        })
        // 如果已经添加过了，则直接去return
        if (exist) return
        state.keepAliveComponentNameList.push(keepAliveName)
    }
}

// 监听路由变化，去添加到keep-alive的列表中去
watchEffect(() => {
    state.componentKey = route.path

    const activeRoute = navTabs.navState.activeRoute
    if (activeRoute && typeof activeRoute.meta.keepalive === 'string') {
        addKeepAliveComponentName(activeRoute.meta.keepalive)
    }
})
</script>

<template>
    <el-main class="layout-main">
        <el-scrollbar
            class="layout-main-scrollbar"
            :style="layoutMainScrollbarStyle()"
            ref="mainScrollbarRef"
        >
            <router-view v-slot="{ Component }">
                <transition :name="pageConfig.pageConfig.mainAnimation as string" mode="out-in">
                    <keep-alive :include="state.keepAliveComponentNameList">
                        <component :is="Component" :key="state.componentKey" />
                    </keep-alive>
                </transition>
            </router-view>
        </el-scrollbar>
    </el-main>
</template>
<style scoped lang="scss">
.layout-main {
    padding: 0 !important;

    :deep(.el-scrollbar__view) {
        margin: var(--lcy-normal-spacing);
    }
}
</style>
