<template>
    <q-form>
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
                                v-model="data.reseller_id"
                                dense
                                :initial-option="initialResellerOption"
                                :error="$v.data.reseller_id.$error"
                                :error-message="$errMsg($v.data.reseller_id)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @blur="$v.data.reseller_id.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="data.firstname"
                                clearable
                                dense
                                :label="$t('First Name')"
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
                                v-model.trim="data.lastname"
                                clearable
                                dense
                                :label="$t('Last Name')"
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
                                v-model.trim="data.email"
                                clearable
                                dense
                                :label="$t('Email')"
                                :error="$v.data.email.$error"
                                :error-message="$errMsg($v.data.email)"
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
                                v-model.trim="data.company"
                                clearable
                                dense
                                :label="$t('Company')"
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
                                v-model.trim="data.street"
                                clearable
                                dense
                                :label="$t('Street')"
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
                                v-model.trim="data.postcode"
                                clearable
                                dense
                                :label="$t('Postcode')"
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
                                v-model.trim="data.city"
                                clearable
                                dense
                                :label="$t('City')"
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
                                v-model="data.country"
                                dense
                                :load-initially="!!data.country"
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
                                v-model.trim="data.iban"
                                clearable
                                dense
                                :error="$v.data.iban.$error"
                                :error-message="$errMsg($v.data.iban)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('IBAN')"
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
                                v-model.trim="data.bic"
                                clearable
                                dense
                                :label="$t('BIC/SWIFT')"
                                :error="$v.data.bic.$error"
                                :error-message="$errMsg($v.data.bic)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @blur="$v.data.bic.$touch()"
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
                                v-model.trim="data.bankname"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('Bank Name')"
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
                                v-model.trim="data.vatnum"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('VAT Number')"
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
                                v-model.trim="data.comregnum"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('Company Reg. Number')"
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
                                v-model.trim="data.phonenumber"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('Phone Number')"
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
                                v-model.trim="data.mobilenumber"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('Mobile Number')"
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
                                v-model.trim="data.faxnumber"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('Fax Number')"
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
                                v-model="data.timezone"
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
                                v-model.trim="data.gpp0"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 0')"
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
                                v-model.trim="data.gpp1"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 1')"
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
                                v-model.trim="data.gpp2"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 2')"
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
                                v-model.trim="data.gpp3"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 3')"
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
                                v-model.trim="data.gpp4"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 4')"
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
                                v-model.trim="data.gpp5"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 5')"
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
                                v-model.trim="data.gpp6"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 6')"
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
                                v-model.trim="data.gpp7"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 7')"
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
                                v-model.trim="data.gpp8"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 8')"
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
                                v-model.trim="data.gpp9"
                                clearable
                                dense
                                :error="false"
                                :hide-bottom-space="true"
                                :disable="loading"
                                :label="$t('General Purpose 9')"
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
    </q-form>
</template>

<script>
import {
    required,
    email
} from 'vuelidate/lib/validators'
import AuiSelectReseller from 'components/AuiSelectReseller'
import AuiSelectionCountry from 'components/AuiSelectionCountry'
import AuiSelectionTimezone from 'components/AuiSelectionTimezone'
import _ from 'lodash'
import { resellerLabel } from 'src/filters/resource'
import {
    isBIC,
    isIBAN
} from 'src/validators/common'
export default {
    name: 'AuiNewContact',
    components: {
        AuiSelectReseller,
        AuiSelectionCountry,
        AuiSelectionTimezone
    },
    props: {
        contact: {
            type: Object,
            default: null
        },
        reseller: {
            type: Object,
            default: null
        },
        hasReseller: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            data: this.getDynamicData(this.contact)
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
            data: {
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
        hasUnsavedData () {
            const initialData = this.getDynamicData(this.contact)
            const currentData = this.getDynamicData(this.data)
            return !_.isEqual(initialData, currentData)
        }
    },
    watch: {
        contact (newContact) {
            this.data = this.getDynamicData(newContact)
        },
        hasUnsavedData (value) {
            this.$emit('has-unsaved-data', value)
            this.$parent.$emit('form-has-unsaved-data', value)
        }
    },
    methods: {
        reset () {
            this.data = this.getDynamicData(this.contact)
            this.$v.$reset()
        },
        submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const submitData = this.getDynamicData(this.data)
                if (this.contact) {
                    submitData.id = this.contact.id
                }
                this.$emit('input', submitData)
                this.$parent.$emit('form-input', submitData)
            }
        },
        getDynamicData (data) {
            const conditionalData = {}
            if (data && data.reseller_id && this.hasReseller) {
                conditionalData.reseller_id = data.reseller_id
            } else if (this.hasReseller) {
                conditionalData.reseller_id = null
            }
            if (data) {
                return {
                    ...conditionalData,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    company: data.company,
                    street: data.street,
                    postcode: data.postcode,
                    city: data.city,
                    country: data.country,
                    iban: data.iban,
                    bic: data.bic,
                    bankname: data.bankname,
                    vatnum: data.vatnum,
                    comregnum: data.comregnum,
                    phonenumber: data.phonenumber,
                    mobilenumber: data.mobilenumber,
                    faxnumber: data.faxnumber,
                    timezone: data.timezone,
                    gpp0: data.gpp0,
                    gpp1: data.gpp1,
                    gpp2: data.gpp2,
                    gpp3: data.gpp3,
                    gpp4: data.gpp4,
                    gpp5: data.gpp5,
                    gpp6: data.gpp6,
                    gpp7: data.gpp7,
                    gpp8: data.gpp8,
                    gpp9: data.gpp9
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
