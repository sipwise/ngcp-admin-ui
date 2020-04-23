const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '/',
				component: () => import('pages/Index.vue')
			},
			{
				path: '/settings/administrators',
				component: () => import('pages/administrators/AdminList.vue')
			}
		]
	},
	{
		path: '/login',
		component: () => import('layouts/Login.vue'),
		children: [
			{
				path: '',
				component: () => import('pages/Login.vue')
			}
		]
	}
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
	routes.push({
		path: '*',
		component: () => import('pages/Error404.vue')
	})
}

export default routes
