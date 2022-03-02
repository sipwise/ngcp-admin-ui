<template>
    <aui-base-form>
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <div
            class="row"
        >
            <div
                class="col-md-6 col-xs-12"
            >
                <q-list>
                    <q-item>
                        <q-item-section>
                            <aui-select-reseller
                                v-model="formData.reseller_id"
                                dense
                                class="aui-required"
                                :error="$v.formData.reseller_id.$error"
                                :error-message="$errMsg($v.formData.reseller_id)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @blur="$v.formData.reseller_id.$touch()"
                            >
                                <template
                                    #after
                                >
                                    <aui-create-reseller-button
                                        :form-data="formData"
                                    />
                                </template>
                            </aui-select-reseller>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                ref="domainInput"
                                v-model.trim="formData.domain"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Domain')"
                                data-cy="domain-name"
                                :error="$v.formData.domain.$error"
                                :error-message="$errMsg($v.formData.domain)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @blur="$v.formData.domain.$touch()"
                                @keyup.enter="submit"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </aui-base-form>
</template>

<script>
import {
    required,
    or,
    ipAddress
} from 'vuelidate/lib/validators'
import AuiSelectReseller from 'components/AuiSelectReseller'
import { isFQDN } from 'boot/vuelidate'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import AuiCreateResellerButton from 'components/buttons/AuiCreateResellerButton'
export default {
    name: 'AuiNewDomain',
    components: {
        AuiCreateResellerButton,
        AuiBaseForm,
        AuiSelectReseller
    },
    mixins: [baseFormMixin],
    validations: {
        formData: {
            reseller_id: {
                required
            },
            domain: {
                required,
                domainOrIP: or(isFQDN, ipAddress)
            }
        }
    },
    computed: {
        getInitialData () {
            if (this.initialFormData) {
                return {
                    reseller_id: this.initialFormData.reseller_id,
                    domain: this.initialFormData.domain
                }
            } else {
                return {
                    reseller_id: null,
                    domain: ''
                }
            }
        }
    }
}
</script>
