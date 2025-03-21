<template>
    <div>
        <q-input
            ref="input"
            v-model="input"
            :error="v$.input && v$.input.$errors.length > 0"
            :error-message="$errMsg(v$.input?.$errors)"
            v-bind="$attrs"
            clearable
            hide-bottom-space
            @keyup.enter="add(input)"
            @clear="clearInput"
            @blur="blurInput"
        >
            <template
                #append
            >
                <q-btn
                    v-if="input !== undefined && input !== null && input !== ''"
                    icon="add"
                    color="primary"
                    :label="$t('Add')"
                    data-cy="chip-add"
                    size="sm"
                    flat
                    dense
                    @click="add(input)"
                />
                <q-btn
                    v-if="(input === undefined || input === null || input === '') && items && items.length > 0"
                    icon="delete"
                    color="negative"
                    size="sm"
                    flat
                    dense
                    :label="$t('Remove all')"
                    data-cy="chip-removeall"
                    @click="removeAll"
                />
            </template>
        </q-input>
        <div
            v-if="items && items.length > 0"
        >
            <q-chip
                v-for="(item, index) in items"
                :key="getItemKey(item, index)"
                :label="item.label"
                :removable="!$attrs.disable"
                :dense="$attrs.dense"
                :disable="$attrs.loading || $attrs.disable"
                @remove="remove(item)"
            />
        </div>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
export default {
    name: 'AuiInputChips',
    props: {
        value: {
            type: Array,
            default: () => []
        },
        validation: {
            type: Object,
            default: undefined
        },
        emitArray: {
            type: Boolean,
            default: false
        }
    },
    emits: ['input'],
    data () {
        return {
            v$: useValidate(),
            input: '',
            items: []
        }
    },
    computed: {
        itemsAsArray () {
            const items = []
            if (this.items) {
                this.items.forEach((item) => {
                    items.push(item.value)
                })
            }
            return items
        }
    },
    validations () {
        if (this.validation) {
            return {
                input: this.validation
            }
        }
        return {}
    },
    watch: {
        value (newItems) {
            this.assignItems(newItems)
        }
    },
    mounted () {
        this.assignItems(this.value)
        this.resetInput()
    },
    methods: {
        removeAll () {
            if (this.items && this.items.length > 0) {
                this.$emit('input', [])
            }
        },
        remove (removable) {
            const newItems = this.items.filter((item) => item.value !== removable.value)
            let newItemsFinal = []
            if (this.emitArray) {
                newItemsFinal = newItems.map((item) => item.value)
            } else {
                newItemsFinal = newItems
            }
            this.$emit('input', newItemsFinal)
        },
        add (value) {
            let isValid = true
            if (this.v$.input) {
                this.v$.input.$touch()
                isValid = !this.v$.input.$error
            }
            if (isValid) {
                const exists = this.items.find((item) => item.value === value)
                if (value !== undefined && value !== null && value !== '' && !exists) {
                    this.resetInput()
                    this.input = ''
                    const newItems = [...this.items]
                    newItems.push({
                        value,
                        label: value
                    })
                    let newItemsFinal = []
                    if (this.emitArray) {
                        newItemsFinal = newItems.map((item) => item.value)
                    } else {
                        newItemsFinal = newItems
                    }
                    this.$emit('input', newItemsFinal)
                }
            }
        },
        assignItems (newItems) {
            if (newItems && this.emitArray === true) {
                this.items = []
                newItems.forEach((value) => {
                    this.items.push({
                        value,
                        label: value
                    })
                })
            } else {
                this.items = newItems
            }
        },
        clearInput () {
            this.resetInput()
            this.$refs.input.blur()
        },
        resetInput () {
            if (this.v$.input) {
                this.v$.input.$reset()
            }
        },
        blurInput () {
            if (this.input === undefined || this.input === null || this.input === '') {
                this.resetInput()
            }
        },
        getItemKey (item, index) {
            return `${String(item.value)}-${String(index)}`
        }
    }
}
</script>
