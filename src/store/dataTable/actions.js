import {
	apiDelete, apiFetchEntity,
	apiGetPaginatedList, apiPatchRemoveFull,
	apiPatchReplace, apiPatchReplaceFull
} from 'src/api/common'
import {
	panelGetPaginatedList
} from 'src/api/panel'
import { normalisePreferences } from 'src/api/preferences'
import { handleGlobalActionError, resetGlobalActionError } from 'src/store/error'

export async function request (context, options) {
	context.commit('dataRequesting', {
		tableId: options.tableId,
		pagination: options.pagination,
		filter: options.filter
	})
	let res
	if (options.resourceType === 'ajax') {
		res = await panelGetPaginatedList(options.resourceAlt, options.columns, {
			pagination: options.pagination,
			filter: options.filter
		})
	} else {
		res = await apiGetPaginatedList({
			resource: options.resource,
			resourceSearchField: options.resourceSearchField,
			filter: options.filter
		}, options.pagination)
	}
	context.commit('dataSucceeded', {
		tableId: options.tableId,
		items: res.items,
		lastPage: res.lastPage,
		totalItems: res.totalItems
	})
}

export async function patchResource (context, options) {
	context.commit('patchRequesting', {
		tableId: options.tableId
	})
	try {
		await apiPatchReplace({
			resource: options.resource,
			resourceId: options.resourceId,
			field: options.resourceField,
			value: options.resourceValue
		})
	} catch (err) {
		context.commit('patchFailed', {
			tableId: options.tableId,
			error: err.message
		})
	}
}

export async function deleteResource (context, options) {
	await apiDelete(options)
}

export async function loadResource (context, options) {
	try {
		resetGlobalActionError(context)
		const resourceObject = await apiFetchEntity(options.resource, options.resourceId)
		const resourceCascadedObjects = {}
		if (options.resourceCascade) {
			const cascadeRequestKeys = []
			const cascadeRequests = []
			for (const [field, cascade] of Object.entries(options.resourceCascade)) {
				cascadeRequestKeys.push(field)
				cascadeRequests.push(apiFetchEntity(
					cascade.resource,
					resourceObject[field]
				))
			}
			const cascadedObjects = await Promise.all(cascadeRequests)
			for (const [index, cascadedObject] of cascadedObjects.entries()) {
				resourceCascadedObjects[cascadeRequestKeys[index]] = cascadedObject
			}
		}
		context.commit('resourceSucceeded', {
			resource: options.resource,
			resourceObject: resourceObject,
			resourceCascadedObjects: resourceCascadedObjects
		})
	} catch (err) {
		handleGlobalActionError(context)
	}
}

export async function loadPreferencesContext (context, options = {
	preferencesId: null,
	resourceId: null,
	resource: null
}) {
	await context.dispatch('wait/start', 'aui-preferences-context', { root: true })
	const preferencesContext = await apiFetchEntity(options.resource, options.resourceId)
	context.commit('preferencesSucceeded', {
		id: options.preferencesId,
		context: preferencesContext
	})
	await context.dispatch('wait/end', 'aui-preferences-context', { root: true })
}

export async function loadPreferencesSchema (context, options = {
	preferencesId: null,
	resourceSchema: null
}) {
	await context.dispatch('wait/start', 'aui-preferences-schema', { root: true })
	if (!context.state[options.preferencesId + 'PreferencesSchema']) {
		const schema = await apiFetchEntity(options.resourceSchema)
		context.commit('preferencesSucceeded', {
			id: options.preferencesId,
			schema: Object.freeze(normalisePreferences(schema))
		})
	}
	await context.dispatch('wait/end', 'aui-preferences-schema', { root: true })
}

export async function loadPreferencesData (context, options = {
	preferencesId: null,
	resourceData: null,
	resourceId: null
}) {
	await context.dispatch('wait/start', 'aui-preferences-data', { root: true })
	const data = await apiFetchEntity(options.resourceData, options.resourceId)
	context.commit('preferencesSucceeded', {
		id: options.preferencesId,
		data: Object.freeze(data)
	})
	await context.dispatch('wait/end', 'aui-preferences-data', { root: true })
}

export async function loadPreferences (context, options = {
	preferencesId: null,
	resourceId: null,
	resource: null,
	resourceData: null,
	resourceSchema: null
}) {
	const requests = []
	if (!context.state[options.preferencesId + 'PreferencesSchema']) {
		requests.push(apiFetchEntity(options.resourceSchema))
	}
	requests.push(apiFetchEntity(options.resourceData, options.resourceId))
	const res = await Promise.all(requests)
	let finalRes = null
	if (requests.length === 2) {
		finalRes = {
			id: options.preferencesId,
			data: res[0]
		}
	} else {
		finalRes = {
			id: options.preferencesId,
			schema: normalisePreferences(res[0]),
			data: res[1]
		}
	}
	context.commit('preferencesSucceeded', finalRes)
}

export async function setPreference (context, options = {
	preferencesId: null,
	resourceId: null,
	resourceData: null,
	preferenceName: null,
	preferenceValue: null
}) {
	try {
		const preferencesData = await apiPatchReplaceFull({
			resource: options.resourceData,
			resourceId: options.resourceId,
			field: options.preferenceName,
			value: options.preferenceValue
		})
		context.commit('preferencesSucceeded', {
			id: options.preferencesId,
			data: preferencesData
		})
	} catch (err) {
		context.commit('preferenceFailed', {
			preferencesId: options.preferencesId,
			preferenceName: options.preferenceName,
			error: err.message
		})
	}
}

export async function removePreference (context, options = {
	preferencesId: null,
	resourceId: null,
	resourceData: null,
	preferenceName: null
}) {
	try {
		const preferencesData = await apiPatchRemoveFull({
			resource: options.resourceData,
			resourceId: options.resourceId,
			field: options.preferenceName
		})
		context.commit('preferencesSucceeded', {
			id: options.preferencesId,
			data: preferencesData
		})
	} catch (err) {
		context.commit('preferenceFailed', {
			preferencesId: options.preferencesId,
			preferenceName: options.preferenceName,
			error: err.message
		})
	}
}

export async function deleteResourceByTerminatedStatus (context, options) {
	await apiPatchReplace({
		resource: options.resource,
		resourceId: options.resourceId,
		field: 'status',
		value: 'terminated'
	})
}
