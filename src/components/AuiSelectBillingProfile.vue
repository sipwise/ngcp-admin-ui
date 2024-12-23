<template>
    <aui-select-lazy
        v-model="id"
        :label="$t('Billing Profile')"
        store-generator-name="selectLazy/billingProfilesList"
        :initial-option="initialOption"
        dense
        :error="v$.id.$errors.length > 0"
        :error-message="$errMsg(v$.id.$errors)"
        :load-initially="false"
        @input-data="$emit('billingProfileSelected', {value: id, index: index})"
    >
        <template
            v-for="(_, slotName) of $slots"
            #[slotName]="scope"
        >
            <slot
                :name="slotName"
                v-bind="scope"
            />
        </template>
    </aui-select-lazy>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
    name: 'AuiSelectBillingProfile',
    components: {
        AuiSelectLazy
    },
    props: {
        index: {
            type: Number,
            default: undefined
        },
        initialOption: {
            type: Object,
            default: null
        },
        initialValue: {
            type: Number,
            default: null
        }
    },
    emits: ['billingProfileSelected'],
    data () {
        return {
            v$: useValidate(),
            id: null
        }
    },
    validations () {
        return {
            id: {
                required
            }
        }
    },
    mounted () {
        if (this.initialValue) {
            this.id = this.initialValue
        }
    },
    methods: {
        touch () {
            this.v$.$touch()
        }
    }
}
</script>
