<template>
    <div
        class="aui-data-table-rows-per-page-selection"
        data-cy="aui-data-table-rows-per-page-selection"
    >
        <span
            class="q-mr-xs"
        >
            {{ $t('Rows per page') }}:
        </span>
        <q-btn-dropdown
            color="primary"
            size="sm"
            flat
            :disable="loading"
            :label="value"
        >
            <q-list
                dense
            >
                <q-item
                    v-for="(rowPerPage, index) in rowsPerPageOptions"
                    :key="index"
                    v-close-popup
                    dense
                    clickable
                    @click="$emit('input', rowPerPage)"
                >
                    <q-item-section>
                        <q-item-label>
                            {{ rowPerPage }}
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-btn-dropdown>
    </div>
</template>

<script>
export default {
    name: 'AuiDataTableRowsPerPageSelection',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        value: {
            type: Number,
            required: true
        },
        rowsPerPageOptions: {
            type: Array,
            required: true
        }
    },
    emits: ['input']
}
</script>
