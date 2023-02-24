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
                class="col-md-6 col-sm-12"
            >
                <q-list
                    dense
                >
                    <q-item>
                        <q-item-section>
                            <aui-select-domain
                                v-model="formData.domain_id"
                                class="aui-required"
                                :error="$v.formData.domain_id.$error"
                                :error-message="$errMsg($v.formData.domain_id)"
                                :reseller-id="resellerId"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="isSeat"
                    >
                        <q-item-section>
                            <aui-select-groups
                                v-model="formData.pbx_group_ids"
                                class="q-mb-md"
                                :customer-id="customerId"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="isSeat"
                    >
                        <q-item-section>
                            <aui-select-numbers
                                :customer-id="customerId"
                                :initial-value="formData.alias_numbers"
                                @input="numbersSelected"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="isSeat"
                    >
                        <q-item-section>
                            <q-input
                                v-model="formData.pbx_extension"
                                dense
                                clearable
                                class="q-mt-md aui-required"
                                :label="$t('Extension')"
                                data-cy="subscriber-extension"
                                :tooltip="$t('Extension Number, e.g. 101')"
                                :error="$v.formData.pbx_extension.$error"
                                :error-message="$errMsg($v.formData.pbx_extension)"
                                @keyup.enter="submit"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="!isSeat"
                    >
                        <q-item-section>
                            <aui-phone-number
                                v-model="formData.primary_number"
                                :error="hasPrimaryNumberError"
                                :error-message="getPrimaryNumberErrorMessage"
                                class="q-mb-md"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="isPilot"
                    >
                        <q-item-section
                            no-wrap
                        >
                            <aui-alias-number-range
                                v-model="aliasNumberRanges"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="isPilot || isSeat"
                    >
                        <q-item-section>
                            <aui-input-subscriber-username
                                v-model="formData.display_name"
                                class="q-mb-md"
                                dense
                                :label="$t('Display Name')"
                                :tooltip="$t('The human-readable display name (ex: John Doe)')"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-input-email
                                v-model="formData.email"
                                :label="$t('Email')"
                                data-cy="subscriber-email"
                                :tooltip="$t('The email address of the subscriber')"
                                :error="$v.formData.email.$error"
                                :error-message="$errMsg($v.formData.email)"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-input-subscriber-username
                                v-model="formData.webusername"
                                class="q-mb-md"
                                dense
                                :label="$t('Web Username')"
                                data-cy="subscriber-web-username"
                                :tooltip="$t('The username to login into the CSC Panel')"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-input-subscriber-password
                                v-model="formData.webpassword"
                                dense
                                class="q-mb-md"
                                :label="$t('Web Password')"
                                data-cy="subscriber-web-password"
                                :generate="true"
                                :tooltip="$t('The password to login into the CSC Panel')"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div
                class="col-md-6 col-sm-12"
            >
                <q-list
                    dense
                >
                    <q-item>
                        <q-item-section>
                            <aui-input-subscriber-username
                                v-model="formData.username"
                                class="aui-required"
                                dense
                                :label="$t('SIP Username')"
                                data-cy="subscriber-sip-username"
                                :error="$v.formData.username.$error"
                                :error-message="$errMsg($v.formData.username)"
                                :tooltip="$t('The SIP username for the User-Agents')"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-input-subscriber-password
                                v-model="formData.password"
                                class="aui-required"
                                dense
                                :label="$t('SIP Password')"
                                data-cy="subscriber-sip-password"
                                :generate="true"
                                :error="$v.formData.password.$error"
                                :error-message="$errMsg($v.formData.password)"
                                :tooltip="$t('The SIP password for the User-Agents')"
                                :show-password="true"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-selection-lock-level
                                v-model="formData.lock"
                                class="q-mb-md"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-selection-reseller-status
                                v-model="formData.status"
                                class="q-mb-md"
                                dense
                                :label="$t('Status')"
                                data-cy="subscriber-status"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model="formData.external_id"
                                class="q-mb-md"
                                dense
                                clearable
                                :label="$t('External ID')"
                                data-cy="subscriber-external-id"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('A non-unique external ID provided by a 3d-party provisioning') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-toggle
                                v-model="formData.administrative"
                                class="q-mt-md"
                                dense
                                :label="$t('Administrative')"
                                data-cy="subscriber-set-administrative"
                            >
                                <q-tooltip>
                                    {{ $t('Subscriber can configure other subscribers within the Customer Account') }}
                                </q-tooltip>
                            </q-toggle>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-selection-timezone
                                v-model="formData.timezone"
                                :clearable="false"
                                class="q-mt-lg"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-select-profile-set
                                v-model="formData.profile_set_id"
                                :reseller-id="resellerId"
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
import AuiAliasNumberRange from 'components/input/AuiAliasNumberRange'
import AuiSelectGroups from 'components/AuiSelectGroups'
import AuiSelectNumbers from 'components/AuiSelectNumbers'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import { onlyDigits } from 'src/validators/common'
export default {
    name: 'AuiNewSubscriber',
    components: {
        AuiBaseForm,
        AuiSelectGroups,
        AuiSelectNumbers,
        AuiPhoneNumber,
        AuiAliasNumberRange,
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
        pilotPrimaryNumber: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            aliasNumberRanges: null,
            subscriber: {}
        }
    },
    validations () {
        const config = {
            formData: {
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
                primary_number: {
                    onlyDigits
                }
            }
        }
        if (this.isSeat) {
            config.formData = _.merge({
                pbx_extension: {
                    integer,
                    required
                }
            }, config.formData)
        }
        return config
    },
    computed: {
        getInitialData () {
            if (this.initialFormData) {
                return {
                    customer_id: this.initialFormData.customer_id,
                    domain_id: this.initialFormData.domain_id,
                    lock: this.initialFormData.lock,
                    status: this.initialFormData.status,
                    timezone: this.initialFormData.timezone ? this.initialFormData.timezone : 'default (parent/localtime)',
                    profile_set_id: this.initialFormData.profile_set_id,
                    display_name: this.initialFormData.display_name,
                    webusername: this.initialFormData.webusername,
                    username: this.initialFormData.username,
                    password: this.initialFormData.password,
                    administrative: this.initialFormData.administrative,
                    primary_number: this.initialFormData.primary_number,
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
                    display_name: null,
                    webusername: null,
                    webpassword: null,
                    username: null,
                    password: null,
                    administrative: false,
                    primary_number: {
                        sn: null,
                        ac: null,
                        cc: null
                    },
                    alias_numbers: [],
                    is_pbx_group: false,
                    is_pbx_pilot: this.isPilot,
                    pbx_group_ids: [],
                    pbx_extension: null
                }
            }
        },
        hasPrimaryNumberError () {
            return this.hasFieldError('primary_number')
        },
        getPrimaryNumberErrorMessage () {
            return this.getFieldError('primary_number')
        }
    },
    methods: {
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
        numbersSelected (numbers) {
            if (numbers) {
                this.data.alias_numbers = numbers.map(number => {
                    return {
                        cc: number.cc,
                        ac: number.ac,
                        sn: number.sn,
                        number_id: number.id,
                        is_devid: number.is_devid
                    }
                })
            } else {
                this.data.alias_numbers = []
            }
        },
        prepareSubmitData (submitData) {
            submitData.alias_numbers = this.generateAliasNumbers()
            if (submitData.timezone === 'default (parent/localtime)') {
                submitData.timezone = null
            }
            return submitData
        }
    }
}
</script>
