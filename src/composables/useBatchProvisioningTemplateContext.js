import { useDataContext } from 'src/composables/useDataContext'
import { toApiTemplateId } from 'src/helpers/batch-provisioning'
import { toValue } from 'vue'

const RESOURCE_OBJECT_ID = 'batchProvisioningTemplatesContext'

export function useBatchProvisioningTemplateContext ({ resourceId, autoLoad = true } = {}) {
    const { object: template, loading, load, reload } = useDataContext({
        resourceObjectId: RESOURCE_OBJECT_ID,
        resource: 'provisioningtemplates',
        resourceId: () => {
            const id = toValue(resourceId)
            return id ? toApiTemplateId(id) : id
        },
        resourceExpand: ['reseller_id'],
        autoLoad
    })

    return { template, loading, load, reload }
}
