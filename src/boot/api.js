import {
	Store
} from 'vuex'
import {
	apiFetchEntity,
	apiPatch,
	apiPatchReplace,
	apiPostBlob,
	apiPostMinimal,
	apiUpdateEntity
} from 'src/api/common'

Store.prototype.$apiFetchEntity = apiFetchEntity
Store.prototype.$apiUpdateEntity = apiUpdateEntity
Store.prototype.$apiPatch = apiPatch
Store.prototype.$apiPatchReplace = apiPatchReplace
Store.prototype.$apiPostBlob = apiPostBlob
Store.prototype.$apiPostMinimal = apiPostMinimal
