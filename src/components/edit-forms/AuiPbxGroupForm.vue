<template>
    <aui-base-form
        layout="6"
        dense-list
    >
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <template
            #col-1
        >
            <aui-base-form-field>
                <q-input
                    :value="$t('PBX Group')"
                    :label="$t('Type')"
                    readonly
                    dense
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('display_name')"
                :required="true"
            >
                <q-input
                    v-model.trim="formData.display_name"
                    :error="hasFieldError('display_name')"
                    :error-message="getFieldError('display_name')"
                    dense
                    :label="$t('Name')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('pbx_extension')"
                :required="true"
            >
                <q-input
                    v-model.trim="formData.pbx_extension"
                    :error="hasFieldError('pbx_extension')"
                    :error-message="getFieldError('pbx_extension')"
                    dense
                    :label="$t('PBX Extension')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('pbx_hunt_policy')"
            >
                <q-select
                    v-model.trim="formData.pbx_hunt_policy"
                    :options="pbxHuntPolicyOptions"
                    dense
                    :label="$t('PBX Hunt Policy')"
                    emit-value
                    map-options
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('pbx_hunt_timeout')"
            >
                <q-input
                    v-model.trim="formData.pbx_hunt_timeout"
                    :error="hasFieldError('pbx_hunt_timeout')"
                    :error-message="getFieldError('pbx_hunt_timeout')"
                    dense
                    :label="$t('PBX Hunt Timeout')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>
<script>
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import baseFormMixin from 'src/mixins/base-form'
export default {
    components: {
        AuiBaseFormField,
        AuiBaseForm
    },
    mixins: [baseFormMixin],
    props: {
        pbxHuntPolicyOptions: {
            type: Array,
            default () {
                return []
            }
        }
    },
    computed: {
        aclEntity () {
            return 'subscribers'
        },
        getDefaultData () {
            return {
                display_name: '',
                pbx_extension: ''
            }
        }
    },
    methods: {

    }
}
</script>
