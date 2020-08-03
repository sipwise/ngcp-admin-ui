import {
	AclRule,
	AclCreate
} from 'vue-acl'

export function createAclRule (rule) {
	return new AclRule(rule)
}

let acl = null
export function createAcl (options) {
	if (acl === null) {
		acl = new AclCreate(options)
	}
}
