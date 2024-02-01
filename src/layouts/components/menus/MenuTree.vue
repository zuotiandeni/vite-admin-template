<template>
    <template v-for="menu in props.menus">
        <template v-if="menu.children && menu.children.length > 0">
            <el-sub-menu @click="onClickSubMenu(menu)" :index="menu.path" :key="menu.path">
                <template #title>
                    <el-icon :color="config.getColorVal('menuColor')">
                        <component
                            :is="
                                menu.meta?.icon
                                    ? menu.meta?.icon
                                    : config.pageConfig.menuDefaultIcon
                            "
                        />
                    </el-icon>
                    <span>{{ menu.meta?.title }}</span>
                </template>
                <menu-tree :menus="menu.children"></menu-tree>
            </el-sub-menu>
        </template>
        <template v-else>
            <el-menu-item :index="menu.path" :key="menu.path" @click="onClickMenu(menu)">
                <el-icon :color="config.getColorVal('menuColor')">
                    <component
                        :is="menu.meta?.icon ? menu.meta?.icon : config.pageConfig.menuDefaultIcon"
                    />
                </el-icon>
                <span>{{ menu.meta?.title }}</span>
            </el-menu-item>
        </template>
    </template>
</template>
<script setup lang="ts">
import { usePageConfig } from '@/stores/page-config'
import { onClickMenu } from '@/utils/router'
import type { RouteRecordRaw } from 'vue-router'
import { HomeFilled } from '@element-plus/icons-vue'

const config = usePageConfig()

// 接收菜单数据
const props = defineProps({
    menus: {
        type: Array<RouteRecordRaw>,
        default: () => []
    }
})

defineOptions({
    components: {
        HomeFilled
    }
})

const onClickSubMenu = (menu: RouteRecordRaw) => {
    if (
        ['LayoutsStreamline', 'Double'].includes(config.pageConfig.layoutMode) &&
        menu.children?.length
    ) {
        onClickMenu(menu.children[0])
    }
}
onMounted(() => {
    console.log(props.menus)
})
</script>

<style scoped lang="scss">
.el-sub-menu .icon,
.el-menu-item .icon {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    flex-shrink: 0;
}
.is-active > .icon {
    color: var(--el-menu-active-color) !important;
}
.el-menu-item.is-active {
    background-color: v-bind('config.getColorVal("menuActiveBackground")');
}
</style>
