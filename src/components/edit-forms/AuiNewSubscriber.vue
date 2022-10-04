<template>
    <aui-base-form
        :layout="$attrs.layout || '6-6'"
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
                    :value="subscriberType"
                    :label="$t('Type')"
                    readonly
                    dense
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                :required="true"
            >
                <aui-select-domain
                    v-model="formData.domain_id"
                    :reseller-id="resellerId"
                    :error="hasFieldError('domain_id')"
                    :error-message="getFieldError('domain_id')"
                    :initial-option="domainInitialOption"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="isPbxSeat"
            >
                <aui-select-groups
                    v-model="formData.pbx_group_ids"
                    :initial-options="pbxGroupInitialOptions"
                    :customer-id="customerId"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="isPbxSeat"
            >
                <aui-select-numbers
                    v-model="seatAliasNumbers"
                    :initial-options="aliasNumberInitialOptions"
                    :customer-id="customerId"
                    :error="false"
                    @input="updateSeatAliasNumbers"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="!isPbxAccount || isPbxPilot"
            >
                <aui-phone-number
                    v-model="formData.primary_number"
                    dense
                    :label="$t('Primary Number')"
                    :error="hasPrimaryNumberError"
                    :error-message="getPrimaryNumberErrorMessage"
                    @key-enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="isPbxPilot && formData.alias_numbers && formData.alias_numbers.length > 0"
            >
                <aui-phone-number
                    v-for="(aliasNumber, index) in formData.alias_numbers"
                    :key="index"
                    dense
                    :value="aliasNumber"
                    :label="$t('Alias Number')"
                    :error="$v.formData.alias_numbers.$each[index].$error"
                    :has-dev-id="true"
                    @input="updateAliasNumber(index, $event, aliasNumber)"
                    @key-enter="submit"
                >
                    <template
                        #after
                    >
                        <div
                            class="col-auto self-center"
                        >
                            <aui-delete-button
                                :show-label="false"
                                dense
                                @click="removeAliasNumber(index)"
                            />
                        </div>
                    </template>
                </aui-phone-number>
            </aui-base-form-field>
            <q-item
                v-if="isPbxPilot && formData.alias_numbers && formData.alias_numbers.length > 0"
            >
                <div
                    class="offset-2 col-auto q-field--with-bottom"
                >
                    <aui-add-button
                        :label="$t('Add Alias Number')"
                        size="sm"
                        outline
                        :disable="loading"
                        @click="addAliasNumber"
                    />
                </div>
            </q-item>
            <aui-base-form-field
                v-if="isPbxSeat || isPbxGroup"
                :required="true"
            >
                <q-input
                    v-model="formData.pbx_extension"
                    dense
                    clearable
                    :label="$t('Extension')"
                    data-cy="subscriber-extension"
                    :tooltip="$t('Extension Number, e.g. 101')"
                    :error="hasFieldError('pbx_extension')"
                    :error-message="getFieldError('pbx_extension')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="isPbxPilot && aliasNumberRanges && aliasNumberRanges.length > 0"
            >
                <aui-alias-number-range-input
                    v-for="(aliasNumberRange, index) in aliasNumberRanges"
                    :key="index"
                    :value="aliasNumberRange"
                    :label="$t('Alias Number Range')"
                    @input="updateAliasNumberRange(index, $event)"
                >
                    <template
                        #after
                    >
                        <div
                            class="col-auto self-center"
                        >
                            <aui-delete-button
                                :show-label="false"
                                dense
                                @click="removeAliasNumberRange(index)"
                            />
                        </div>
                    </template>
                </aui-alias-number-range-input>
            </aui-base-form-field>
            <q-item
                v-if="isPbxPilot"
            >
                <div
                    class="offset-2 col-auto q-field--with-bottom"
                >
                    <aui-add-button
                        :label="$t('Add Alias Number Range')"
                        size="sm"
                        outline
                        :disable="loading"
                        @click="addAliasNumberRange"
                    />
                </div>
            </q-item>
            <aui-base-form-field
                v-if="isPbxAccount"
            >
                <aui-input-subscriber-username
                    v-model="formData.display_name"
                    dense
                    :label="$t('Display Name')"
                    :tooltip="$t('The human-readable display name (ex: John Doe)')"
                    :error="false"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-input-email
                    v-model="formData.email"
                    :label="$t('Email')"
                    data-cy="subscriber-email"
                    :tooltip="$t('The email address of the subscriber')"
                    :error="hasFieldError('email')"
                    :error-message="getFieldError('email')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                :required="true"
            >
                <aui-input-subscriber-username
                    v-model="formData.username"
                    dense
                    :label="$t('SIP Username')"
                    data-cy="subscriber-sip-username"
                    :tooltip="$t('The SIP username for the User-Agents')"
                    :error="hasFieldError('username')"
                    :error-message="getFieldError('username')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                :required="true"
            >
                <aui-input-subscriber-password
                    v-model="formData.password"
                    dense
                    :label="$t('SIP Password')"
                    data-cy="subscriber-sip-password"
                    :generate="true"
                    :tooltip="$t('The SIP password for the User-Agents')"
                    :show-password="true"
                    :error="hasFieldError('password')"
                    :error-message="getFieldError('password')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-input-subscriber-username
                    v-model="formData.webusername"
                    dense
                    :label="$t('Web Username')"
                    data-cy="subscriber-web-username"
                    :error="false"
                    :tooltip="$t('The username to login into the CSC Panel')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-input-subscriber-password
                    v-model="formData.webpassword"
                    dense
                    :label="$t('Web Password')"
                    data-cy="subscriber-web-password"
                    :generate="true"
                    :error="false"
                    :tooltip="$t('The password to login into the CSC Panel')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
        </template>
        <template
            #col-2
        >
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.administrative"
                    :label="$t('Administrative')"
                    data-cy="subscriber-set-administrative"
                    :error="false"
                    class="q-field--with-bottom"
                >
                    <q-tooltip>
                        {{ $t('Subscriber can configure other subscribers within the Customer Account') }}
                    </q-tooltip>
                </q-toggle>
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-selection-lock-level
                    v-model="formData.lock"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-selection-reseller-status
                    v-model="formData.status"
                    dense
                    :label="$t('Status')"
                    data-cy="subscriber-status"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model="formData.external_id"
                    dense
                    clearable
                    :label="$t('External ID')"
                    data-cy="subscriber-external-id"
                    :error="false"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('A non-unique external ID provided by a 3d-party provisioning') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-selection-timezone
                    v-model="formData.timezone"
                    dense
                    :clearable="false"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-select-profile-set
                    v-model="formData.profile_set_id"
                    dense
                    :reseller-id="resellerId"
                    :initial-option="profileSetInitialOption"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-select-profile
                    v-if="formData.profile_set_id"
                    v-model="formData.profile_id"
                    dense
                    :reseller-id="resellerId"
                    :profile-set-id="formData.profile_set_id"
                    :initial-option="profileInitialOption"
                    :error="false"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import {
    email,
    integer,
    required
} from 'vuelidate/lib/validators'
import AuiSelectDomain from 'components/AuiSelectDomain'
import _ from 'lodash'
import AuiSelectionTimezone from 'components/AuiSelectionTimezone'
import AuiSelectProfileSet from 'components/AuiSelectProfileSet'
import AuiSelectionResellerStatus from 'components/AuiSelectionResellerStatus'
import AuiSelectionLockLevel from 'components/AuiSelectionLockLevel'
import AuiInputSubscriberUsername from 'components/AuiInputSubscriberUsername'
import AuiInputSubscriberPassword from 'components/AuiInputSubscriberPassword'
import AuiInputEmail from 'components/AuiInputEmail'
import AuiPhoneNumber from 'components/input/AuiPhoneNumber'
import AuiSelectGroups from 'components/AuiSelectGroups'
import AuiSelectNumbers from 'components/AuiSelectNumbers'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiDeleteButton from 'components/buttons/AuiDeleteButton'
import AuiAddButton from 'components/buttons/AuiAddButton'
import AuiAliasNumberRangeInput from 'components/input/AuiAliasNumberRangeInput'
import { formatPhoneNumber } from 'src/filters/resource'
import { numberRequired } from 'src/validators/common'
import AuiSelectProfile from 'components/AuiSelectProfile'
export default {
    name: 'AuiNewSubscriber',
    components: {
        AuiSelectProfile,
        AuiAliasNumberRangeInput,
        AuiAddButton,
        AuiDeleteButton,
        AuiBaseFormField,
        AuiBaseForm,
        AuiSelectGroups,
        AuiSelectNumbers,
        AuiPhoneNumber,
        AuiInputSubscriberUsername,
        AuiInputSubscriberPassword,
        AuiSelectionLockLevel,
        AuiSelectionResellerStatus,
        AuiSelectProfileSet,
        AuiSelectionTimezone,
        AuiSelectDomain,
        AuiInputEmail
    },
    mixins: [baseFormMixin],
    props: {
        resellerId: {
            type: Number,
            default: null
        },
        customerId: {
            type: Number,
            default: null
        },
        isPbxAccount: {
            type: Boolean,
            default: false
        },
        isSeat: {
            type: Boolean,
            default: false
        },
        isPilot: {
            type: Boolean,
            default: false
        },
        domain: {
            type: Object,
            default: null
        },
        pbxGroups: {
            type: Array,
            default: null
        },
        pbxGroupMembers: {
            type: Array,
            default: null
        },
        profile: {
            type: Object,
            default: null
        },
        profileSet: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            aliasNumberRanges: [],
            seatAliasNumbers: [],
            seatUnassignedAliasNumbers: []
        }
    },
    computed: {
        isPbxPilot () {
            return this.isPbxAccount && ((this.hasEntityData && this.initialFormData.is_pbx_pilot) || this.isPilot)
        },
        isPbxGroup () {
            return this.isPbxAccount && ((this.hasEntityData && this.initialFormData.is_pbx_group))
        },
        isPbxSeat () {
            return this.isPbxAccount && ((this.hasEntityData && !this.initialFormData.is_pbx_pilot && !this.initialFormData.is_pbx_group) || this.isSeat)
        },
        getInitialData () {
            if (this.initialFormData) {
                return {
                    customer_id: this.customerId,
                    domain_id: this.initialFormData.domain_id,
                    lock: this.initialFormData.lock,
                    status: this.initialFormData.status,
                    timezone: this.initialFormData.timezone ? this.initialFormData.timezone : 'default (parent/localtime)',
                    profile_set_id: this.initialFormData.profile_set_id,
                    email: this.initialFormData.email,
                    display_name: this.initialFormData.display_name,
                    webusername: this.initialFormData.webusername,
                    webpassword: this.initialFormData.webpassword,
                    username: this.initialFormData.username,
                    password: this.initialFormData.password,
                    external_id: this.initialFormData.external_id,
                    administrative: this.initialFormData.administrative,
                    primary_number: this.initialFormData.primary_number ? this.initialFormData.primary_number : {
                        sn: null,
                        ac: null,
                        cc: null
                    },
                    alias_numbers: this.initialFormData.alias_numbers,
                    is_pbx_group: this.initialFormData.is_pbx_group,
                    is_pbx_pilot: this.initialFormData.is_pbx_pilot,
                    pbx_group_ids: this.initialFormData.pbx_group_ids,
                    pbx_extension: this.initialFormData.pbx_extension
                }
            } else {
                return {
                    customer_id: this.customerId,
                    domain_id: null,
                    lock: null,
                    status: 'active',
                    timezone: 'default (parent/localtime)',
                    profile_set_id: null,
                    email: null,
                    display_name: null,
                    webusername: null,
                    webpassword: null,
                    username: null,
                    password: null,
                    external_id: null,
                    administrative: false,
                    primary_number: {
                        sn: null,
                        ac: null,
                        cc: null
                    },
                    alias_numbers: [],
                    is_pbx_group: false,
                    is_pbx_pilot: false,
                    pbx_group_ids: [],
                    pbx_extension: null
                }
            }
        },
        domainInitialOption () {
            if (this.domain) {
                return {
                    label: this.domain.domain,
                    value: this.domain.id
                }
            } else {
                return null
            }
        },
        aliasNumberInitialOptions () {
            return this.formData.alias_numbers.map((number) => {
                return {
                    value: number.id || number.number_id,
                    label: formatPhoneNumber(number, '')
                }
            })
        },
        aliasNumberValues () {
            const values = []
            this.formData.alias_numbers.forEach((number) => {
                values.push(number.id || number.number_id)
            })
            return values
        },
        aliasNumbers: {
            get () {
                return this.formData.alias_numbers.map((number) => {
                    return {
                        id: number.number_id,
                        cc: number.cc,
                        ac: number.ac,
                        sn: number.sn,
                        is_devid: number.is_devid
                    }
                })
            },
            set (aliasNumbers) {
                if (aliasNumbers && aliasNumbers.length > 0) {
                    this.formData.alias_numbers = aliasNumbers.map((number) => {
                        return {
                            number_id: number.id,
                            cc: number.cc,
                            ac: number.ac,
                            sn: number.sn,
                            is_devid: number.is_devid
                        }
                    })
                }
            }
        },
        subscriberType () {
            if (this.isPbxAccount && this.isPilot) {
                return this.$t('PBX Pilot')
            } else if (this.isPbxAccount && this.isSeat) {
                return this.$t('PBX Seat')
            } else {
                return this.$t('Subscriber')
            }
        },
        hasPrimaryNumberError () {
            if (this.isPbxPilot) {
                return this.hasFieldError('primary_number')
            }
            return false
        },
        getPrimaryNumberErrorMessage () {
            if (this.isPbxPilot) {
                return this.getFieldError('primary_number')
            }
            return undefined
        },
        pbxGroupInitialOptions () {
            if (this.pbxGroups) {
                return this.pbxGroups.map((pbxGroup) => {
                    return {
                        label: pbxGroup.display_name,
                        value: pbxGroup.id
                    }
                })
            }
            return null
        },
        profileInitialOption () {
            if (this.profile) {
                return {
                    label: this.profile.name,
                    value: this.profile.id
                }
            }
            return null
        },
        profileSetInitialOption () {
            if (this.profileSet) {
                return {
                    label: this.profileSet.name,
                    value: this.profileSet.id
                }
            }
            return null
        }
    },
    watch: {
        'formData.alias_numbers': {
            handler () {
                if (this.isPbxSeat) {
                    this.seatAliasNumbers = this.aliasNumberValues
                }
            },
            immediate: true
        }
    },
    methods: {
        getValidations () {
            const validations = {
                domain_id: {
                    required
                },
                email: {
                    email
                },
                username: {
                    required
                },
                password: {
                    required
                },
                ...(this.isPbxPilot ? {
                    primary_number: {
                        numberRequired
                    },
                    alias_numbers: {
                        $each: {
                            cc: {
                                required
                            },
                            ac: {
                                required
                            },
                            sn: {
                                required
                            }
                        }
                    }
                } : {})
            }
            if (this.isPbxSeat || this.isPbxGroup) {
                validations.pbx_extension = {
                    integer,
                    required
                }
            }
            return validations
        },
        generateAliasNumbers () {
            const aliasNumbers = []
            if (this.aliasNumberRanges) {
                this.aliasNumberRanges.forEach((item) => {
                    if (!_.isEmpty(item.cc) && !_.isEmpty(item.ac) && !_.isEmpty(item.sn) && Number(item.range) > 0) {
                        const range = Math.pow(10, Number(item.range))
                        for (let n = 0; n < range; n++) {
                            aliasNumbers.push({
                                cc: item.cc,
                                ac: item.ac,
                                sn: item.sn + String(n).padStart(item.range, '0'),
                                is_devid: item.is_devid
                            })
                        }
                    }
                })
            }
            return aliasNumbers
        },
        prepareSubmitData (submitData) {
            submitData.is_pbx_pilot = this.isPbxPilot
            if (submitData.timezone === 'default (parent/localtime)') {
                submitData.timezone = null
            }
            if (this.isPbxPilot) {
                this.generateAliasNumbers().forEach((number) => {
                    submitData.alias_numbers.push(number)
                })
                this.aliasNumberRanges = []
            }
            return submitData
        },
        additionalSubmitData () {
            return {
                ...(this.isPbxSeat ? {
                    seatAliasNumbers: this.seatAliasNumbers,
                    seatUnassignedAliasNumbers: this.seatUnassignedAliasNumbers
                } : {})
            }
        },
        hasAdditionalUnsavedData () {
            return (this.aliasNumberRanges && this.aliasNumberRanges.length > 0) ||
                (this.isPbxSeat && !_.isEqual(this.aliasNumberValues.sort(), this.seatAliasNumbers.sort()))
        },
        addAliasNumber () {
            if (!this.formData.alias_numbers) {
                this.formData.alias_numbers = []
            }
            this.formData.alias_numbers.push({
                cc: '',
                ac: '',
                sn: '',
                is_devid: false
            })
        },
        updateAliasNumber (index, aliasNumber) {
            this.$set(this.formData.alias_numbers, index, {
                ...aliasNumber
            })
        },
        removeAliasNumber (index) {
            this.formData.alias_numbers.splice(index, 1)
        },
        addAliasNumberRange () {
            if (!this.aliasNumberRanges) {
                this.aliasNumberRanges = []
            }
            this.aliasNumberRanges.push({
                cc: '',
                ac: '',
                sn: '',
                range: '',
                is_devid: false
            })
        },
        updateAliasNumberRange (index, aliasNumberRange) {
            this.$set(this.aliasNumberRanges, index, aliasNumberRange)
        },
        removeAliasNumberRange (index) {
            this.aliasNumberRanges.splice(index, 1)
        },
        postReset () {
            this.seatAliasNumbers = this.aliasNumberValues
        },
        updateSeatAliasNumbers () {
            this.seatUnassignedAliasNumbers = _.difference(this.aliasNumberValues, this.seatAliasNumbers)
        }
    }
}
</script>
