<script setup lang="ts">
import { usePageConfig } from '@/stores/page-config'

const pageConfig = usePageConfig()
function checkLayouts(layoutsType: string) {
    pageConfig.setLayoutMode(layoutsType)
}
</script>

<template>
    <div>
        <el-button @click="checkLayouts('LayoutsClassic')">经典</el-button>
        <el-button @click="checkLayouts('LayoutsDefault')">默认</el-button>
        <el-button @click="checkLayouts('LayoutsStreamline')">单栏</el-button>
    </div>
</template>
<style scoped lang="scss"></style>
