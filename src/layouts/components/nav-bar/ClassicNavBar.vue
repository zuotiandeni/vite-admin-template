<template>
    <div class="nav-bar">
        <NavBarTabs />
        <div class="nav-menus">
            <UseDarkComp />
            <div>admin</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import NavBarTabs from './NavBarTabs.vue'

import { usePageConfig } from '@/stores/page-config'

const pageConfig = usePageConfig()
</script>

<style lang="scss" scoped>
.nav-menus {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    margin-left: auto;
    background-color: var(--lcy-menu-bg);
    padding: 0 20px;
}

.nav-bar {
    display: flex;
    height: 50px;
    line-height: 50px;
    width: 100%;
    background-color: v-bind('pageConfig.getColorVal("headerBarBackground")');
    :deep(.nav-bar-tabs) {
        display: flex;
        height: 100%;
        position: relative;
        .nav-bar-tabs-item {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            cursor: pointer;
            z-index: 1;
            height: 100%;
            user-select: none;
            color: v-bind('pageConfig.getColorVal("headerBarTabColor")');
            transition: all 0.2s;
            -webkit-transition: all 0.2s;
            .close-icon {
                padding: 2px;
                margin: 2px 0 0 4px;
            }
            .close-icon:hover {
                background: var(--lcy-color-primary-light);
                color: var(--el-border-color) !important;
                border-radius: 50%;
            }
            &.active {
                color: v-bind('pageConfig.getColorVal("headerBarTabActiveColor")');
            }
            &:hover {
                background-color: v-bind('pageConfig.getColorVal("headerBarHoverBackground")');
            }
        }
        .nav-tabs-active-box {
            position: absolute;
            height: 50px;
            background-color: v-bind('pageConfig.getColorVal("headerBarTabActiveBackground")');
            transition: all 0.2s;
            -webkit-transition: all 0.2s;
        }
    }
}
</style>
