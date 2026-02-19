<template>
    <div>
        <div class="q-pb-md">
            <q-btn
                class="q-pr-xs"
                flat
                round
                align="around"
                color="primary"
                size="md"
                icon="add"
                @click="addRow"
            />
            <q-btn
                flat
                round
                color="negative"
                size="md"
                icon="delete_sweep"
                @click="deleteAllRows"
            />
        </div>
        <div
            v-for="(row, index) in conditions"
            :key="row._id || index"
            class="row items-center wizard-field-row"
        >
            <aui-base-form-field
                class="col"
                required
            >
                <q-input
                    v-model.trim="row.headerName"
                    clearable
                    outlined
                    :label="$t('Header Name')"
                    :error="hasConditionFieldError(row, 'headerName')"
                    :error-message="getConditionFieldError(row, 'headerName')"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field
                class="col"
                required
            >
                <q-select
                    v-model="row.templateSelection"
                    :options="conditionsOptions"
                    map-options
                    emit-value
                    outlined
                    :label="$t('Condition')"
                    :disable="loading"
                    :error="hasConditionFieldError(row, 'templateSelection')"
                    :error-message="getConditionFieldError(row, 'templateSelection')"
                />
            </aui-base-form-field>
            <aui-base-form-field
                class="col"
                required
            >
                <q-select
                    v-model="row.matchPart"
                    :options="matchPart"
                    map-options
                    emit-value
                    outlined
                    :label="$t('Header Part')"
                    :disable="isConditionMatchPartDisabled(row) || loading"
                    :error="hasConditionFieldError(row, 'matchPart')"
                    :error-message="getConditionFieldError(row, 'matchPart')"
                />
            </aui-base-form-field>
            <aui-base-form-field
                class="col"
            >
                <q-input
                    v-model.trim="row.value"
                    clearable
                    outlined
                    :label="$t('Value')"
                    :error="hasConditionFieldError(row, 'value')"
                    :error-message="getConditionFieldError(row, 'value')"
                    :disable="isConditionValueDisabled(row) || loading"
                />
            </aui-base-form-field>
            <q-btn
                class="col-1-sm q-mb-md q-pr-xs"
                flat
                round
                color="negative"
                size="md"
                icon="delete"
                @click="deleteRow(index)"
            />
        </div>
    </div>
</template>

<script>
import AuiBaseFormField from 'components/AuiBaseFormField'

