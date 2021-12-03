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
                class="col-md-4 col-xs-12"
            >
                <q-list>
                    <q-item
                        v-if="hasReseller"
                    >
                        <q-item-section>
                            <aui-select-reseller
                                v-model="formData.reseller_id"
                                dense
                                class="aui-required"
                                :initial-option="initialResellerOption"
                                :error="$v.formData.reseller_id.$error"
                                :error-message="$errMsg($v.formData.reseller_id)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @blur="$v.formData.reseller_id.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.firstname"
                                clearable
                                dense
                                :label="$t('First Name')"
                                data-cy="firstname-field"
                                :disable="loading"
                                :error="false"
                                :hide-bottom-space="true"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The given name of the contact.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.lastname"
                                clearable
                                dense
                                :label="$t('Last Name')"
                                data-cy="lastname-field"
                                :disable="loading"
                                :error="false"
                                :hide-bottom-space="true"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The surname of the contact.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.email"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Email')"
                                data-cy="email-field"
                                :error="$v.formData.email.$error"
                                :error-message="$errMsg($v.formData.email)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The email address of the contact.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.company"
                                clearable
                                dense
                                :label="$t('Company')"
                                data-cy="company-field"
                                :disable="loading"
                                :error="false"
                                :hide-bottom-space="true"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The company name of the contact.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.street"
                                clearable
                                dense
                                :label="$t('Street')"
                                data-cy="street-field"
                                :disable="loading"
                                :error="false"
                                :hide-bottom-space="true"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The street name of the contact.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.postcode"
                                clearable
                                dense
                                :label="$t('Postcode')"
                                data-cy="postcode-field"
                                :disable="loading"
                                :error="false"
                                :hide-bottom-space="true"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The postal code of the contact.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.city"
                                clearable
                                dense
                                :label="$t('City')"
                                data-cy="city-field"
                                :disable="loading"
                                :error="false"
                                :hide-bottom-space="true"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The city name of the contact.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-selection-country
                                v-model="formData.country"
                                dense
                                :load-initially="!!formData.country"
                                :disable="loading"
                                :error="false"
                                :hide-bottom-space="true"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div
                class="col-md-4 col-xs-12"
            >
                <q-list>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.iban"
                                clearable
                                dense
                                :error="$v.formData.iban.$error"
                                :error-message="$errMsg($v.formData.iban)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('IBAN')"
                                data-cy="iban-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The IBAN (International Bank Account Number) of the contact bank details.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.bic"
                                clearable
                                dense
                                :label="$t('BIC/SWIFT')"
                                data-cy="bic-swift-field"
                                :error="$v.formData.bic.$error"
                                :error-message="$errMsg($v.formData.bic)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @blur="$v.formData.bic.$touch()"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The BIC (Business Identifier Code) of the contact bank details.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.bankname"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('Bank Name')"
                                data-cy="bank-name-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The bank name of the contact bank details.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.vatnum"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('VAT Number')"
                                data-cy="vat-number-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The VAT number of the contact.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.comregnum"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('Company Reg. Number')"
                                data-cy="company-reg-num-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The company registration number of the contact.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.phonenumber"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('Phone Number')"
                                data-cy="phone-num-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The phone number of the contact.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.mobilenumber"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('Mobile Number')"
                                data-cy="mobile-num-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The mobile number of the contact.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.faxnumber"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('Fax Number')"
                                data-cy="fax-num-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The fax number of the contact.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-selection-timezone
                                v-model="formData.timezone"
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div
                class="col-md-4 col-xs-12"
            >
                <q-list>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.gpp0"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 0')"
                                data-cy="gp0-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('A general purpose field for free use.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.gpp1"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 1')"
                                data-cy="gp1-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('A general purpose field for free use.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.gpp2"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 2')"
                                data-cy="gp2-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('A general purpose field for free use.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.gpp3"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 3')"
                                data-cy="gp3-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('A general purpose field for free use.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.gpp4"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 4')"
                                data-cy="gp4-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('A general purpose field for free use.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.gpp5"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 5')"
                                data-cy="gp5-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('A general purpose field for free use.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.gpp6"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 6')"
                                data-cy="gp6-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('A general purpose field for free use.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.gpp7"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 7')"
                                data-cy="gp7-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('A general purpose field for free use.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.gpp8"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 8')"
                                data-cy="gp8-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('A general purpose field for free use.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.gpp9"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 9')"
                                data-cy="gp9-field"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('A general purpose field for free use.') }}
                                </q-tooltip>
                            </q-input>
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
    email
} from 'vuelidate/lib/validators'
import AuiSelectReseller from 'components/AuiSelectReseller'
import AuiSelectionCountry from 'components/AuiSelectionCountry'
import AuiSelectionTimezone from 'components/AuiSelectionTimezone'
import { resellerLabel } from 'src/filters/resource'
import {
    isBIC,
    isIBAN
} from 'src/validators/common'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiNewContact',
    components: {
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
    validations () {
        let conditionalValidations = {}
        if (this.hasReseller) {
            conditionalValidations = {
                reseller_id: {
                    required
                }
            }
        }
        return {
            formData: {
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
    },
    computed: {
        initialResellerOption () {
            return this.reseller ? {
                label: resellerLabel(this.reseller),
                value: this.reseller.id
            } : null
        },
        getInitialData () {
            const conditionalData = {}
            if (this.initialFormData && this.initialFormData.reseller_id && this.hasReseller) {
                conditionalData.reseller_id = this.initialFormData.reseller_id
            } else if (this.hasReseller) {
                conditionalData.reseller_id = null
            }
            if (this.initialFormData) {
                return {
                    ...conditionalData,
                    firstname: this.initialFormData.firstname,
                    lastname: this.initialFormData.lastname,
                    email: this.initialFormData.email,
                    company: this.initialFormData.company,
                    street: this.initialFormData.street,
                    postcode: this.initialFormData.postcode,
                    city: this.initialFormData.city,
                    country: this.initialFormData.country,
                    iban: this.initialFormData.iban,
                    bic: this.initialFormData.bic,
                    bankname: this.initialFormData.bankname,
                    vatnum: this.initialFormData.vatnum,
                    comregnum: this.initialFormData.comregnum,
                    phonenumber: this.initialFormData.phonenumber,
                    mobilenumber: this.initialFormData.mobilenumber,
                    faxnumber: this.initialFormData.faxnumber,
                    timezone: this.initialFormData.timezone,
                    gpp0: this.initialFormData.gpp0,
                    gpp1: this.initialFormData.gpp1,
                    gpp2: this.initialFormData.gpp2,
                    gpp3: this.initialFormData.gpp3,
                    gpp4: this.initialFormData.gpp4,
                    gpp5: this.initialFormData.gpp5,
                    gpp6: this.initialFormData.gpp6,
                    gpp7: this.initialFormData.gpp7,
                    gpp8: this.initialFormData.gpp8,
                    gpp9: this.initialFormData.gpp9
                }
            } else {
                return {
                    ...conditionalData,
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
        }
    }
}
</script>
