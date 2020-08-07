const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '/dashboard',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'user'
				}
			},
			{
				path: '/administrator',
				component: () => import('pages/Administrators.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/administrator/create',
				component: () => import('pages/AdministratorsCreate.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/administrator/:id/edit',
				component: () => import('pages/AdministratorsEdit.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/reseller',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/reseller/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/customer',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'user'
				}
			},
			{
				path: '/customer/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'user'
				}
			},
			{
				path: '/contract',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/contract/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/contact',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/contact/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/domain',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/domain/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/subscriber',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'user'
				}
			},
			{
				path: '/subscriber/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'user'
				}
			},
			{
				path: '/subscriberprofile',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/subscriberprofile/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/calllistsuppression',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/calllistsuppression/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/billing',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/billing/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/network',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/network/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/package',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/package/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/invoicetemplate',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/invoicetemplate/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/invoice',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/invoice/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/voucher',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/voucher/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/peering',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/peering/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/rewrite',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/rewrite/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/header',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/header/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/ncos',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/ncos/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/sound',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/sound/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/emailtemplate',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/emailtemplate/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/security',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/security/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/lnp',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/lnp/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/emergencymapping',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/emergencymapping/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/phonebook',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/phonebook/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/timeset',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/timeset/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/callflow',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/callflow/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/callroutingverify',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/callroutingverify/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/peeringoverview',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/peeringoverview/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/batchprovisioning',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			},
			{
				path: '/batchprovisioning/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					permission: 'admin'
				}
			}
		]
	},
	{
		path: '/login/admin',
		component: () => import('layouts/Login.vue'),
		children: [
			{
				path: '',
				component: () => import('pages/Login.vue'),
				meta: {
					permission: 'public'
				}
			}
		]
	}
]

if (process.env.MODE !== 'ssr') {
	routes.push({
		path: '*',
		component: () => import('layouts/Login.vue'),
		children: [
			{
				path: '',
				component: () => import('pages/Error404.vue'),
				meta: {
					permission: 'public'
				}
			}
		]
	})
}

export default routes
