<template>
    <q-page
        class="q-pa-lg"
    >
        <aui-data-table-selected-ncos-levels
            ref="selectedLevelsTable"
            :ncos-set="ncosSet"
        />

        <aui-data-table-ncos-levels
            class="q-mt-xl"
            :ncos-set="ncosSet"
            @on-add-new-level="refresh()"
        />
    </q-page>
</template>

<script>
import AuiDataTableSelectedNcosLevels from 'components/AuiDataTableSelectedNcosLevels'
import AuiDataTableNcosLevels from 'components/AuiDataTableNcosLevels'
import dataContextPageMixin from 'src/mixins/data-context-page'
export default {
    name: 'AuiNCOSSetLevelsLists',
    components: {
        AuiDataTableSelectedNcosLevels,
        AuiDataTableNcosLevels
    },
    mixins: [
        dataContextPageMixin
    ],
    computed: {
        ncosSet () {
            return this.getDataContextObject('ncosSetsContext')
        }
    },
    methods: {
        refresh () {
            this.$refs.selectedLevelsTable.refresh()
        }
    }
}
</script>
