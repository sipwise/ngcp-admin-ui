
const currentPermissions = new Set()
currentPermissions.add('public')

export function changePermissions (perms) {
	currentPermissions.clear()
	perms.forEach((perm) => {
		currentPermissions.add(perm)
	})
	currentPermissions.add('public')
}

export function clearPermissions () {
	currentPermissions.clear()
	currentPermissions.add('public')
}

export function checkPermission (perm) {
	return currentPermissions.has(perm)
}
