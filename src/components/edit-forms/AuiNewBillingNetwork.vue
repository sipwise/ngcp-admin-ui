<template>
    <aui-reseller-form
        layout="6"
        dense-list
        :reseller="reseller"
        :reseller-id-acl="resellerIdAcl && !resellerId"
        :reseller-id="formData.reseller_id"
        :reseller-id-error="resellerIdHasError"
        :reseller-id-error-message="resellerIdGetError"
        @update:model-value="resellerIdUpdate"
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
                    :label="$t('Billing Network Name')"
                    data-cy="billingnetworks-name"
                    :disable="loading"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The name of the billing network.') }}
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
                    data-cy="billingnetworks-description"
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
                :headline="$t('Billing Network Blocks')"
            />
            <aui-base-form-field
                v-for="(block, index) in formData.blocks"
                :key="index"
            >
                <aui-billing-network-block-input
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
                </aui-billing-network-block-input>
            </aui-base-form-field>
            <aui-form-add-button
                :label="$t('Add billing network block')"
                :disable="loading"
                data-cy="billingnetworks-newblock"
                @click="addBlock"
            />
        </template>
    </aui-reseller-form>
</template>

<script>
import {
    helpers,
    maxLength,
    numeric,
    required
} from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiFormAddButton from 'components/AuiFormAddButton'
import AuiFormFieldGroupHeadline from 'components/AuiFormFieldGroupHeadline'
import AuiDeleteButton from 'components/buttons/AuiDeleteButton'
import AuiResellerForm from 'components/edit-forms/AuiResellerForm'
import AuiBillingNetworkBlockInput from 'components/edit-forms/billing-network/AuiBillingNetworkBlockInput'
import resellerFormMixin from 'src/mixins/reseller-form'
import { ip } from 'src/validators/ip'
export default {
    name: 'AuiNewBillingNetwork',
    components: {
        AuiResellerForm,
        AuiFormAddButton,
        AuiDeleteButton,
        AuiBillingNetworkBlockInput,
        AuiFormFieldGroupHeadline,
        AuiBaseFormField
    },
    mixins: [resellerFormMixin],
    props: {
        reseller: {
            type: Object,
            default: null
        },
        resellerId: {
            type: Number,
            default: null
        }
    },
    computed: {
        aclEntity () {
            return 'billingnetworks'
        },
        getDefaultData () {
            return {
                name: null,
                description: null,
                blocks: [{
                    ip: null,
                    mask: null
                }],
                reseller_id: this.resellerId
            }
        }
    },
    methods: {
        getValidations () {
            return {
                reseller_id: {
                    required
                },
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
                            ip
                        },
                        mask: {
                            maxLength: maxLength(3),
                            numeric,
                            isValidMask (value, blockValue) {
                                if (value === null) {
                                    return true
                                }
                                const ipMask = `${blockValue.ip}/${blockValue.mask}`
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
