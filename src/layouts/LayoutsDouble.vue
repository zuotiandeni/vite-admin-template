<template>
    <el-container class="layout-container">
        <Aside />
        <el-container class="content-wrapper">
            <Header />
            <Main />
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Aside from './components/LayoutAside.vue'
import Main from './LayoutsRouterView.vue'
import Header from './components/LayoutHeader.vue'
</script>

<style scoped>
.layout-container {
    height: 100%;
    width: 100%;
}
.content-wrapper {
    flex-direction: column;
    width: 100%;
    height: 100%;
}
</style>
