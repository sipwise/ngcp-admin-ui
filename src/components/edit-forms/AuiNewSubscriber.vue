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
                    :model-value="subscriberType"
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
                    data-cy="aui-select-domain"
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
                    :label="$t('Groups')"
                    :initial-options="pbxGroupInitialOptions"
                    :customer-id="customerId"
                    :pbx-group="true"
                    :pbx-pilot="true"
                    :multiple="true"
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
                    @update:model-value="updateSeatAliasNumbers"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="!isPbxAccount || isPbxPilot"
            >
                <aui-phone-number
                    :value="formData.primary_number"
                    dense
                    :label="$t('Primary Number')"
                    :error="hasPrimaryNumberError"
                    :error-message="getPrimaryNumberErrorMessage"
                    @input="updatePrimaryNumber($event)"
                    @key-enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="(!isPbxAccount || isPbxPilot) && formData.alias_numbers && formData.alias_numbers.length > 0"
            >
                <aui-phone-number
                    v-for="(aliasNumber, index) in formData.alias_numbers"
                    :key="index"
                    dense
                    :value="aliasNumber"
                    :label="$t('Alias Number')"
                    :error="hasAliasNumberError(index)"
                    :error-message="getAliasNumberErrorMessage(index)"
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
                v-if="!isPbxAccount || isPbxPilot"
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
                    :readonly="isEditMode"
                    :label="$t('SIP Username')"
                    data-cy="subscriber-sip-username"
                    :tooltip="$t('The SIP username for the User-Agents')"
                    :error="hasFieldError('username')"
                    :error-message="getFieldError('username')"
                    @blur="validateField('username')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                :required="true"
            >
                <q-tooltip
                    v-if="showSipPasswordTooltip"
                >
                    <div class="tooltip-message q-pa-md text-body2">
                        Password requirements:
                        <q-item
                            v-for="(message, index) in messages"
                            :key="index"
                            dense
                        >
                            <q-item-section>
                                <span>
                                    <q-icon
                                        name="lock"
                                        size="1em"
                                        class="q-pa-xs"
                                    /> {{ message }}
                                </span>
                            </q-item-section>
                        </q-item>
                    </div>
                </q-tooltip>
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
                    @blur="validateField('password')"
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
                <q-tooltip
                    v-if="showWebPasswordTooltip"
                >
                    <div class="tooltip-message q-pa-md text-body2">
                        Password requirements:
                        <q-item
                            v-for="(message, index) in messages"
                            :key="index"
                            dense
                        >
                            <q-item-section>
                                <span>
                                    <q-icon
                                        name="lock"
                                        size="1em"
                                        class="q-pa-xs"
                                    /> {{ message }}
                                </span>
                            </q-item-section>
                        </q-item>
                    </div>
                </q-tooltip>
                <aui-input-subscriber-password
                    v-model="formData.webpassword"
                    dense
                    :label="$t('Web Password')"
                    data-cy="subscriber-web-password"
                    :generate="true"
                    :error="hasFieldError('webpassword')"
                    :error-message="getFieldError('webpassword')"
                    :tooltip="$t('The password to login into the CSC Panel')"
                    @blur="validateField('webpassword')"
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
                    data-cy="aui-selection-lock-level"
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
                    data-cy="aui-selection-timezone"
                    :clearable="false"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-select-profile-set
                    v-model="formData.profile_set_id"
                    dense
                    data-cy="aui-select-profile-set"
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
                    data-cy="aui-select-profile"
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
import useValidate from '@vuelidate/core'
import {
    email,
    helpers,
    integer,
    maxLength,
    minLength,
    numeric,
    required
} from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectDomain from 'components/AuiSelectDomain'
import AuiSelectGroups from 'components/AuiSelectGroups'
import AuiSelectNumbers from 'components/AuiSelectNumbers'
import AuiSelectProfile from 'components/AuiSelectProfile'
import AuiSelectProfileSet from 'components/AuiSelectProfileSet'
import AuiSelectionLockLevel from 'components/AuiSelectionLockLevel'
import AuiSelectionResellerStatus from 'components/AuiSelectionResellerStatus'
import AuiSelectionTimezone from 'components/AuiSelectionTimezone'
import AuiAddButton from 'components/buttons/AuiAddButton'
import AuiDeleteButton from 'components/buttons/AuiDeleteButton'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiAliasNumberRangeInput from 'components/input/AuiAliasNumberRangeInput'
import AuiInputEmail from 'components/input/AuiInputEmail'
import AuiInputSubscriberPassword from 'components/input/AuiInputSubscriberPassword'
import AuiInputSubscriberUsername from 'components/input/AuiInputSubscriberUsername'
import AuiPhoneNumber from 'components/input/AuiPhoneNumber'
import _ from 'lodash'
import { formatPhoneNumber } from 'src/filters/resource'
import baseFormMixin from 'src/mixins/base-form'
import { mapGetters } from 'vuex'
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
        },
        isEditMode: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            v$: useValidate(),
            aliasNumberRanges: [],
            seatAliasNumbers: [],
            seatUnassignedAliasNumbers: [],
            messages: []
        }
    },
    computed: {
        ...mapGetters('user', [
            'passwordRequirements'
        ]),
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
            return {
                customer_id: this.customerId,
                domain_id: this.initialFormData?.domain_id || null,
                lock: this.initialFormData?.lock || null,
                status: this.initialFormData?.status || 'active',
                timezone: this.initialFormData?.timezone || 'default (parent/localtime)',
                profile_set_id: this.initialFormData?.profile_set_id || null,
                email: this.initialFormData?.email || null,
                display_name: this.initialFormData?.display_name || null,
                webusername: this.initialFormData?.webusername || null,
                webpassword: this.initialFormData?.webpassword || null,
                username: this.initialFormData?.username || null,
                password: this.initialFormData?.password || null,
                external_id: this.initialFormData?.external_id || null,
                administrative: this.initialFormData?.administrative || false,
                primary_number: this.initialFormData?.primary_number ||
                    {
                        sn: null,
                        ac: null,
                        cc: null
                    },
                alias_numbers: this.initialFormData?.alias_numbers || [],
                is_pbx_group: this.initialFormData?.is_pbx_group || false,
                is_pbx_pilot: this.initialFormData?.is_pbx_pilot || false,
                pbx_group_ids: this.initialFormData?.pbx_group_ids || [],
                pbx_extension: this.initialFormData?.pbx_extension || null,
                profile_id: this.initialFormData?.profile_id || null

            }
        },
        domainInitialOption () {
            if (this.domain) {
                return {
                    label: this.domain.domain,
                    value: this.domain.id
                }
            }
            return null
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
            }
            return this.$t('Subscriber')
        },
        hasPrimaryNumberError () {
            return this.v$.formData.primary_number.cc.$errors.length > 0 || this.v$.formData.primary_number.ac.$errors.length > 0 || this.v$.formData.primary_number.sn.$errors.length > 0
        },
        getPrimaryNumberErrorMessage () {
            if (this.v$.formData.primary_number.cc.$errors.length > 0) {
                return this.$errMsg(this.v$.formData.primary_number.cc.$errors)
            } else if (this.v$.formData.primary_number.ac.$errors.length > 0) {
                return this.$errMsg(this.v$.formData.primary_number.ac.$errors)
            } else if (this.v$.formData.primary_number.sn.$errors.length > 0) {
                return this.$errMsg(this.v$.formData.primary_number.sn.$errors)
            }
            return null
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
        },
        showSipPasswordTooltip () {
            return this.passwordRequirements?.sip_validate && this.messages.length > 0
        },
        showWebPasswordTooltip () {
            return this.passwordRequirements?.web_validate && this.messages.length > 0
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
        },
        'formData.profile_set_id': {
            handler () {
                if (!this.formData.profile_set_id) {
                    this.formData.profile_id = null
                }
            },
            immediate: true
        }
    },
    async mounted () {
        this.messages = this.getPasswordRequirementsMessages()
    },
    methods: {
        getPasswordRequirementsMessages () {
            if (this.passwordRequirements?.web_validate || this.passwordRequirements?.sip_validate) {
                const lengthMessage = this.passwordRequirements.min_length > 0
                    ? `must be between ${this.passwordRequirements.min_length} and ${this.passwordRequirements.max_length} characters long`
                    : null
                const digitsMessage = this.passwordRequirements.musthave_digit > 0
                    ? `must contain at least ${this.passwordRequirements.musthave_digit} digits`
                    : null
                const lowercaseMessage = this.passwordRequirements.musthave_lowercase > 0
                    ? `must contain at least ${this.passwordRequirements.musthave_lowercase} lowercase`
                    : null
                const uppercaseReq = this.passwordRequirements.musthave_uppercase > 0
                    ? `must contain at least ${this.passwordRequirements.musthave_uppercase} uppercase`
                    : null
                const specialCharReq = this.passwordRequirements.musthave_specialchar > 0
                    ? `must contain at least ${this.passwordRequirements.musthave_specialchar} special characters`
                    : null

                return [lengthMessage, digitsMessage, lowercaseMessage, uppercaseReq, specialCharReq].filter((message) => message !== null)
            }

            return []
        },
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
                    required,
                    ...this.getSipPasswordValidations()
                },
                ...(this.formData.webusername !== null && !this.isEditMode

                    ? {
                        webpassword: {
                            ...this.getWebPasswordValidations()
                        }
                    }
                    : {}),
                ...(this.isPbxPilot
                    ? {
                        primary_number: {
                            ac: {
                                numeric
                            },
                            cc: {
                                required,
                                numeric
                            },
                            sn: {
                                required,
                                numeric
                            }
                        }
                    }
                    : {
                        primary_number: {
                            ac: {
                                numeric
                            },
                            cc: {
                                numeric
                            },
                            sn: {
                                numeric
                            }
                        }
                    }
                ),
                alias_numbers: {
                    $each: helpers.forEach({
                        ac: {
                            numeric
                        },
                        cc: {
                            required,
                            numeric
                        },
                        sn: {
                            required,
                            numeric
                        }
                    })
                }
            }
            if (this.isPbxSeat || this.isPbxGroup) {
                validations.pbx_extension = {
                    integer,
                    required
                }
            }
            return validations
        },
        getSipPasswordValidations () {
            if (this.passwordRequirements?.sip_validate) {
                return {
                    maxLength: maxLength(this.passwordRequirements.max_length),
                    minLength: minLength(this.passwordRequirements.min_length),
                    passwordDigits () {
                        const digitPattern = /\d/g
                        return (this.formData.password.match(digitPattern) || []).length >= this.passwordRequirements.musthave_digit
                    },
                    passwordLowercase () {
                        const lowercasePattern = /[a-z]/g
                        return (this.formData.password.match(lowercasePattern) || []).length >= this.passwordRequirements.musthave_lowercase
                    },
                    passwordUppercase () {
                        const uppercasePattern = /[A-Z]/g
                        return (this.formData.password.match(uppercasePattern) || []).length >= this.passwordRequirements.musthave_uppercase
                    },
                    passwordChars () {
                        const specialCharPattern = /[\W_]/g
                        return (this.formData.password.match(specialCharPattern) || []).length >= this.passwordRequirements.musthave_specialchar
                    }
                }
            }
        },
        getWebPasswordValidations () {
            if (this.passwordRequirements?.web_validate) {
                return {
                    maxLength: maxLength(this.passwordRequirements.max_length),
                    minLength: minLength(this.passwordRequirements.min_length),
                    passwordDigits () {
                        const digitPattern = /\d/g
                        return (this.formData.webpassword.match(digitPattern) || []).length >= this.passwordRequirements.musthave_digit
                    },
                    passwordLowercase () {
                        const lowercasePattern = /[a-z]/g
                        return (this.formData.webpassword.match(lowercasePattern) || []).length >= this.passwordRequirements.musthave_lowercase
                    },
                    passwordUppercase () {
                        const uppercasePattern = /[A-Z]/g
                        return (this.formData.webpassword.match(uppercasePattern) || []).length >= this.passwordRequirements.musthave_uppercase
                    },
                    passwordChars () {
                        const specialCharPattern = /[\W_]/g
                        return (this.formData.webpassword.match(specialCharPattern) || []).length >= this.passwordRequirements.musthave_specialchar
                    }
                }
            }
        },
        generateAliasNumbers () {
            const aliasNumbers = []
            if (this.aliasNumberRanges) {
                this.aliasNumberRanges.forEach((item) => {
                    if (!_.isEmpty(item.cc) && !_.isEmpty(item.sn) && Number(item.range) > 0) {
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
            if (this.isEditMode && submitData.webpassword === null) {
                delete submitData.webpassword
            }
            return submitData
        },
        additionalSubmitData () {
            return {
                ...(this.isPbxSeat
                    ? {
                        seatAliasNumbers: this.seatAliasNumbers,
                        seatUnassignedAliasNumbers: this.seatUnassignedAliasNumbers
                    }
                    : {}
                )
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
            this.formData.alias_numbers[index] = aliasNumber
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
            this.aliasNumberRanges[index] = aliasNumberRange
        },
        removeAliasNumberRange (index) {
            this.aliasNumberRanges.splice(index, 1)
        },
        postReset () {
            this.seatAliasNumbers = this.aliasNumberValues
        },
        updateSeatAliasNumbers () {
            this.seatUnassignedAliasNumbers = _.difference(this.aliasNumberValues, this.seatAliasNumbers)
        },
        updatePrimaryNumber (data) {
            this.formData.primary_number = data
        },
        hasAliasNumberError (index) {
            return this.v$.$error && (this.v$.formData.alias_numbers.$each.$response.$errors[index].cc.length > 0 ||
                this.v$.formData.alias_numbers.$each.$response.$errors[index].ac.length > 0 || this.v$.formData.alias_numbers.$each.$response.$errors[index].sn.length > 0)
        },
        getAliasNumberErrorMessage (index) {
            if (this.v$.formData.alias_numbers.$each.$response.$errors[index].cc.length > 0) {
                return this.$errMsg(this.v$.formData.alias_numbers.$each.$response.$errors[index].cc)
            } else if (this.v$.formData.alias_numbers.$each.$response.$errors[index].ac.length > 0) {
                return this.$errMsg(this.v$.formData.alias_numbers.$each.$response.$errors[index].ac)
            } else if (this.v$.formData.alias_numbers.$each.$response.$errors[index].sn.length > 0) {
                return this.$errMsg(this.v$.formData.alias_numbers.$each.$response.$errors[index].sn)
            }
            return null
        }
    }
}
</script>
