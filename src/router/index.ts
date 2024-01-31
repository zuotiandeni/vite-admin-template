import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: '/',
            component: () => import('@/layouts/index.vue'),
            meta: {
                title: '工作台'
            },
            children: [
                {
                    path: '/home',
                    name: '/home',
                    component: HomeView,
                    meta: {
                        title: '家'
                    },
                    children: []
                }
            ]
        }
    ]
})

export default router
