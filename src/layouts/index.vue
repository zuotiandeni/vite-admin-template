<template>
    <component :is="pageConfig.pageConfig.layoutMode"></component>
</template>

<script setup lang="ts">
import { staticRoutes } from '@/router/static'
import { usePageConfig } from '@/stores/page-config'
import { useNavTabs } from '@/stores/nav-tabs'

import { cloneDeep } from 'lodash-es'
import LayoutsDefault from './LayoutsDefault.vue'
import LayoutsClassic from './LayoutsClassic.vue'
import LayoutsDouble from './LayoutsDouble.vue'
import LayoutsStreamline from './LayoutsStreamline.vue'

import { setNavTabsWidth } from '@/utils/layouts'
const pageConfig = usePageConfig()
const navTabs = useNavTabs()
const initRoute = () => {
    // TODO: 从后台获取动态路由列表...
    // 处理路由数据
    console.log(staticRoutes[0].children)
    navTabs.setTabsViewRoutes(cloneDeep(staticRoutes[0].children) as RouteRecordRaw[])
}
initRoute()
onMounted(() => {
    setNavTabsWidth()
    useEventListener(window, 'resize', setNavTabsWidth)
})

defineOptions({
    components: { LayoutsDefault, LayoutsClassic, LayoutsStreamline, LayoutsDouble }
})
</script>
