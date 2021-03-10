<template>
    <span
        class="cursor-pointer"
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
        {{ value }}
        <q-popup-edit
            v-model="internalValue"
            buttons
            :label-set="$t('Save')"
            :validate="validate"
            @save="save"
            @before-show="popupBeforeShowEvent"
        >
            <q-input
                v-model="internalValue"
                dense
                autofocus
                clearable
                :label="column.label"
                :error="error"
                :error-message="errorMessage"
                :disable="$attrs.disable"
                @clear="clear"
            >
                <template
                    v-if="column.componentIcon"
                    v-slot:prepend
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
export default {
    name: 'AuiDataTableEditInput',
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
        }
    },
    data () {
        return {
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
                return this.$v.internalValue.$error
            } else {
                return false
            }
        },
        errorMessage () {
            if (this.column.componentValidations) {
                const validation = this.column.componentValidations.find(validation =>
                    this.$v.internalValue[validation.name] === false
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
            this.$v.$reset()
            this.internalValue = this.value
        },
        validate () {
            if (this.column.componentValidations) {
                this.$v.$touch()
                return !this.$v.$invalid
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
            this.$v.$reset()
        }
    }
}
</script>
