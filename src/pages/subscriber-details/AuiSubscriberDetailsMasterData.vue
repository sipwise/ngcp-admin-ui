<template>
    <aui-base-sub-context>
        <q-banner
            v-if="(subscriberContext && subscriberContext.status !== 'active') || lockLevelStatus"
            class="bg-orange text-white q-mb-md"
            dense
            rounded
        >
            <div
                v-if="subscriberContext && subscriberContext.status !== 'active'"
            >
                {{ $t('Subscriber status is {status}', { status: subscriberContext.status }) }}
            </div>
            <div
                v-if="lockLevelStatus"
            >
                {{ $t('Subscriber is locked for {lockLevel}', { lockLevel: lockLevelStatus }) }}
            </div>
        </q-banner>
        <div
            v-if="subscriberContext"
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
                        :to="{ name: 'customerEdit', params: { id: subscriberCustomerId }}"
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
                :disabled="!subscriberContext"
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
                :disable="!subscriberContext || !subscriberContext.username"
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
import { formatPhoneNumber } from 'src/filters/resource'
import AuiEditButton from 'components/buttons/AuiEditButton'
import NegativeConfirmationDialog from 'components/dialog/NegativeConfirmationDialog'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiMasterDataItem from 'pages/subscriber-details/AuiMasterDataItem'
import AuiMasterDataItemBoolean from 'pages/subscriber-details/AuiMasterDataItemBoolean'
import AuiMasterDataNumberList from 'pages/subscriber-details/AuiMasterDataNumberList'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
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
        subscriberContextMixin
    ],
    data () {
        return {
        }
    },
    computed: {
        isPbxAccount () {
            return this.subscriberContextCustomerIsPbx
        },
        isPbxGroup () {
            return this.subscriberContextIsPbxGroup
        },
        isPbxPilot () {
            return this.subscriberContextIsPbxPilot
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
            return this.subscriberContextCustomer.id
        },
        subscriberCustomer () {
            return '#' + this.subscriberCustomerId + ' - ' + this.subscriberContextContact?.email
        },
        subscriberStatus () {
            return this.subscriberContext?.status
        },
        subscriberStatusColor () {
            switch (this.subscriberContext?.status) {
            case 'active': return 'positive'
            case 'locked': return 'warning'
            case 'terminated': return 'negative'
            default: return 'default'
            }
        },
        subscriberSipUri () {
            return [this.subscriberContext?.username, this.subscriberContext?.domain].join('@')
        },
        subscriberSipPassword () {
            return this.subscriberContext?.password
        },
        canSubscriberSipPassword () {
            return this.user.show_passwords && this.$aclColumn('read', 'subscribers', 'password')
        },
        subscriberWebUsername () {
            return this.subscriberContext?.webusername
        },
        subscriberWebPassword () {
            return '*****'
        },
        canSubscriberWebPassword () {
            return this.user.show_passwords && this.$aclColumn('read', 'subscribers', 'webpassword')
        },
        subscriberExternalId () {
            return this.subscriberContext?.['external_id']
        },
        subscriberAdministrative () {
            return this.subscriberContext?.administrative
        },
        subscriberUuid () {
            return this.subscriberContext?.uuid
        },
        subscriberTimezone () {
            return this.subscriberContext?.timezone || this.subscriberContextContact?.timezone
        },
        subscriberPrimaryNumber () {
            return formatPhoneNumber(this.subscriberContext?.['primary_number'])
        },
        subscriberAliasNumbers () {
            return this.subscriberContext?.['alias_numbers']
        },
        subscriberProfileSet () {
            return this.subscriberContext?.['profile_set_id_expand']?.name
        },
        subscriberProfile () {
            return this.subscriberContext?.['profile_id_expand']?.name
        },
        subscriberPbxExtension () {
            return this.subscriberContext?.['pbx_extension']
        },
        canSubscriberPbxExtension () {
            return !!this.subscriberContext?.['pbx_extension']
        },
        subscriberPbxHuntPolicy () {
            return this.subscriberContext?.['pbx_hunt_policy']
        },
        subscriberPbxHuntTimeout () {
            return this.subscriberContext?.['pbx_hunt_timeout']
        },
        ...mapState('user', [
            'user',
            'platformInfo'
        ]),
        ...mapGetters('subscribers', [
            'lockLevelOptions'
        ]),
        subscriberId () {
            return this.subscriberContext?.id
        },
        editAction () {
            return { name: 'subscriberEdit', params: { id: this.subscriberId } }
        },
        lockLevelStatus () {
            if (!this.subscriberContext?.lock) {
                return null
            } else {
                const lockLevelOption = this.lockLevelOptions.filter(item => String(item.value) === String(this.subscriberContext?.lock))
                return lockLevelOption?.[0]?.label || this.subscriberContext?.lock
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
            return this.subscriberContext?.['customer_id_expand']?.['passreset_email_template_id']
        },
        subscriberEmail () {
            return this.subscriberContext?.email || this.subscriberContext?.['customer_id_expand']?.['contact_id_expand']?.email
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
            const username = this.subscriberContext?.username
            const domain = this.subscriberContext?.domain
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
