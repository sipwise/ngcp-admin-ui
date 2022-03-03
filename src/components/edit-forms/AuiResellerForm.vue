<template>
    <aui-base-form
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template
            #col-1
        >
            <aui-base-form-field
                v-if="resellerIdAcl"
            >
                <aui-select-reseller
                    :value="resellerId"
                    :error="resellerIdError"
                    :error-message="resellerIdErrorMessage"
                    dense
                    @input="$emit('update:reseller-id', $event)"
                />
            </aui-base-form-field>
            <slot
                name="col-1"
            />
        </template>
        <slot />
    </aui-base-form>
</template>
<script>
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiSelectReseller from 'components/AuiSelectReseller'
import AuiBaseFormField from 'components/AuiBaseFormField'
export default {
    name: 'AuiResellerForm',
    components: { AuiBaseFormField, AuiSelectReseller, AuiBaseForm },
    props: {
        resellerIdAcl: {
            type: Boolean,
            default: true
        },
        resellerId: {
            type: [String, Number],
            default: null
        },
        resellerIdError: {
            type: Boolean,
            default: false
        },
        resellerIdErrorMessage: {
            type: String,
            default: null
        }
    },
    computed: {
        isReseller () {
            return this.$store.getters.isReseller
        }
    }
}
</script>
