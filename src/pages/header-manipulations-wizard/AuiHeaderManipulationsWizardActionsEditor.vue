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
                :disable="loading"
                :loading="loading"
                @click="addRow"
            />
            <span
                v-if="loading && !error"
                class="text-caption text-grey-7 q-ml-sm"
            >
                {{ $t('Working our magic…') }}
            </span>
            <span
                v-if="loading && error"
                class="text-caption text-grey-7 q-ml-sm"
            >
                {{ $t('Rolling back changes…') }}
            </span>
            <q-btn
                v-if="!loading"
                flat
                round
                color="negative"
                size="md"
                icon="delete_sweep"
                @click="deleteAllRows"
            />
        </div>
        <div
            v-for="(row, index) in actions"
            :key="row._id || index"
            class="row items-center wizard-field-row"
        >
            <aui-base-form-field
                class="col"
                required
            >
                <q-select
                    v-model="row.templateSelection"
                    :options="actionsOptions"
                    map-options
                    emit-value
                    outlined
                    :label="$t('Action')"
                    :disable="loading"
                    :error="hasActionFieldError(row, 'templateSelection')"
                    :error-message="getActionFieldError(row, 'templateSelection')"
                />
            </aui-base-form-field>
            <aui-base-form-field
                class="col"
                required
            >
                <q-input
                    v-model.trim="row.headerName"
                    clearable
                    outlined
                    :label="$t('Header Name')"
                    :error="hasActionFieldError(row, 'headerName')"
                    :error-message="getActionFieldError(row, 'headerName')"
                    :disable="isActionNameDisabled(row) || loading"
                />
            </aui-base-form-field>
            <aui-base-form-field
                class="col"
                required
            >
                <q-select
                    v-model="row.headerPart"
                    :options="headerPart"
                    map-options
                    emit-value
                    outlined
                    :label="$t('Header Part')"
                    :disable="isActionHeaderPartDisabled(row) || loading"
                    :error="hasActionFieldError(row, 'headerPart')"
                    :error-message="getActionFieldError(row, 'headerPart')"
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
                    :error="hasActionFieldError(row, 'value')"
                    :error-message="getActionFieldError(row, 'value')"
                    :disable="isActionValueDisabled(row) || loading"
                />
            </aui-base-form-field>
            <q-btn
                class="col-1-sm q-mb-md q-pr-xs"
                flat
                round
                color="negative"
                size="md"
                icon="delete"
                :disable="loading"
                @click="deleteRow(index)"
            />
        </div>
    </div>
</template>

<script>
import AuiBaseFormField from 'components/AuiBaseFormField'

