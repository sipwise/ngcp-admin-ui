
import {
	AclInstaller
} from 'vue-acl'

import {
	createAclRule,
	createAcl
} from '../acl'

export default async ({ router, Vue, store }) => {
	Vue.use(AclInstaller)
	createAcl({
		initial: 'public',
		notfound: {
			path: '/login/admin',
			forwardQueryParams: true
		},
		router,
		acceptLocalRules: true,
		globalRules: {
			isUser: createAclRule('master')
				.or('superUser')
				.or('customerCare')
				.or('system')
				.or('lawfulIntercept')
				.generate(),
			isAdmin: createAclRule('master')
				.or('superUser')
				.or('system')
				.or('lawfulIntercept')
				.generate()
		},
		async middleware (acl) {
			store.$acl = {
				reset () {
					acl.change('public')
				}
			}
			const permissions = []
			if (store.getters['user/isSuperUser']) {
				permissions.push('superUser')
			}
			if (store.getters['user/isMaster']) {
				permissions.push('master')
			}
			if (store.getters['user/isCustomerCare']) {
				permissions.push('customerCare')
			}
			if (store.getters['user/isSystem']) {
				permissions.push('system')
			}
			if (store.getters['user/isLawfulIntercept']) {
				permissions.push('lawfulIntercept')
			}
			acl.change(permissions)
		}
	})
}
