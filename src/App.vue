<script setup lang="ts">
// 设置最大消息提示为3个
const messageConfig = reactive({
    max: 3
})

// 自动在按钮的两个中文字符之间插入空格
const buttonConfig = reactive({
    autoInsertSpace: true
})
</script>

<template>
    <el-config-provider :message="messageConfig" :button="buttonConfig">
        <RouterView></RouterView>
    </el-config-provider>
</template>
<style scoped></style>
