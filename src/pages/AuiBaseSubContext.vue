<template>
    <div
        class="aui-base-sub-context"
    >
        <slot
            :resource-object="resourceObject"
            :resource-related-object="resourceRelatedObjects"
            :resource-related-sub-objects="resourceRelatedSubObjects"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'AuiBaseSubContext',
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects',
            'resourceRelatedSubObjects'
        ])
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'

.aui-base-sub-context
    padding: $aui-page-padding
</style>
