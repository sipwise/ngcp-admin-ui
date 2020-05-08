const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '/dashboard',
				component: () => import('pages/Dashboard.vue')
			},
			{
				path: '/administrator',
				component: () => import('pages/Administrators.vue')
			},
			{
				path: '/administrator/create',
				component: () => import('pages/AdministratorsCreate.vue')
			},
			{
				path: '/administrator/:id/edit',
				component: () => import('pages/AdministratorsEdit.vue')
			}
		]
	},
	{
		path: '/login/admin',
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
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import('pages/Error404.vue')
			}
		]
	})
}

export default routes
