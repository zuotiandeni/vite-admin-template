<template>
    <el-scrollbar ref="verticalMenusRef" class="vertical-menus-scrollbar">
        <el-menu
            class="layouts-menu-vertical"
            :collapse-transition="false"
            :unique-opened="config.pageConfig.menuUniqueOpened"
            :default-active="state.defaultActive"
            :collapse="config.pageConfig.menuCollapse"
        >
            <MenuTree :menus="navTabs.navState.tabsViewRoutes" />
        </el-menu>
    </el-scrollbar>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { usePageConfig } from '@/stores/page-config'
import { useNavTabs } from '@/stores/nav-tabs'
import MenuTree from './MenuTree.vue'

import type { RouteLocationNormalizedLoaded } from 'vue-router'

const config = usePageConfig()
const navTabs = useNavTabs()
const route = useRoute()

const verticalMenusRef = ref()

const state = reactive({
    defaultActive: ''
})

const verticalMenusScrollbarHeight = computed(() => {
    let menuTopBarHeight = 0
    if (config.pageConfig.menuShowTopBar) {
        menuTopBarHeight = 50
    }
    if (config.pageConfig.layoutMode === 'Default') {
        return `calc(100vh - ${32 + menuTopBarHeight}px)`
    }
    return `calc(100vh - ${menuTopBarHeight}px)`
})

// 激活当前路由的菜单
const currentRouteActive = (currentRoute: RouteLocationNormalizedLoaded) => {
    state.defaultActive = currentRoute.path
}

// 滚动条滚动到激活菜单所在位置
const verticalMenusScroll = () => {
    nextTick(() => {
        const activeMenu: HTMLElement | null = document.querySelector(
            '.el-menu.layouts-menu-vertical li.is-active'
        )
        if (!activeMenu) return
        verticalMenusRef.value?.setScrollTop(activeMenu.offsetTop)
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
<style>
.vertical-menus-scrollbar {
    height: v-bind(verticalMenusScrollbarHeight);
    background-color: v-bind('config.getColorVal("menuBackground")');
}
.layouts-menu-vertical {
    border: 0;
    --el-menu-bg-color: v-bind('config.getColorVal("menuBackground")');
    --el-menu-text-color: v-bind('config.getColorVal("menuColor")');
    --el-menu-active-color: v-bind('config.getColorVal("menuActiveColor")');
}
</style>
