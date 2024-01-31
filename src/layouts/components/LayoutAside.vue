<template>
    <el-aside :class="'layout-aside-' + config.pageConfig.layoutMode">
        <LayoutLogo />
        <MenuVertical />
    </el-aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { usePageConfig } from '@/stores/page-config'
import MenuVertical from './menus/MenuVertical.vue'
import LayoutLogo from './LayoutLogo.vue'

const config = usePageConfig()
const menuWidth = computed(() => config.menuWidth())
</script>

<style lang="scss" scoped>
.layout-aside-LayoutsDefault {
    background: var(--lcy-bg-color-overlay);
    margin: var(--lcy-normal-spacing) 0 var(--lcy-normal-spacing) var(--lcy-normal-spacing);
    height: calc(100vh - var(--lcy-normal-spacing) - var(--lcy-normal-spacing));
    box-shadow: var(--el-box-shadow-light);
    border-radius: var(--el-border-radius-base);
    overflow: hidden;
    transition: width 0.3s ease;
    width: v-bind(menuWidth);
}

.layout-aside-LayoutsClassic,
.layout-aside-LayoutsDouble {
    background: var(--lcy-bg-color-overlay);
    margin: 0;
    height: 100vh;
    overflow: hidden;
    transition: width 0.3s ease;
    width: v-bind(menuWidth);
}
</style>
