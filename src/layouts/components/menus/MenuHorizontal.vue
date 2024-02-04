<template>
    <div class="layouts-menu-horizontal">
        <div class="menu-horizontal-logo" v-if="pageConfig.pageConfig.menuShowTopBar">
            <LayoutLogo />
        </div>
        <el-scrollbar ref="horizontalMenusRef" class="horizontal-menus-scrollbar">
            <el-menu
                class="menu-horizontal"
                mode="horizontal"
                :default-active="state.defaultActive"
                :key="state.menuKey"
            >
                <MenuTree :menus="menus" />
            </el-menu>
        </el-scrollbar>
        <div class="nav-menus">
            <UseDarkComp />
            <div>admin</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import LayoutLogo from '../LayoutLogo.vue'
import MenuTree from './MenuTree.vue'
import { usePageConfig } from '@/stores/page-config'
import { useNavTabs } from '@/stores/nav-tabs'
import { uuid } from '@/utils/random'

import type { RouteLocationNormalizedLoaded } from 'vue-router'

const horizontalMenusRef = ref()

const pageConfig = usePageConfig()
const navTabs = useNavTabs()
const route = useRoute()

const state = reactive({
    menuKey: uuid(),
    defaultActive: ''
})

const menus = computed(() => {
    state.menuKey = uuid()
    return navTabs.navState.tabsViewRoutes
})

// 激活当前路由的菜单
const currentRouteActive = (currentRoute: RouteLocationNormalizedLoaded) => {
    state.defaultActive = currentRoute.path
}

// 滚动条滚动到激活菜单所在位置
const verticalMenusScroll = () => {
    nextTick(() => {
        let activeMenu = document.querySelector('.el-menu.menu-horizontal li.is-active')
        if (!activeMenu) return false
        horizontalMenusRef.value?.setScrollTop((activeMenu as HTMLElement).offsetTop)
    })
}

onMounted(() => {
    currentRouteActive(route)
    verticalMenusScroll()
})

onBeforeRouteUpdate((to) => {
    currentRouteActive(to)
})
</script>

<style scoped lang="scss">
.layouts-menu-horizontal {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 60px;
    background-color: var(--lcy-bg-color-overlay);
    border-bottom: solid 1px var(--el-color-info-light-8);
}
.menu-horizontal-logo {
    width: 180px;
    &:hover {
        background-color: v-bind('pageConfig.getColorVal("headerBarHoverBackground")');
    }
}
.horizontal-menus-scrollbar {
    flex: 1;
    height: 60px;
}
.menu-horizontal {
    border: none;
    --el-menu-bg-color: v-bind('pageConfig.getColorVal("menuBackground")');
    --el-menu-text-color: v-bind('pageConfig.getColorVal("menuColor")');
    --el-menu-active-color: v-bind('pageConfig.getColorVal("menuActiveColor")');
}

.el-sub-menu .icon,
.el-menu-item .icon {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    flex-shrink: 0;
}
.is-active .icon {
    color: var(--el-menu-active-color) !important;
}
.el-menu-item.is-active {
    background-color: v-bind('pageConfig.getColorVal("menuActiveBackground")');
}

.nav-menus {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    margin-left: auto;
    background-color: var(--lcy-menu-bg);
    padding: 0 20px;
}
</style>
