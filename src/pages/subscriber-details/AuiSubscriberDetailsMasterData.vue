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
        <q-markup-table
            flat
        >
            <thead>
                <tr>
                    <th
                        class="text-left"
                    >
                        {{ $t('Setting') }}
                    </th>
                    <th
                        class="text-left"
                    >
                        {{ $t('Values') }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, index) of items"
                    :key="index"
                >
                    <td>{{ item.setting }}</td>
                    <td v-if="item.numbersList">
                        <q-list
                            dense
                            class="no-padding"
                            style="width: 150px"
                        >
                            <q-item
                                v-for="(numberData) of item.numbersList"
                                :key="numberData.number_id"
                                class="alias-number-item no-padding"
                            >
                                <q-item-section>
                                    {{ formatPhoneNumber(numberData) }}
                                </q-item-section>
                                <q-item-section
                                    v-if="numberData.is_devid"
                                    avatar
                                >
                                    <q-icon
                                        color="primary"
                                        name="phone"
                                        size="xs"
                                    />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </td>
                    <td v-else-if="typeof item.value === 'boolean'">
                        <q-toggle
                            :value="item.value"
                            disable
                        />
                    </td>
                    <td v-else>
                        {{ item.value }}
                    </td>
                </tr>
            </tbody>
        </q-markup-table>
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
export default {
    name: 'AuiSubscriberDetailsMasterData',
    components: {
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
            // TODO: should be replaced with some API call
            return `/subscriber/${this.subscriberId}/details/login_to_csc`
        },
        getCSCv2href () {
            // TODO: should be replaced with some API call
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
        },
        items () {
            if (!this.subscriberData) {
                return []
            }

            return [
                {
                    setting: this.$t('Type'),
                    value: this.subscriberData?.['is_pbx_group'] ? this.$t('PBX Group') : this.$t('Subscriber')
                },
                {
                    setting: this.$t('Customer #'),
                    value: this.subscriberData?.['customer_id']
                },
                {
                    setting: this.$t('Status'),
                    value: this.subscriberData?.status
                },
                {
                    setting: this.$t('Email Address'),
                    value: this.subscriberEmail
                },
                {
                    setting: this.$t('Web Username'),
                    value: this.subscriberData?.webusername
                },
                ...((this.user.show_passwords && this.$aclColumn('read', 'subscribers', 'webpassword')) ? [
                    {
                        setting: this.$t('Web Password'),
                        value: '******'
                    }
                ] : []),
                {
                    setting: this.$t('SIP URI'),
                    value: [this.subscriberData?.username, this.subscriberData?.domain].join('@')
                },
                ...((this.user.show_passwords && this.$aclColumn('read', 'subscribers', 'password')) ? [
                    {
                        setting: this.$t('SIP Password'),
                        value: this.subscriberData?.password
                    }
                ] : []),
                {
                    setting: this.$t('Administrative'),
                    value: this.subscriberData?.administrative
                },
                {
                    setting: this.$t('External #'),
                    value: this.subscriberData?.['external_id']
                },
                {
                    setting: this.$t('UUID'),
                    value: this.subscriberData?.uuid
                },
                {
                    setting: this.$t('Timezone'),
                    value: this.subscriberData?.timezone ||
                        this.subscriberData?.['customer_id_expand']?.['contact_id_expand']?.timezone
                },
                {
                    setting: this.$t('Primary Number'),
                    value: formatPhoneNumber(this.subscriberData?.['primary_number'])
                },
                {
                    setting: this.$t('Alias Numbers'),
                    numbersList: this.subscriberData?.['alias_numbers']
                },
                ...(!this.subscriberData?.['is_pbx_group'] ? [
                    {
                        setting: this.$t('Subscriber Profile Set'),
                        value: this.subscriberData?.['profile_set_id_expand']?.name
                    },
                    {
                        setting: this.$t('Subscriber Profile'),
                        value: this.subscriberData?.['profile_id_expand']?.name
                    }
                ] : []),
                ...(this.subscriberData?.['pbx_extension'] ? [
                    {
                        setting: this.$t('Extension'),
                        value: this.subscriberData?.['pbx_extension']
                    }
                ] : []),
                ...(this.subscriberData?.['is_pbx_group'] ? [
                    {
                        setting: this.$t('Hunt Policy'),
                        value: this.subscriberData?.['pbx_hunt_policy']
                    },
                    {
                        setting: this.$t('Serial Hunt Timeout'),
                        value: this.subscriberData?.['pbx_hunt_timeout']
                    }
                ] : [])
            ]
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

<style scoped>
.alias-number-item {
    min-height: auto;
}
</style>
