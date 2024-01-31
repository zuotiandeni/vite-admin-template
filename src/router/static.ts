const staticRoutes = [
    {
        path: '/',
        name: '/',
        component: () => import('@/layouts/index.vue'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/HomeView.vue'),
                meta: {
                    title: '首页',
                    addtab: true, // true表示可以被添加进tab中
                    type: 'menu', // 可选值：menu，menu-
                    menu_type: 'tab', // 可选值：tab、iframe、link
                    icon: 'HomeFilled',
                    keepalive: 'home' // 值为当前路由name
                },
                children: []
            }
        ]
    }
]
export { staticRoutes }
