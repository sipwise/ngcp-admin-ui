<template>
    <q-select
        :label="$t('Lock Level')"
        :model-value="$attrs.value"
        emit-value
        map-options
        dense
        :options="lockLevelOptions"
        v-bind="$attrs"
    />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'AuiSelectionLockLevel',
    computed: {
        ...mapGetters('subscribers', [
            'lockLevelOptions'
        ])
    }
}
</script>
