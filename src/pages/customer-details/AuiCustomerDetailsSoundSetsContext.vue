<template>
    <aui-data-context
        v-if="customerContext"
        :resource-object-id="customerSoundSetsContextId"
        :resource="soundSetsContextResource"
        :resource-id="customerSoundSetsContextResourceId"
        :resource-expand="soundSetsContextExpand"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import soundSetsContextMixin from 'src/mixins/data-context-pages/sound-sets'
export default {
    components: { AuiDataContext },
    mixins: [
        soundSetsContextMixin,
        customerContextMixin
    ]
}
</script>
