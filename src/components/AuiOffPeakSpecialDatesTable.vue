<template>
    <div>
        <div v-if="canUse">
            <q-btn
                icon="add"
                flat
                color="primary"
                align="left"
                @click="openDialog"
            >
                <q-tooltip>
                    {{ $t('Add Date Range') }}
                </q-tooltip>
            </q-btn>
            <q-btn
                icon="delete_sweep"
                flat
                color="negative"
                align="left"
                @click="openDeleteAllDialog()"
            >
                <q-tooltip>
                    {{ $t('Clear All') }}
                </q-tooltip>
            </q-btn>
        </div>
        <div class="row q-mt-sm">
            <div class="col">
                <div class="q-mb-md">
                    <q-input
                        v-model="filterText"
                        dense
                        outlined
                        placeholder="Filter rows..."
                    />
                </div>
                <q-table
                    flat
                    bordered
                    :title="$t('Special Date Ranges')"
                    dense
                    :rows="filteredRows"
                    :columns="columns"
                    row-key="name"
                >
                    <template #body="props">
                        <q-tr
                            :props="props"
                            class="q-hoverable"
                        >
                            <q-td
                                key="id"
                                :props="props"
                            >
                                {{ props.row.id + 1 }}
                            </q-td>
                            <q-td
                                key="start"
                                :props="props"
                                class="q-hoverable"
                                :class="{ 'cursor-pointer': canUse }"
                                v-on="canUse ? { click: () => editCell(props.rowIndex, 'start', props.row.id) } : {}"
                            >
                                <div v-if="editingCell?.index === props.rowIndex && editingCell?.field === 'start' && canUse">
                                    <q-input
                                        v-model="editValue"
                                        type="datetime-local"
                                        dense
                                        autofocus
                                        :error="validationError"
                                        :error-message="validationErrorMessage"
                                        @blur="saveEdit"
                                        @keyup.enter="saveEdit"
                                        @keyup.escape="cancelEdit"
                                        @input="validateInput"
                                    />
                                </div>
                                <div v-else>
                                    {{ formatDate(props.row.start) }}
                                </div>
                            </q-td>

                            <q-td
                                key="stop"
                                :props="props"
                                class="q-hoverable"
                                :class="{ 'cursor-pointer': canUse }"
                                v-on="canUse ? { click: () => editCell(props.rowIndex, 'stop', props.row.id) } : {}"
                            >
                                <div v-if="editingCell?.index === props.rowIndex && editingCell?.field === 'stop' && canUse">
                                    <q-input
                                        v-model="editValue"
                                        type="datetime-local"
                                        dense
                                        autofocus
                                        :error="validationError"
                                        :error-message="validationErrorMessage"
                                        @blur="saveEdit"
                                        @keyup.enter="saveEdit"
                                        @keyup.escape="cancelEdit"
                                        @input="validateInput"
                                    />
                                </div>
                                <div v-else>
                                    {{ formatDate(props.row.stop) }}
                                </div>
                            </q-td>

                            <q-td
                                key="actions"
                                :props="props"
                            >
                                <q-btn
                                    v-if="canUse"
                                    icon="delete"
                                    flat
                                    round
                                    dense
                                    size="sm"
                                    color="negative"
                                    class="delete-btn"
                                    @click="openDeleteDialog(props.rowIndex, props.row.id)"
                                />
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
            </div>
        </div>
    </div>
</template>

