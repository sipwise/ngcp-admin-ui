<template>
    <aui-base-form
        v-bind="$attrs"
    >
        <template
            #col-1
        >
            <aui-base-form-field
                v-if="resellerIdAcl && !isEditMode"
            >
                <aui-select-reseller
                    :model-value="resellerId"
                    :error="resellerIdError"
                    :error-message="resellerIdErrorMessage"
                    :initial-option="initialOption"
                    :class="requiredReseller"
                    dense
                    @update:modelValue="$emit('update:modelValue', $event)"
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
        <template
            #col-2
        >
            <slot
                name="col-2"
            />
        </template>
        <slot />
    </aui-base-form>
</template>
<script>
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectReseller from 'components/AuiSelectReseller'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
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
        },
        requiredReseller: {
            type: String,
            default: 'aui-required'
        },
        isEditMode: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    computed: {
        initialOption () {
            if (this.reseller) {
                return {
                    value: this.reseller.id,
                    label: this.reseller.name
                }
            }
            return null
        }
    }
}
</script>