export default {
    name: 'AuiHeaderManipulationsWizardActionsEditor',
    components: {
        AuiBaseFormField
    },
    props: {
        actionsOptions: {
            type: Array,
            default: () => []
        },
        headerPart: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            actionBuilders: null,
            rowId: 0,
            actions: []
        }
    },
    mounted () {
        this.actionBuilders = {
            add: (headerName, _headerPart, value) => this.setActionData(headerName, 'full', value, 'full', 'add'),
            set: (headerName, headerPart, value) => this.setActionData(headerName, headerPart, value, 'full', 'set'),
            copy: (headerName, headerPart, value) => this.setActionData(value, headerPart, headerName, headerPart, 'header'),
            drop: (headerName) => this.setActionData(headerName, 'full', '', 'full', 'remove'),
            add_prefix: (headerName, headerPart, value) => this.setActionData(headerName, headerPart, `^(.*)$;${value}$1`, 'full', 'rsub'),
            remove_prefix: (headerName, headerPart, value) => this.setActionData(headerName, headerPart, `^(${value})(.*)$;$2`, 'full', 'rsub'),
            add_suffix: (headerName, headerPart, value) => this.setActionData(headerName, headerPart, `^(.*)$;$1${value}`, 'full', 'rsub'),
            remove_suffix: (headerName, headerPart, value) => this.setActionData(headerName, headerPart, `^(.*)(${value})$;$1`, 'full', 'rsub'),
            reject_call_with_code: (_headerName, _headerPart, value) => this.setActionData('$avp(s:hm_reject)', 'full', value, 'full', 'set')
        }
        this.ensureAtLeastOneRow()
    },
    methods: {
        getEmptyActionRow () {
            const row = {
                _id: this.rowId + 1,
                headerName: '',
                templateSelection: '',
                headerPart: '',
                value: '',
                _touched: false
            }
            this.rowId = row._id
            return row
        },
        resetActionRow (row) {
            if (!row) {
                return
            }
            row.headerName = ''
            row.templateSelection = ''
            row.headerPart = ''
            row.value = ''
            row._touched = false
        },
        ensureAtLeastOneRow () {
            if (this.actions.length === 0) {
                this.actions.push(this.getEmptyActionRow())
            }
        },
        validate () {
            if (this.actions.length === 0) {
                return false
            }
            this.actions.forEach((action) => {
                if (action) {
                    action._touched = true
                }
            })
            return this.actions.every((action) => {
                if (!action?.templateSelection) {
                    return false
                }
                if (!this.isActionNameDisabled(action) && !action?.headerName) {
                    return false
                }
                if (!this.isActionHeaderPartDisabled(action) && !action?.headerPart) {
                    return false
                }
                if (!this.isActionValueDisabled(action) && !action?.value) {
                    return false
                }
                return true
            })
        },
        hasActionFieldError (action, field) {
            if (!action?._touched) {
                return false
            }
            if (field === 'templateSelection') {
                return !action?.templateSelection
            }
            if (field === 'headerName') {
                if (this.isActionNameDisabled(action)) {
                    return false
                }
                return !action?.headerName
            }
            if (field === 'headerPart') {
                if (this.isActionHeaderPartDisabled(action)) {
                    return false
                }
                return !action?.headerPart
            }
            if (field === 'value') {
                if (this.isActionValueDisabled(action)) {
                    return false
                }
                return !action?.value
            }
            return false
        },
        getActionFieldError (action, field) {
            if (this.hasActionFieldError(action, field)) {
                return this.$t('Input is required')
            }
            return ''
        },
        isActionHeaderPartDisabled (action) {
            const type = action?.templateSelection || ''
            return type === 'add' || type === 'drop' || type === 'reject_call_with_code'
        },
        isActionNameDisabled (action) {
            return (action?.templateSelection || '') === 'reject_call_with_code'
        },
        isActionValueDisabled (action) {
            return (action?.templateSelection || '') === 'drop'
        },
        addRow () {
            this.actions.push(this.getEmptyActionRow())
        },
        deleteRow (index) {
            if (index === 0 && this.actions.length === 1) {
                this.resetActionRow(this.actions[0])
                return
            }
            this.actions.splice(index, 1)
            this.ensureAtLeastOneRow()
        },
        deleteAllRows () {
            this.actions.splice(0, this.actions.length, this.getEmptyActionRow())
        },
        buildPayload () {
            const payload = []
            for (const [index, _actions] of this.actions.entries()) {
                let action = {}
                const { headerName, templateSelection, headerPart, value } = _actions
                if (!templateSelection) {
                    continue
                }
                if (!this.isActionNameDisabled(_actions) && !headerName) {
                    continue
                }
                if (!this.isActionHeaderPartDisabled(_actions) && !headerPart) {
                    continue
                }
                if (!this.isActionValueDisabled(_actions) && !value) {
                    continue
                }
                action = this.buildActionFromTemplate(templateSelection, headerName, headerPart, value)
                if (Object.keys(action).length > 0) {
                    action.priority = index
                    payload.push(action)
                }
            }
            return payload
        },
        buildActionFromTemplate (templateSelection, headerName, headerPart, value) {
            const builder = this.actionBuilders?.[templateSelection]
            if (builder) {
                return builder(headerName, headerPart, value)
            }
            return {}
        },
        setActionData (headerName, headerPart, value, valuePart, actionType) {
            return {
                action_type: actionType,
                enabled: true,
                header: headerName,
                header_part: headerPart,
                priority: 0,
                rwr_dp: null,
                rwr_set_id: null,
                value,
                value_part: valuePart
            }
        }
    }
}
</script>
