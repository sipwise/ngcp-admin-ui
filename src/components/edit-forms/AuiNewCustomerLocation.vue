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
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.name"
                    dense
                    clearable
                    :label="$t('Location Name')"
                    data-cy="location-name"
                    :disable="loading"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('Name of the location') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.description"
                    dense
                    clearable
                    :label="$t('Description')"
                    data-cy="location-description"
                    :disable="loading"
                    :error="hasFieldError('description')"
                    :error-message="getFieldError('description')"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('Arbitrary text.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-form-field-group-headline
                :headline="$t('Location Block')"
            />
            <aui-base-form-field
                v-for="(block, index) in formData.blocks"
                :key="index"
            >
                <aui-location-block-input
                    dense
                    clearable
                    :ip="block.ip"
                    :mask="block.mask"
                    :error-ip="v$.$error && v$.formData.blocks.$each.$response.$errors[index].ip.length > 0"
                    :error-message-ip="$errMsg(v$.formData.blocks.$each.$response.$errors[index].ip)"
                    :error-mask="v$.$error && v$.formData.blocks.$each.$response.$errors[index].mask.length > 0"
                    :error-message-mask="$errMsg(v$.formData.blocks.$each.$response.$errors[index].mask)"
                    :disable="loading"
                    @update:ip="formData.blocks[index].ip = $event"
                    @update:mask="formData.blocks[index].mask = $event"
                >
                    <template
                        #append
                    >
                        <aui-delete-button
                            :show-label="false"
                            dense
                            :disable="loading || formData.blocks.length <= 1"
                            @click="deleteBlock(index)"
                        />
                    </template>
                </aui-location-block-input>
            </aui-base-form-field>
            <aui-form-add-button
                :label="$t('Add another location block')"
                :disable="loading"
                @click="addBlock"
            />
        </template>
    </aui-base-form>
</template>

<script>
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import baseFormMixin from 'src/mixins/base-form'
import useValidate from '@vuelidate/core'
import { ip } from 'src/validators/ip'
import {
    required,
    numeric,
    maxLength,
    helpers
} from '@vuelidate/validators'
import AuiFormFieldGroupHeadline from 'components/AuiFormFieldGroupHeadline'
import AuiLocationBlockInput from 'components/edit-forms/location/AuiLocationBlockInput'
import AuiFormAddButton from 'components/AuiFormAddButton'
import AuiDeleteButton from 'components/buttons/AuiDeleteButton'
export default {
    name: 'AuiNewCustomerLocation',
    components: {
        AuiFormAddButton,
        AuiDeleteButton,
        AuiLocationBlockInput,
        AuiFormFieldGroupHeadline,
        AuiBaseForm,
        AuiBaseFormField
    },
    mixins: [baseFormMixin],
    data () {
        return {
            v$: useValidate()
        }
    },
    computed: {
        getDefaultData () {
            return {
                name: null,
                description: null,
                blocks: [{
                    ip: null,
                    mask: null
                }]
            }
        }
    },
    methods: {
        getValidations () {
            return {
                name: {
                    required
                },
                description: {
                    required
                },
                blocks: {
                    $each: helpers.forEach({
                        ip: {
                            required,
                            ip: ip
                        },
                        mask: {
                            maxLength: maxLength(3),
                            numeric,
                            isValidMask (value, blockValue) {
                                if (value === null) {
                                    return true
                                }
                                const ipMask = blockValue.ip + '/' + blockValue.mask
                                return ip(ipMask)
                            }
                        }
                    })
                }
            }
        },
        addBlock () {
            this.formData.blocks.push({
                ip: null,
                mask: null
            })
        },
        deleteBlock (index) {
            this.formData.blocks.splice(index, 1)
        }
    }
}
</script>
