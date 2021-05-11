<template>
    <aui-select-lazy
        v-model="id"
        :label="$t('Billing Profile')"
        store-generator-name="selectLazy/billingProfilesList"
        :initial-option="initialOption"
        dense
        :error="$v.id.$error"
        :error-message="$errMsg($v.id)"
        :load-initially="false"
        @input="$emit('billingProfileSelected', {value: id, index: index})"
    />
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
import { required } from 'vuelidate/lib/validators'
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
    data () {
        return {
            id: null
        }
    },
    validations: {
        id: {
            required
        }
    },
    mounted () {
        if (this.initialValue) {
            this.id = this.initialValue
        }
    },
    methods: {
        touch () {
            this.$v.$touch()
        }
    }
}
</script>
