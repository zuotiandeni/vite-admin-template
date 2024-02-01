<template>
    <el-container class="layout-container">
        <el-container class="content-wrapper">
            <Header />
            <Main />
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Header from './components/LayoutHeader.vue'
import Main from './LayoutsRouterView.vue'
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
