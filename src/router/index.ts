import { createRouter, createWebHistory } from 'vue-router'
import { staticRoutes } from './static'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: staticRoutes
})

router.beforeEach((to, from) => {
    console.log(to, from)

    if (!sessionStorage.getItem('token') && to.name !== 'login') {
        return {
            name: 'login',
            params: {
                redirect: to.fullPath
            }
        }
    }
})

export default router
