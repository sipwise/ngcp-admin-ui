<template>
    <aui-base-form
        layout="4-4-4"
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
                v-if="hasReseller && aclField('reseller_id')"
                required
            >
                <aui-select-reseller
                    v-model="formData.reseller_id"
                    class="fit"
                    dense
                    :initial-option="initialResellerOption"
                    :error="hasFieldError('reseller_id')"
                    :error-message="getFieldError('reseller_id')"
                    :disable="loading"
                >
                    <template
                        #after
                    >
                        <aui-create-reseller-button
                            :form-data="formData"
                        />
                    </template>
                </aui-select-reseller>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.firstname"
                    clearable
                    dense
                    :label="$t('First Name')"
                    data-cy="firstname-field"
                    :disable="loading"
                    :error="false"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The given name of the contact.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.lastname"
                    clearable
                    dense
                    :label="$t('Last Name')"
                    data-cy="lastname-field"
                    :error="false"
                    :disable="loading"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The surname of the contact.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.email"
                    clearable
                    dense
                    :label="$t('Email')"
                    data-cy="email-field"
                    :error="hasFieldError('email')"
                    :error-message="getFieldError('email')"
                    :disable="loading"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The email address of the contact.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.company"
                    clearable
                    dense
                    :label="$t('Company')"
                    data-cy="company-field"
                    :disable="loading"
                    :error="false"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The company name of the contact.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.street"
                    clearable
                    dense
                    :label="$t('Street')"
                    data-cy="street-field"
                    :disable="loading"
                    :error="false"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The street name of the contact.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.postcode"
                    clearable
                    dense
                    :label="$t('Postcode')"
                    data-cy="postcode-field"
                    :disable="loading"
                    :error="false"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The postal code of the contact.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.city"
                    clearable
                    dense
                    :label="$t('City')"
                    data-cy="city-field"
                    :disable="loading"
                    :error="false"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The city name of the contact.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-selection-country
                    v-model="formData.country"
                    :load-initially="!!formData.country"
                    :disable="loading"
                    :error="false"
                    dense
                />
            </aui-base-form-field>
        </template>
        <template
            #col-2
        >
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.iban"
                    clearable
                    dense
                    :error="hasFieldError('iban')"
                    :error-message="getFieldError('iban')"
                    :disable="loading"
                    :label="$t('IBAN')"
                    data-cy="iban-field"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The IBAN (International Bank Account Number) of the contact bank details.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.bic"
                    clearable
                    dense
                    :label="$t('BIC/SWIFT')"
                    data-cy="bic-swift-field"
                    :error="v$.formData.bic.$errors.length > 0"
                    :error-message="$errMsg(v$.formData.bic.$errors)"
                    :disable="loading"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The BIC (Business Identifier Code) of the contact bank details.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.bankname"
                    clearable
                    dense
                    :disable="loading"
                    :label="$t('Bank Name')"
                    data-cy="bank-name-field"
                    :error="false"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The bank name of the contact bank details.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.vatnum"
                    clearable
                    dense
                    :disable="loading"
                    :label="$t('VAT Number')"
                    data-cy="vat-number-field"
                    :error="false"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The VAT number of the contact.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.comregnum"
                    clearable
                    dense
                    :disable="loading"
                    :label="$t('Company Reg. Number')"
                    data-cy="company-reg-num-field"
                    :error="false"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The company registration number of the contact.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.phonenumber"
                    clearable
                    dense
                    :disable="loading"
                    :label="$t('Phone Number')"
                    data-cy="phone-num-field"
                    :error="false"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The phone number of the contact.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.mobilenumber"
                    clearable
                    dense
                    :disable="loading"
                    :label="$t('Mobile Number')"
                    data-cy="mobile-num-field"
                    :error="false"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The mobile number of the contact.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.faxnumber"
                    clearable
                    dense
                    :disable="loading"
                    :label="$t('Fax Number')"
                    data-cy="fax-num-field"
                    :error="false"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The fax number of the contact.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-selection-timezone
                    v-model="formData.timezone"
                    dense
                    :error="false"
                    :disable="loading"
                />
            </aui-base-form-field>
        </template>
        <template
            #col-3
        >
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.gpp0"
                    clearable
                    dense
                    :error="false"
                    :disable="loading"
                    :label="$t('General Purpose 0')"
                    data-cy="gp0-field"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('A general purpose field for free use.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.gpp1"
                    clearable
                    dense
                    :error="false"
                    :disable="loading"
                    :label="$t('General Purpose 1')"
                    data-cy="gp1-field"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('A general purpose field for free use.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.gpp2"
                    clearable
                    dense
                    :error="false"
                    :disable="loading"
                    :label="$t('General Purpose 2')"
                    data-cy="gp2-field"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('A general purpose field for free use.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.gpp3"
                    clearable
                    dense
                    :error="false"
                    :disable="loading"
                    :label="$t('General Purpose 3')"
                    data-cy="gp3-field"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('A general purpose field for free use.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.gpp4"
                    clearable
                    dense
                    :error="false"
                    :disable="loading"
                    :label="$t('General Purpose 4')"
                    data-cy="gp4-field"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('A general purpose field for free use.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.gpp5"
                    clearable
                    dense
                    :error="false"
                    :disable="loading"
                    :label="$t('General Purpose 5')"
                    data-cy="gp5-field"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('A general purpose field for free use.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.gpp6"
                    clearable
                    dense
                    :error="false"
                    :disable="loading"
                    :label="$t('General Purpose 6')"
                    data-cy="gp6-field"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('A general purpose field for free use.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.gpp7"
                    clearable
                    dense
                    :error="false"
                    :disable="loading"
                    :label="$t('General Purpose 7')"
                    data-cy="gp7-field"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('A general purpose field for free use.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.gpp8"
                    clearable
                    dense
                    :error="false"
                    :disable="loading"
                    :label="$t('General Purpose 8')"
                    data-cy="gp8-field"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('A general purpose field for free use.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.gpp9"
                    clearable
                    dense
                    :error="false"
                    :disable="loading"
                    :label="$t('General Purpose 9')"
                    data-cy="gp9-field"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('A general purpose field for free use.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    email,
    required
} from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectReseller from 'components/AuiSelectReseller'
import AuiSelectionCountry from 'components/AuiSelectionCountry'
import AuiSelectionTimezone from 'components/AuiSelectionTimezone'
import AuiCreateResellerButton from 'components/buttons/AuiCreateResellerButton'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import { resellerLabel } from 'src/filters/resource'
import baseFormMixin from 'src/mixins/base-form'
import {
    isBIC,
    isIBAN
} from 'src/validators/common'
export default {
    name: 'AuiNewContact',
    components: {
        AuiCreateResellerButton,
        AuiBaseFormField,
        AuiBaseForm,
        AuiSelectReseller,
        AuiSelectionCountry,
        AuiSelectionTimezone
    },
    mixins: [baseFormMixin],
    props: {
        reseller: {
            type: Object,
            default: null
        },
        hasReseller: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            v$: useValidate()
        }
    },
    computed: {
        aclEntity () {
            return 'customercontacts'
        },
        initialResellerOption () {
            return this.reseller
                ? {
                    label: resellerLabel(this.reseller),
                    value: this.reseller.id
                }
                : null
        },
        getDefaultData () {
            return {
                ...(this.hasReseller
                    ? { reseller_id: null }
                    : {}
                ),
                firstname: '',
                lastname: '',
                email: '',
                company: '',
                street: '',
                postcode: '',
                city: '',
                country: null,
                iban: '',
                bic: '',
                bankname: '',
                vatnum: '',
                comregnum: '',
                phonenumber: '',
                mobilenumber: '',
                faxnumber: '',
                timezone: null,
                gpp0: '',
                gpp1: '',
                gpp2: '',
                gpp3: '',
                gpp4: '',
                gpp5: '',
                gpp6: '',
                gpp7: '',
                gpp8: '',
                gpp9: ''
            }
        }
    },
    methods: {
        getValidations () {
            let conditionalValidations = {}
            if (this.hasReseller) {
                conditionalValidations = {
                    reseller_id: {
                        required
                    }
                }
            }
            return {
                email: {
                    required,
                    email
                },
                iban: {
                    isIBAN
                },
                bic: {
                    isBIC
                },
                ...conditionalValidations
            }
        }
    }
}
</script>
