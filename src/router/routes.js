const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '/dashboard',
				component: () => import('pages/Proxy.vue')
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
			},
			{
				path: '/reseller',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/reseller/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/customer',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/customer/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/contract',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/contract/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/contact',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/contact/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/domain',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/domain/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/subscriber',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/subscriber/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/subscriberprofile',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/subscriberprofile/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/calllistsuppression',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/calllistsuppression/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/billing',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/billing/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/network',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/network/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/package',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/package/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/invoicetemplate',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/invoicetemplate/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/invoice',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/invoice/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/voucher',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/voucher/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/peering',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/peering/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/rewrite',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/rewrite/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/header',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/header/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/ncos',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/ncos/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/sound',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/sound/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/emailtemplate',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/emailtemplate/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/security',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/security/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/lnp',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/lnp/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/emergencymapping',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/emergencymapping/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/phonebook',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/phonebook/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/timeset',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/timeset/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/callflow',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/callflow/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/callroutingverify',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/callroutingverify/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/peeringoverview',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/peeringoverview/*',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/batchprovisioning',
				component: () => import('pages/Proxy.vue')
			},
			{
				path: '/batchprovisioning/*',
				component: () => import('pages/Proxy.vue')
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