<script>
import AuiOffPeakSpecialDatesDialog from 'src/components/dialog/AuiOffPeakSpecialDatesDialog'
import NegativeConfirmationDialog from 'src/components/dialog/NegativeConfirmationDialog'
export default {
    name: 'AuiOffPeakSpecialDatesTable',
    props: {
        rows: {
            type: Array,
            default: () => []
        }
    },
    emits: ['update-row', 'delete-row', 'add-rows', 'delete-rows'],
    data () {
        return {
            editingCell: null,
            editValue: null,
            originalValue: null,
            validationError: false,
            validationErrorMessage: null,
            filterText: null
        }
    },
    computed: {
        canUse () {
            return this.$aclCan('update', 'entity.billingprofiles')
        },
        columns () {
            return [
                { name: 'id', label: '#', field: 'id', align: 'left', style: 'width: 50px' },
                { name: 'start', label: 'Start Date', field: 'start', align: 'left' },
                { name: 'stop', label: 'End Date', field: 'stop', align: 'left' },
                { name: 'actions', label: '', field: 'actions', align: 'right', style: 'width: 50px' }
            ]
        },
        processedRows () {
            return this.rows.map((row, index) => ({
                ...row,
                id: index
            }))
        },
        filteredRows () {
            if (!this.filterText) {
                return this.processedRows
            }
            const filter = this.filterText.toLowerCase()
            return this.processedRows.filter((row) =>
                Object.values(row).some((value) => {
                    const normalizedValue = String(value).toLowerCase()
                    return normalizedValue.includes(filter)
                })
            )
        }
    },
    methods: {
        editCell (rowIndex, field, originalRowId) {
            const row = this.processedRows[originalRowId]
            this.editingCell = { index: rowIndex, field, id: originalRowId }
            this.originalValue = row[field]
            this.editValue = row[field]
            this.validationError = false
            this.validationErrorMessage = null
        },
        openDialog () {
            this.$q.dialog({
                component: AuiOffPeakSpecialDatesDialog
            }).onOk((updatedRows) => {
                this.$emit('add-rows', updatedRows)
            })
        },
        validateInput () {
            if (!this.editingCell) {
                return
            }

            const currentRow = this.processedRows[this.editingCell.id]
            const newDate = new Date(this.editValue)

            if (this.editingCell.field === 'start') {
                const endDate = new Date(currentRow.stop)
                if (newDate >= endDate) {
                    this.validationError = true
                    this.validationErrorMessage = this.$t('Start date must be prior to end date')
                    return false
                }
            } else if (this.editingCell.field === 'stop') {
                const startDate = new Date(currentRow.start)
                if (newDate <= startDate) {
                    this.validationError = true
                    this.validationErrorMessage = this.$t('End date cannot be prior to start date')
                    return false
                }
            }

            this.validationError = false
            this.validationErrorMessage = null
            return true
        },
        saveEdit () {
            if (!this.validateInput()) {
                return
            }

            const formattedNewValue = this.editValue
            if (this.editingCell && formattedNewValue !== this.originalValue) {
                const updatedRow = { ...this.processedRows[this.editingCell.id] }
                updatedRow[this.editingCell.field] = formattedNewValue

                this.$emit('update-row', {
                    index: this.editingCell.id,
                    row: updatedRow
                })
            }
            this.cancelEdit()
        },
        cancelEdit () {
            this.editingCell = null
            this.editValue = null
            this.originalValue = null
            this.validationError = false
            this.validationErrorMessage = null
        },
        formatDate (dateString) {
            const date = new Date(dateString)
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            const hours = String(date.getHours()).padStart(2, '0')
            const minutes = String(date.getMinutes()).padStart(2, '0')
            const seconds = String(date.getSeconds()).padStart(2, '0')
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        },
        openDeleteAllDialog () {
            return this.$q.dialog({
                component: NegativeConfirmationDialog,
                componentProps: {
                    title: this.$t('Do you want to delete all dates?'),
                    icon: 'delete_sweep',
                    text: this.$t('If you proceed all dates will be deleted. Do you want to continue?'),
                    buttonIcon: 'delete_sweep',
                    buttonLabel: this.$t('Continue')
                }
            }).onOk(() => {
                this.$emit('delete-rows')
            })
        },
        openDeleteDialog (_, rowId) {
            return this.$q.dialog({
                component: NegativeConfirmationDialog,
                componentProps: {
                    title: this.$t('Do you want to delete this date?'),
                    icon: 'delete_forever',
                    text: this.$t('If you proceed this date will be deleted. Do you want to continue?'),
                    buttonIcon: 'delete_forever',
                    buttonLabel: this.$t('Continue')
                }
            }).onOk(() => {
                this.$emit('delete-row', {
                    index: rowId,
                    row: this.processedRows[rowId]
                })
            })
        }
    }
}
</script>
<style scoped>
.delete-btn {
    opacity: 0;
    transition: opacity 0.2s ease;
}
.q-tr:hover .delete-btn {
    opacity: 1;
}
</style>
