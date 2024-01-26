<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
    const arr = [1, 3, 4]
    console.log(arr.at(-1))
})
</script>

<template>
    <div class="home">
        <div class="home-box">测试</div>
        <el-button type="primary" round>Primary</el-button>
    </div>
</template>
<style scoped lang="scss">
.home {
    width: 200px;
    height: 300px;
    display: flex;
    flex-flow: row nowrap;

    &-box {
        height: 100%;
        width: 100%;
    }
}
</style>
