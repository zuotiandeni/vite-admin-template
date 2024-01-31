<template>
    <el-header class="layout-header">
        <component :is="config.pageConfig.layoutMode + 'NavBar'"></component>
    </el-header>
</template>

<script setup lang="ts">
import LayoutsDefaultNavBar from './nav-bar/DefaultNavBar.vue'
import LayoutsClassicNavBar from './nav-bar/ClassicNavBar.vue'
import { usePageConfig } from '@/stores/page-config'

defineOptions({
    components: { LayoutsDefaultNavBar, LayoutsClassicNavBar }
})

const config = usePageConfig()
</script>

<style lang="scss" scoped>
.layout-header {
    height: auto;
    padding: 0;
}
</style>
