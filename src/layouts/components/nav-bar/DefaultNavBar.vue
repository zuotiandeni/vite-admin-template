<template>
    <div class="nav-bar">
        <NavBarTabs />
        <div class="nav-menus">
            <div @click="toggleDark()">黑夜模式切换</div>
            <div>admin</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import toggleDark from '@/utils/use-dark'
import { usePageConfig } from '@/stores/page-config'
import NavBarTabs from './NavBarTabs.vue'

const pageConfig = usePageConfig()
</script>

<style lang="scss" scoped>
.nav-bar {
    display: flex;
    height: 50px;
    margin: 20px var(--lcy-normal-spacing) 0 var(--lcy-normal-spacing);

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
            user-select: none;
            opacity: 0.7;
            color: v-bind('pageConfig.getColorVal("headerBarTabColor")');
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
                opacity: 1;
            }
        }
        .nav-tabs-active-box {
            position: absolute;
            height: 40px;
            border-radius: var(--el-border-radius-base);
            background-color: v-bind('pageConfig.getColorVal("headerBarTabActiveBackground")');
            box-shadow: var(--el-box-shadow-light);
            transition: all 0.2s;
            -webkit-transition: all 0.2s;
        }
    }
}
.nav-menus {
    display: flex;
    margin-left: auto;
    white-space: nowrap;
}
</style>
