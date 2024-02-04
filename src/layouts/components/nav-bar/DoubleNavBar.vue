<template>
    <div class="layouts-menu-horizontal-double">
        <el-scrollbar ref="horizontalMenusRef" class="double-menus-scrollbar">
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
import { currentRouteTopActivity } from '../menus/helper'
import MenuTree from '../menus/MenuTree.vue'
import { useNavTabs } from '@/stores/nav-tabs'
import { usePageConfig } from '@/stores/page-config'
import { uuid } from '@/utils/random'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const horizontalMenusRef = ref()

const config = usePageConfig()
const navTabs = useNavTabs()
const route = useRoute()

const state = reactive({
    menuKey: uuid(),
    defaultActive: ''
})

const menus = computed(() => {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    state.menuKey = uuid()
    return navTabs.navState.tabsViewRoutes
})

// 激活当前路由的菜单
const currentRouteActive = (currentRoute: RouteLocationNormalizedLoaded) => {
    console.log(currentRoute)

    let routeChildren = currentRouteTopActivity(currentRoute.path, navTabs.navState.tabsViewRoutes)
    console.log(currentRoute.path, navTabs.navState.tabsViewRoutes)

    if (routeChildren) state.defaultActive = currentRoute.path
}

// 滚动条滚动到激活菜单所在位置
const verticalMenusScroll = () => {
    nextTick(() => {
        let activeMenu: HTMLElement | null = document.querySelector(
            '.el-menu.menu-horizontal li.is-active'
        )
        if (!activeMenu) return false
        horizontalMenusRef.value?.setScrollTop(activeMenu.offsetTop)
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
.layouts-menu-horizontal-double {
    display: flex;
    align-items: center;
    height: 60px;
    background-color: var(--wti-bg-color-overlay);
    border-bottom: solid 1px var(--el-color-info-light-8);
}
.double-menus-scrollbar {
    width: 70vw;
    height: 60px;
}
.menu-horizontal {
    border: none;
    --el-menu-bg-color: v-bind('config.getColorVal("menuBackground")');
    --el-menu-text-color: v-bind('config.getColorVal("menuColor")');
    --el-menu-active-color: v-bind('config.getColorVal("menuActiveColor")');
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
    background-color: v-bind('config.getColorVal("menuActiveBackground")');
}

.nav-menus {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    margin-left: auto;
    background-color: var(--lcy-menu-bg);
    flex: 1;
}
</style>
