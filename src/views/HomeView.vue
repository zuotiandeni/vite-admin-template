<script setup lang="ts">
import { usePageConfig } from '@/stores/page-config'
import { setNavTabsWidth } from '@/utils/layouts'

const pageConfig = usePageConfig()
function checkLayouts(layoutsType: string) {
    pageConfig.setLayoutMode(layoutsType)
    // 重新计算导航栏宽度
    nextTick(() => {
        setNavTabsWidth()
    })
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
