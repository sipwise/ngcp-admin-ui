<template>
    <span
        :class="$attrs.disable ? 'cursor-not-allowed' : 'cursor-pointer'"
    >
        <template
            v-if="value === '' || value === undefined || value === null"
        >
            <q-btn
                icon="add"
                dense
                flat
                size="sm"
                :disable="$attrs.disable"
            />
        </template>
        <aui-data-table-highlighted-text
            :highlighted="highlighted"
            :highlighted-text="value"
            :search-term="searchTerm"
        />
        <q-popup-edit
            v-if="!$attrs.disable"
            v-slot="scope"
            v-model="internalValue"
            buttons
            :label-set="$t('Save')"
            :validate="validate"
            @save="save"
            @cancel="internalValue = value"
            @before-show="popupBeforeShowEvent"
        >
            <q-input
                v-model="scope.value"
                dense
                autofocus
                clearable
                :label="column.label"
                data-cy="aui-data-table-edit-input--popup"
                :error="error"
                :error-message="errorMessage"
                :disable="$attrs.disable"
                @update:modelValue="internalValue = scope.value"
                @keyup.enter="scope.set"
                @clear="clear"
            >
                <template
                    v-if="column.componentIcon"
                    #prepend
                >
                    <q-icon
                        :name="column.componentIcon"
                    />
                </template>
            </q-input>
        </q-popup-edit>
    </span>
</template>

<script>
import useValidate from '@vuelidate/core'
import AuiDataTableHighlightedText from 'components/data-table/AuiDataTableHighlightedText'
export default {
    name: 'AuiDataTableEditInput',
    components: { AuiDataTableHighlightedText },
    props: {
        column: {
            type: Object,
            required: true
        },
        row: {
            type: Object,
            required: true
        },
        value: {
            type: [String, Number],
            default: undefined
        },
        highlighted: {
            type: Boolean,
            default: false
        },
        searchTerm: {
            type: String,
            default: undefined
        }
    },
    emits: ['save'],
    data () {
        return {
            v$: useValidate(),
            internalValue: this.value
        }
    },
    validations () {
        const config = {}
        if (this.column.componentValidations) {
            config.internalValue = {}
            this.column.componentValidations.forEach((validation) => {
                config.internalValue[validation.name] = validation.validator
            })
        }
        return config
    },
    computed: {
        error () {
            if (this.column.componentValidations) {
                return this.v$.internalValue.$errors.length > 0
            } else {
                return false
            }
        },
        errorMessage () {
            if (this.column.componentValidations) {
                const validation = this.column.componentValidations.find(validation =>
                    this.v$.internalValue[validation.name] === false
                )
                if (validation) {
                    return validation.error
                } else {
                    return undefined
                }
            } else {
                return undefined
            }
        }
    },
    watch: {
        value (value) {
            this.internalValue = value
        }
    },
    mounted () {
        this.internalValue = this.value
    },
    methods: {
        popupBeforeShowEvent () {
            this.v$.$reset()
            this.internalValue = this.value
        },
        validate () {
            if (this.column.componentValidations) {
                this.v$.$touch()
                return !this.v$.$invalid
            } else {
                return true
            }
        },
        save () {
            this.$emit('save', {
                column: this.column,
                row: this.row,
                value: this.internalValue
            })
        },
        clear () {
            this.v$.$reset()
        }
    }
}
</script>
