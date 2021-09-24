<template>
    <q-form>
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
                                v-model="data.domain_id"
                                class="aui-required"
                                :error="$v.data.domain_id.$error"
                                :error-message="$errMsg($v.data.domain_id)"
                                :reseller-id="resellerId"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="isSeat"
                    >
                        <q-item-section>
                            <aui-select-groups
                                v-model="data.pbx_group_ids"
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
                                :initial-value="data.alias_numbers"
                                @input="numbersSelected"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="isSeat"
                    >
                        <q-item-section>
                            <q-input
                                v-model="data.pbx_extension"
                                dense
                                clearable
                                class="q-mt-md aui-required"
                                :label="$t('Extension')"
                                :tooltip="$t('Extension Number, e.g. 101')"
                                :error="$v.data.pbx_extension.$error"
                                :error-message="$errMsg($v.data.pbx_extension)"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="!isSeat"
                    >
                        <q-item-section>
                            <aui-phone-number
                                class="q-mb-md"
                                :initial-value="data.primary_number"
                                @input="primaryNumberInput"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="isPilot"
                    >
                        <q-item-section>
                            <aui-alias-number-range
                                class="q-mb-md"
                                :initial-value="data.alias_numbers"
                                @input="aliasNumberInput"
                                @add-range="aliasNumberAdd"
                                @remove-range="aliasNumberRemove"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="isPilot || isSeat"
                    >
                        <q-item-section>
                            <aui-input-subscriber-username
                                v-model="data.display_name"
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
                                v-model="data.email"
                                :label="$t('Email')"
                                :tooltip="$t('The email address of the subscriber')"
                                :error="$v.data.email.$error"
                                :error-message="$errMsg($v.data.email)"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-input-subscriber-username
                                v-model="data.webusername"
                                class="q-mb-md"
                                dense
                                :label="$t('Web Username')"
                                :tooltip="$t('The username to login into the CSC Panel')"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-input-subscriber-password
                                v-model="data.webpassword"
                                dense
                                class="q-mb-md"
                                :label="$t('Web Password')"
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
                                v-model="data.username"
                                class="aui-required"
                                dense
                                :label="$t('SIP Username')"
                                :error="$v.data.username.$error"
                                :error-message="$errMsg($v.data.username)"
                                :tooltip="$t('The SIP username for the User-Agents')"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-input-subscriber-password
                                v-model="data.password"
                                class="aui-required"
                                dense
                                :label="$t('SIP Password')"
                                :generate="true"
                                :error="$v.data.password.$error"
                                :error-message="$errMsg($v.data.password)"
                                :tooltip="$t('The SIP password for the User-Agents')"
                                :show-password="true"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-selection-lock-level
                                v-model="data.lock"
                                class="q-mb-md"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-selection-reseller-status
                                v-model="data.status"
                                class="q-mb-md"
                                dense
                                :label="$t('Status')"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model="data.external_id"
                                class="q-mb-md"
                                dense
                                clearable
                                :label="$t('External ID')"
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
                                class="q-mt-md"
                                dense
                                :label="$t('Administrative')"
                                :value="data.administrative"
                                @input="administrativeInput"
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
                                v-model="data.timezone"
                                class="q-mt-lg"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-select-profile-set
                                v-model="data.profile_set_id"
                                :reseller-id="resellerId"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </q-form>
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
export default {
    name: 'AuiNewSubscriber',
    components: {
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
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            subscriber: {},
            data: this.getSubscriberInitialData()
        }
    },
    validations () {
        const config = {
            data: {
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
                }
            }

        }
        if (this.isSeat) {
            config.data = _.merge({
                pbx_extension: {
                    integer,
                    required
                }
            }, config.data)
        }
        return config
    },
    computed: {
        hasUnsavedData () {
            const initialData = this.getSubscriberInitialData()
            const currentData = this.data
            return !_.isEqual(initialData, currentData)
        }
    },
    watch: {
        subscriber () {
            this.data = this.getSubscriberInitialData()
        },
        hasUnsavedData (value) {
            this.$emit('has-unsaved-data', value)
            this.$parent.$emit('form-has-unsaved-data', value)
        }
    },
    methods: {
        getEmptySubscriber () {
            return {
                customer_id: this.customerId,
                domain_id: null,
                lock: null,
                status: 'active',
                timezone: null,
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
                alias_numbers: [
                    {
                        sn: null,
                        ac: null,
                        cc: null,
                        range: null,
                        is_devid: false
                    }
                ],
                is_pbx_group: false,
                is_pbx_pilot: this.isPilot,
                pbx_group_ids: [],
                pbx_extension: null
            }
        },
        getSubscriberInitialData () {
            let initialData = this.getEmptySubscriber()
            if (this.subscriber !== undefined && this.subscriber !== null) {
                initialData = this.subscriber
            }
            return { ...initialData }
        },
        submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.formatAliasNumberRange()
                const submitData = this.data
                if (this.subscriber && this.subscriber.id) {
                    submitData.id = this.subscriber.id
                }
                this.$emit('input', submitData)
                this.$parent.$emit('form-input', submitData)
            }
        },
        reset () {
            this.data = this.getSubscriberInitialData()
            this.$v.$reset()
        },
        administrativeInput (val) {
            this.data.administrative = val
        },
        primaryNumberInput (obj) {
            this.data.primary_number[obj.field] = obj.value
        },
        // the idea here is to generate all the alias numbers according
        // to the  range length, and remove the empty ones:
        // ex: 1 12 123 1 should generate 1 12 123 [0-9]
        // ex2: 1 12 123 2 should generate 1 12 123 [00-99]
        formatAliasNumberRange () {
            this.data.alias_numbers.forEach((item, index) => {
                if (!_.isNil(item.range) && item.range !== '') {
                    const range = Math.pow(10, Number(item.range))
                    for (let n = 0; n < range; n++) {
                        this.data.alias_numbers.push({
                            cc: item.cc,
                            ac: item.ac,
                            sn: item.sn + String(n).padStart(item.range, '0'),
                            is_devid: item.is_devid
                        })
                    }
                    this.data.alias_numbers = this.data.alias_numbers.filter(number => !number.range)
                }
            })
            this.data.alias_numbers = this.data.alias_numbers.filter(number => !(number.cc === null && number.ac === null && number.sn === null))
        },
        aliasNumberInput (obj) {
            this.data.alias_numbers[obj.index][obj.field] = obj.value === '' ? null : obj.value
        },
        aliasNumberAdd (index) {
            this.data.alias_numbers.push({
                sn: null,
                ac: null,
                cc: null,
                range: null,
                is_devid: false
            })
        },
        aliasNumberRemove (index) {
            this.data.alias_numbers.splice(index, 1)
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
        }
    }
}
</script>
