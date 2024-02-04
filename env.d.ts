/// <reference types="vite/client" />
// 命名方式：global rewrite —— GR
// 避免在文件多处引入类型
import type {
    RouteRecordRaw as GRRouteRecordRaw,
    RouteLocationNormalizedLoaded as GRRouteLocationNormalizedLoaded
} from 'vue-router'

declare global {
    type RouteRecordRaw = GRRouteRecordRaw
    type RouteLocationNormalizedLoaded = GRRouteLocationNormalizedLoaded
}
