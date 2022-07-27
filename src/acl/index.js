
import adminCcare from './adminCcare'
import adminCcareReadOnly from './adminCcareReadOnly'
import adminCcareSuperuser from './adminCcareSuperuser'
import adminCcareSuperuserReadOnly from './adminCcareSuperuserReadOnly'
import adminLintercept from 'src/acl/adminLintercept'
import adminResellerReadOnly from 'src/acl/adminResellerReadOnly'
import adminReseller from 'src/acl/adminReseller'
import adminResellerMaster from 'src/acl/adminResellerMaster'
import adminResellerMasterReadOnly from 'src/acl/adminResellerMasterReadOnly'
import adminSuperuserMasterReadOnly from 'src/acl/adminSuperuserMasterReadOnly'
import adminSuperuserMaster from 'src/acl/adminSuperuserMaster'
import _ from 'lodash'

export const internalPermissions = {
    adminCcare,
    adminCcareReadOnly,
    adminCcareSuperuser,
    adminCcareSuperuserReadOnly,
    adminLintercept,
    adminResellerReadOnly,
    adminReseller,
    adminResellerMasterReadOnly,
    adminResellerMaster,
    adminSuperuserMasterReadOnly,
    adminSuperuserMaster
}

const ACL_PERM_KEY = '$p'
const ACL_PERM_ALL_KEY = '$all'
const ACL_PERM_REF_KEY = '$ref'
const ACL_PERM_OWN_KEY = '$own'
const ACL_KEY_HAS = '$hasChildTrue'

let aclPermissions = {}

/**
 * Sets the permissions globally. This method needs to be executed to set the permissions initially.
 * @param permissions {Object}
 */
export function aclSet (permissions) {
    aclPermissions = permissions
}

/**
 * This function checks whether an operation is permitted for a specific resource or not.
 * @example It checks whether the permissions, set by aclSet, allow to create a Customer or not.
 * aclCan('create', 'entity.customer')
 * @example It check whether the given user has ownership permissions on the given resourceObject.
 * aclCan('delete', 'entity.customer', { name: 'Customer1', ...}, { username: 'admin1', ...})
 * @param operation {String|Array<String>} Contains the operation to check (e.g. "create", "read", "update", "delete", etc. ...)
 * @param resource {String|Array<String>} Contains the object path that identifies a specific resource (e.g. "entity.admins")
 * @param [resourceObject] {Object} Contains an actual instance of a resource (e.g. { username: "administrator", ...} )
 * @param [user] {Object} Contains the user that tries to apply the operation on the given resource object
 * @param [stopRecursion] {Boolean} If true it stops following references ($ref) and parent permissions
 * @returns {Boolean} Returns the final result whether the given operation is allowed or not
 */
function aclCanInternal (operation, resource, resourceObject, user, stopRecursion = false) {
    if (_.isEmpty(operation)) {
        return false
    }
    if (_.isEmpty(resource)) {
        return false
    }
    if (_.isArray(resource)) {
        let finalResult = null
        resource.forEach((resourceItem) => {
            if (finalResult === null) {
                finalResult = aclCanInternal(operation, resourceItem, resourceObject, user)
            } else {
                finalResult = finalResult && aclCanInternal(operation, resourceItem, resourceObject, user)
            }
        })
        return finalResult
    } else if (_.isArray(operation)) {
        let finalResult = null
        operation.forEach((operationItem) => {
            if (finalResult === null) {
                finalResult = aclCanInternal(operationItem, resource, resourceObject, user)
            } else {
                finalResult = finalResult && aclCanInternal(operationItem, resource, resourceObject, user)
            }
        })
        return finalResult
    }
    const permissionsPath = resource + '.' + ACL_PERM_KEY
    const permissions = _.get(aclPermissions, permissionsPath, {})
    const all = _.get(permissions, ACL_PERM_ALL_KEY, null)
    const allOwn = _.get(all, ACL_PERM_OWN_KEY, null)
    const ref = _.get(permissions, ACL_PERM_REF_KEY, null)
    const permission = _.get(permissions, operation, null)
    const permissionOwn = _.get(permission, ACL_PERM_OWN_KEY, null)

    if (resource.endsWith('.' + ACL_KEY_HAS)) {
        let finalResult = false
        const resourceParts = resource.split('.')
        resourceParts.pop()
        const parentPath = resourceParts.join('.')
        const childs = _.get(aclPermissions, parentPath, {})
        Object.entries(childs).forEach((child) => {
            finalResult = finalResult || aclCanInternal(operation, parentPath + '.' + child[0], resourceObject, user)
        })
        return finalResult
    } else if (_.isBoolean(permission)) {
        return permission
    } else if (_.isObject(permissions) && permissionOwn !== null && _.isObject(resourceObject) && _.isObject(user)) {
        return String(_.get(resourceObject, permissionOwn, null)) === String(user.id)
    } else if (_.isObject(all) && allOwn !== null && _.isObject(resourceObject) && _.isObject(user)) {
        return String(_.get(resourceObject, allOwn, null)) === String(user.id)
    } else if (_.isBoolean(all)) {
        return all
    } else if (_.isString(ref) && !stopRecursion) {
        const resourceParts = resource.split('.')
        resourceParts.pop()
        resourceParts.push(ref)
        return aclCanInternal(operation, resourceParts.join('.'), resourceObject, user, true)
    } else if (resource.split('.').length > 1 && !stopRecursion) {
        const resourceParts = resource.split('.')
        resourceParts.pop()
        return aclCanInternal(operation, resourceParts.join('.'), resourceObject, user, true)
    } else {
        return false
    }
}

export function aclCan (operation, resource, resourceObject, user) {
    return aclCanInternal(operation, resource, resourceObject, user)
}

export function aclCanResource (operation, resource) {
    return aclCan(operation, 'entity.' + resource)
}

export function aclCanResourceColumn (operation, resource, column, resourceObject, user) {
    const resourceColumn = 'entity.' + resource + '.columns.' + column
    return aclCan(operation, resourceColumn) || aclCan(operation, resourceColumn, resourceObject, user)
}

/**
 * Resets the permissions globally.
 */
export function aclReset () {
    aclPermissions = {}
}
