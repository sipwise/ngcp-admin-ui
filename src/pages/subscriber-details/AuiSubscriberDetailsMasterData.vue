<template>
    <aui-base-sub-context>
        <q-banner
            v-if="(subscriberData && subscriberData.status !== 'active') || lockLevelStatus"
            class="bg-orange text-white q-mb-md"
            dense
            rounded
        >
            <div
                v-if="subscriberData && subscriberData.status !== 'active'"
            >
                {{ $t('Subscriber status is {status}', { status: subscriberData.status }) }}
            </div>
            <div
                v-if="lockLevelStatus"
            >
                {{ $t('Subscriber is locked for {lockLevel}', { lockLevel: lockLevelStatus }) }}
            </div>
        </q-banner>
        <div
            v-if="resourceObject"
            class="row"
        >
            <div
                class="col-6"
            >
                <q-list>
                    <aui-master-data-item
                        :label="$t('Type')"
                        :value="subscriberType"
                        :icon="$routeMeta.$icon({name: 'subscriberList' })"
                    />
                    <aui-master-data-item
                        :label="$t('Status')"
                        :value="subscriberStatus"
                        :color="subscriberStatusColor"
                        bold
                    />
                    <aui-master-data-item
                        :label="$t('SIP URI')"
                        :value="subscriberSipUri"
                        bold
                    />
                    <aui-master-data-item
                        v-if="canSubscriberSipPassword"
                        :label="$t('SIP Password')"
                        :value="subscriberSipPassword"
                    />
                    <aui-master-data-item
                        :label="$t('Web Username')"
                        :value="subscriberWebUsername"
                        bold
                    />
                    <aui-master-data-item
                        v-if="canSubscriberWebPassword"
                        :label="$t('Web Password')"
                        :value="subscriberWebPassword"
                    />
                    <aui-master-data-item
                        :label="$t('Email Address')"
                        :value="subscriberEmail"
                    />
                    <aui-master-data-item-boolean
                        :label="$t('Administrative')"
                        :value="subscriberAdministrative"
                    />
                    <aui-master-data-item
                        v-if="!isPbxGroup"
                        :label="$t('Subscriber Profile Set')"
                        :value="subscriberProfileSet"
                    />
                    <aui-master-data-item
                        v-if="!isPbxGroup"
                        :label="$t('Subscriber Profile')"
                        :value="subscriberProfile"
                    />
                </q-list>
            </div>
            <div
                class="col-6"
            >
                <q-list>
                    <aui-master-data-item
                        :label="$t('Customer #')"
                        :value="subscriberCustomer"
                        :icon="$routeMeta.$icon({name: 'customerList' })"
                        :to="{ name: 'customerDetails', params: { id: subscriberCustomerId }}"
                    />
                    <aui-master-data-item
                        :label="$t('UUID')"
                        :value="subscriberUuid"
                    />
                    <aui-master-data-item
                        :label="$t('External #')"
                        :value="subscriberExternalId"
                    />
                    <aui-master-data-item
                        :label="$t('Timezone')"
                        :value="subscriberTimezone"
                    />
                    <aui-master-data-item
                        :label="$t('Primary Number')"
                        :value="subscriberPrimaryNumber"
                        bold
                    />
                    <aui-master-data-item
                        v-if="canSubscriberPbxExtension"
                        :label="$t('PBX Extension')"
                        :value="subscriberPbxExtension"
                        bold
                    />
                    <aui-master-data-item
                        v-if="isPbxGroup"
                        :label="$t('PBX Hunt Policy')"
                        :value="subscriberPbxHuntPolicy"
                    />
                    <aui-master-data-item
                        v-if="isPbxGroup"
                        :label="$t('PBX Hunt Timout')"
                        :value="subscriberPbxHuntTimeout"
                    />
                    <aui-master-data-number-list
                        :label="$t('Alias Numbers')"
                        :value="subscriberAliasNumbers"
                    />
                </q-list>
            </div>
        </div>
        <portal
            to="page-toolbar-left"
        >
            <aui-edit-button
                class="q-mr-sm"
                :disabled="!subscriberData"
                :to="editAction"
            />

            <q-btn
                v-if="loginToCSCv1Available"
                :disable="!subscriberId"
                class="q-mr-sm"
                icon="person"
                color="primary"
                size="sm"
                :label="$t('Login to CSC')"
                unelevated
                :href="getCSCv1href"
                target="_blank"
                type="a"
            />
            <q-btn
                v-if="loginToCSCv2Available"
                :disable="!subscriberId"
                class="q-mr-sm"
                icon="person"
                color="primary"
                size="sm"
                :label="$t('Login to New CSC')"
                unelevated
                :href="getCSCv2href"
                target="_blank"
                type="a"
            />
            <q-btn
                v-if="resetWebPasswordAllowed"
                :disable="!subscriberData || !subscriberData.username"
                class="q-mr-sm"
                :icon="resetWebPasswordIcon"
                color="negative"
                size="sm"
                :label="$t('Reset WEB Password')"
                unelevated
                @click="resetWebPassword"
            />
        </portal>
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { mapGetters, mapState } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import subContext from 'src/mixins/sub-context'
import { formatPhoneNumber } from 'src/filters/resource'
import AuiEditButton from 'components/buttons/AuiEditButton'
import NegativeConfirmationDialog from 'components/dialog/NegativeConfirmationDialog'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiMasterDataItem from 'pages/subscriber-details/AuiMasterDataItem'
import AuiMasterDataItemBoolean from 'pages/subscriber-details/AuiMasterDataItemBoolean'
import AuiMasterDataNumberList from 'pages/subscriber-details/AuiMasterDataNumberList'
export default {
    name: 'AuiSubscriberDetailsMasterData',
    components: {
        AuiMasterDataNumberList,
        AuiMasterDataItemBoolean,
        AuiMasterDataItem,
        AuiEditButton,
        AuiBaseSubContext
    },
    mixins: [
        subContext
    ],
    data () {
        return {
        }
    },
    computed: {
        isPbxAccount () {
            return this.subscriberData?.['customer_id_expand']?.type === 'pbxaccount'
        },
        isPbxGroup () {
            return this.subscriberData?.['is_pbx_group']
        },
        isPbxPilot () {
            return this.subscriberData?.['is_pbx_pilot']
        },
        subscriberType () {
            if (this.isPbxAccount && this.isPbxPilot) {
                return this.$t('PBX Pilot')
            } else if (this.isPbxAccount && this.isPbxGroup) {
                return this.$t('PBX Group')
            } else if (this.isPbxAccount) {
                return this.$t('PBX Seat')
            } else {
                return this.$t('Subscriber')
            }
        },
        subscriberCustomerId () {
            return this.subscriberData?.['customer_id']
        },
        subscriberCustomer () {
            return '#' + this.subscriberCustomerId + ' - ' + this.subscriberData?.['customer_id_expand']?.['contact_id_expand']?.email
        },
        subscriberStatus () {
            return this.subscriberData?.status
        },
        subscriberStatusColor () {
            switch (this.subscriberData?.status) {
            case 'active': return 'positive'
            case 'locked': return 'warning'
            case 'terminated': return 'negative'
            default: return 'default'
            }
        },
        subscriberSipUri () {
            return [this.subscriberData?.username, this.subscriberData?.domain].join('@')
        },
        subscriberSipPassword () {
            return this.subscriberData?.password
        },
        canSubscriberSipPassword () {
            return this.user.show_passwords && this.$aclColumn('read', 'subscribers', 'password')
        },
        subscriberWebUsername () {
            return this.subscriberData?.webusername
        },
        subscriberWebPassword () {
            return '*****'
        },
        canSubscriberWebPassword () {
            return this.user.show_passwords && this.$aclColumn('read', 'subscribers', 'webpassword')
        },
        subscriberExternalId () {
            return this.subscriberData?.['external_id']
        },
        subscriberAdministrative () {
            return this.subscriberData?.administrative
        },
        subscriberUuid () {
            return this.subscriberData?.uuid
        },
        subscriberTimezone () {
            return this.subscriberData?.timezone || this.subscriberData?.['customer_id_expand']?.['contact_id_expand']?.timezone
        },
        subscriberPrimaryNumber () {
            return formatPhoneNumber(this.subscriberData?.['primary_number'])
        },
        subscriberAliasNumbers () {
            return this.subscriberData?.['alias_numbers']
        },
        subscriberProfileSet () {
            return this.subscriberData?.['profile_set_id_expand']?.name
        },
        subscriberProfile () {
            return this.subscriberData?.['profile_id_expand']?.name
        },
        subscriberPbxExtension () {
            return this.subscriberData?.['pbx_extension']
        },
        canSubscriberPbxExtension () {
            return !!this.subscriberData?.['pbx_extension']
        },
        subscriberPbxHuntPolicy () {
            return this.subscriberData?.['pbx_hunt_policy']
        },
        subscriberPbxHuntTimeout () {
            return this.subscriberData?.['pbx_hunt_timeout']
        },
        ...mapState('user', [
            'user',
            'platformInfo'
        ]),
        ...mapGetters('subscribers', [
            'lockLevelOptions'
        ]),
        subscriberId () {
            return this.resourceObject?.id
        },
        subscriberData () {
            return this.resourceObject || null
        },
        editAction () {
            if (this.subscriberData?.['is_pbx_group']) {
                return { name: 'customerPBXGroupEdit', params: { id: this.subscriberData?.['customer_id'], groupId: this.subscriberId } }
            } else {
                return { name: 'subscriberEdit', params: { id: this.subscriberId } }
            }
        },
        lockLevelStatus () {
            if (!this.subscriberData?.lock) {
                return null
            } else {
                const lockLevelOption = this.lockLevelOptions.filter(item => String(item.value) === String(this.subscriberData?.lock))
                return lockLevelOption?.[0]?.label || this.subscriberData?.lock
            }
        },
        loginToCSCv1Available () {
            return ['no', 'mixed'].includes(this?.platformInfo?.['csc_v2_mode'])
        },
        loginToCSCv2Available () {
            return ['yes', 'mixed'].includes(this?.platformInfo?.['csc_v2_mode'])
        },
        getCSCv1href () {
            return `/subscriber/${this.subscriberId}/details/login_to_csc`
        },
        getCSCv2href () {
            return `/subscriber/${this.subscriberId}/details/login_to_csc_v2`
        },
        resetWebPasswordIcon () {
            return 'restart_alt'
        },
        resetWebPasswordAllowed () {
            return this.subscriberData?.['customer_id_expand']?.['passreset_email_template_id']
        },
        subscriberEmail () {
            return this.subscriberData?.email || this.subscriberData?.['customer_id_expand']?.['contact_id_expand']?.email
        }
    },
    methods: {
        ...mapWaitingActions('user', {
            passwordReset: WAIT_PAGE
        }),
        formatPhoneNumber (...args) {
            return formatPhoneNumber(...args)
        },
        resetWebPassword () {
            const username = this.subscriberData?.username
            const domain = this.subscriberData?.domain
            const subscriberName = [username, domain].join('@')
            const subscriberEmail = this.subscriberEmail
            this.$q.dialog({
                component: NegativeConfirmationDialog,
                parent: this,
                title: this.$t('Reset web password confirmation'),
                icon: this.resetWebPasswordIcon,
                text: this.$t('You are about to reset web password for the {subscriber}', {
                    subscriber: subscriberName
                }),
                buttonIcon: this.resetWebPasswordIcon,
                buttonLabel: this.$t('Reset')
            }).onOk(async () => {
                await this.passwordReset({
                    type: 'subscriber',
                    username,
                    domain
                })
                showGlobalSuccessMessage(
                    this.$t('Successfully reset web password, please check your email at {email}', { email: subscriberEmail })
                )
            })
        }
    }
}
</script>