export default {
    name: 'AuiHeaderManipulationsWizardConditionsEditor',
    components: {
        AuiBaseFormField
    },
    props: {
        conditionsOptions: {
            type: Array,
            default: () => []
        },
        matchPart: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            conditionBuilders: null,
            rowId: 0,
            conditions: []
        }
    },
    mounted () {
        this.conditionBuilders = {
            exist: (headerName) => this.setConditionData(headerName, 'full', 'matches', false, ['*']),
            not_exist: (headerName) => this.setConditionData(headerName, 'full', 'matches', true, ['*']),
            equal: (headerName, matchPart, value) => this.setConditionData(headerName, matchPart, 'is', false, [value]),
            not_equal: (headerName, matchPart, value) => this.setConditionData(headerName, matchPart, 'is', true, [value]),
            start: (headerName, matchPart, value) => this.setConditionData(headerName, matchPart, 'matches', false, [`${value}*`]),
            not_start: (headerName, matchPart, value) => this.setConditionData(headerName, matchPart, 'matches', true, [`${value}*`]),
            contain: (headerName, matchPart, value) => this.setConditionData(headerName, matchPart, 'contains', false, [value]),
            not_contain: (headerName, matchPart, value) => this.setConditionData(headerName, matchPart, 'contains', true, [value]),
            end: (headerName, matchPart, value) => this.setConditionData(headerName, matchPart, 'matches', false, [`*${value}`]),
            not_end: (headerName, matchPart, value) => this.setConditionData(headerName, matchPart, 'matches', true, [`*${value}`]),
            regexp: (headerName, matchPart, value) => this.setConditionData(headerName, matchPart, 'regexp', false, [value])
        }
        this.ensureAtLeastOneRow()
    },
    methods: {
        getEmptyConditionRow () {
            const row = {
                _id: this.rowId + 1,
                headerName: '',
                templateSelection: '',
                matchPart: '',
                value: '',
                _touched: false
            }
            this.rowId = row._id
            return row
        },
        resetConditionRow (row) {
            if (!row) {
                return
            }
            row.headerName = ''
            row.templateSelection = ''
            row.matchPart = ''
            row.value = ''
            row._touched = false
        },
        ensureAtLeastOneRow () {
            if (this.conditions.length === 0) {
                this.conditions.push(this.getEmptyConditionRow())
            }
        },
        validate () {
            if (this.conditions.length === 0) {
                return false
            }
            this.conditions.forEach((condition) => {
                if (condition) {
                    condition._touched = true
                }
            })
            return this.conditions.every((condition) => {
                if (!condition?.headerName || !condition?.templateSelection) {
                    return false
                }
                if (this.isConditionMatchPartDisabled(condition)) {
                    return true
                }
                if (!condition?.matchPart) {
                    return false
                }
                if (!this.isConditionValueDisabled(condition) && !condition?.value) {
                    return false
                }
                return true
            })
        },
        hasConditionFieldError (condition, field) {
            if (!condition?._touched) {
                return false
            }
            if (field === 'headerName') {
                return !condition?.headerName
            }
            if (field === 'templateSelection') {
                return !condition?.templateSelection
            }
            if (field === 'matchPart') {
                if (this.isConditionMatchPartDisabled(condition)) {
                    return false
                }
                return !condition?.matchPart
            }
            if (field === 'value') {
                if (this.isConditionValueDisabled(condition)) {
                    return false
                }
                return !condition?.value
            }
            return false
        },
        getConditionFieldError (condition, field) {
            if (this.hasConditionFieldError(condition, field)) {
                return this.$t('Input is required')
            }
            return ''
        },
        isConditionMatchPartDisabled (condition) {
            return (condition?.templateSelection || '').includes('exist')
        },
        isConditionValueDisabled (condition) {
            return (condition?.templateSelection || '').includes('exist')
        },
        addRow () {
            this.conditions.push(this.getEmptyConditionRow())
        },
        deleteRow (index) {
            if (index === 0 && this.conditions.length === 1) {
                this.resetConditionRow(this.conditions[0])
                return
            }
            this.conditions.splice(index, 1)
            this.ensureAtLeastOneRow()
        },
        deleteAllRows () {
            this.conditions.splice(0, this.conditions.length, this.getEmptyConditionRow())
        },
        buildPayload () {
            const payload = []
            for (const _condition of this.conditions) {
                let condition = {}
                const { headerName, templateSelection, matchPart, value } = _condition
                if (!headerName || !templateSelection) {
                    continue
                }
                if (!templateSelection.includes('exist') && !matchPart) {
                    continue
                }
                if (!this.isConditionValueDisabled(_condition) && !value) {
                    continue
                }
                condition = this.buildConditionFromTemplate(templateSelection, headerName, matchPart, value)
                if (Object.keys(condition).length > 0) {
                    payload.push(condition)
                }
            }
            return payload
        },
        buildConditionFromTemplate (templateSelection, headerName, matchPart, value) {
            const builder = this.conditionBuilders?.[templateSelection]
            if (builder) {
                return builder(headerName, matchPart, value)
            }
            return {}
        },
        setConditionData (headerName, matchPart, expression, negation, values) {
            return {
                match_type: 'header',
                match_name: headerName,
                match_part: matchPart,
                expression,
                expression_negation: negation,
                value_type: 'input',
                values,
                enabled: true,
                rwr_dp: null,
                rwr_set_id: null,
                rule_id: ''
            }
        }
    }
}
</script>
