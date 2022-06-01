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
                required
            >
                <aui-select-reseller
                    :value="resellerId"
                    :error="resellerIdError"
                    :error-message="resellerIdErrorMessage"
                    :initial-option="initialOption"
                    dense
                    @input="$emit('update:reseller-id', $event)"
                >
                    <template
                        #after
                    >
                        <slot
                            name="reseller-id-after"
                        />
                    </template>
                </aui-select-reseller>
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
        reseller: {
            type: Object,
            default: undefined
        },
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
        initialOption () {
            if (this.reseller) {
                return {
                    value: this.reseller.id,
                    label: this.reseller.name
                }
            } else {
                return null
            }
        }
    }
}
</script>
