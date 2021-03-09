
import _ from 'lodash'

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
    const wildcardChar = '*'
    if (perm === wildcardChar) {
        return true
    } else if (_.isArray(perm)) {
        for (let i = 0; i < perm.length; i++) {
            if (currentPermissions.has(perm[i]) || perm[i] === wildcardChar) {
                return true
            }
        }
    } else if (_.isString(perm)) {
        return currentPermissions.has(perm)
    } else {
        return false
    }
}
