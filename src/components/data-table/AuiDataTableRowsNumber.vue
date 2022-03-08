<template>
    <div
        class="aui-data-table-rows-number"
        data-cy="aui-data-table-rows-number"
    >
        <span>
            {{ $t('Rows found') }}: {{ value }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'AuiDataTableRowsNumber',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        value: {
            type: Number,
            required: true
        }
    }
}
</script>
