const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '/dashboard',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isUser'
				}
			},
			{
				path: '/administrator',
				component: () => import('pages/Administrators.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/administrator/create',
				component: () => import('pages/AdministratorsCreate.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/administrator/:id/edit',
				component: () => import('pages/AdministratorsEdit.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/reseller',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/reseller/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/customer',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isUser'
				}
			},
			{
				path: '/customer/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isUser'
				}
			},
			{
				path: '/contract',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/contract/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/contact',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/contact/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/domain',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/domain/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/subscriber',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isUser'
				}
			},
			{
				path: '/subscriber/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isUser'
				}
			},
			{
				path: '/subscriberprofile',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/subscriberprofile/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/calllistsuppression',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/calllistsuppression/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/billing',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/billing/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/network',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/network/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/package',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/package/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/invoicetemplate',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/invoicetemplate/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/invoice',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/invoice/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/voucher',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/voucher/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/peering',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/peering/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/rewrite',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/rewrite/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/header',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/header/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/ncos',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/ncos/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/sound',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/sound/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/emailtemplate',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/emailtemplate/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/security',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/security/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/lnp',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/lnp/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/emergencymapping',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/emergencymapping/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/phonebook',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/phonebook/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/timeset',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/timeset/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/callflow',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/callflow/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/callroutingverify',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/callroutingverify/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/peeringoverview',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/peeringoverview/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/batchprovisioning',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
				}
			},
			{
				path: '/batchprovisioning/*',
				component: () => import('pages/Proxy.vue'),
				meta: {
					rule: 'isAdmin'
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
					rule: 'public'
				}
			}
		]
	}
]

if (process.env.MODE !== 'ssr') {
	routes.push({
		path: '*',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import('pages/Error404.vue'),
				meta: {
					rule: '*'
				}
			}
		]
	})
}

export default routes
