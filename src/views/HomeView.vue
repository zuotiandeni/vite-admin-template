<script setup lang="ts">
/**
 * 暗黑模式
 */
const isDark = useDark()
const toggleDark = () => useToggle(isDark)

onMounted(() => {
    const arr = [1, 3, 4]
    console.log(arr.at(-1))
})
</script>

<template>
    <div>
        <el-switch v-model="isDark" @change="toggleDark" />
    </div>
</template>
<style scoped lang="scss"></style>
