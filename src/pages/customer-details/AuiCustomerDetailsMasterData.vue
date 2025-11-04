<template>
    <aui-base-sub-context>
        <div
            v-if="customerContext"
            class="row q-col-gutter-lg"
        >
            <div
                class="col-6"
            >
                <q-list
                    bordered
                    class="rounded-borders q-pa-md"
                >
                    <q-item-label
                        header
                        class="text-uppercase text-primary text-weight-bold"
                    >
                        {{ $t('General Information') }}
                    </q-item-label>
                    <aui-master-data-item
                        :label="$t('Type')"
                        :value="customerType"
                        :icon="$routeMeta.$icon({ name: 'customerList' })"
                    />
                    <aui-master-data-item
                        :label="$t('Status')"
                        :value="customerStatus"
                        :color="customerStatusColor"
                        bold
                    />
                    <aui-master-data-item
                        :label="$t('External #')"
                        :value="customerExternalId"
                    />
                    <aui-master-data-item
                        :label="$t('Email Address')"
                        :value="customerContactEmail"
                    />
                    <aui-master-data-item
                        :label="$t('Max Subscribers')"
                        :value="customerSubscribers"
                    />
                    <aui-master-data-item
                        :label="$t('VAT Rate')"
                        :value="customerVATRate"
                    />
                </q-list>
                <q-list
                    bordered
                    class="rounded-borders q-mt-lg"
                >
                    <q-item-label
                        header
                        class="text-uppercase text-primary text-weight-bold"
                    >
                        {{ $t('Templates') }}
                    </q-item-label>
                    <aui-master-data-item
                        :label="$t('Subscriber Email Template')"
                        :value="customerSubscriberEmailTemplate"
                    />
                    <aui-master-data-item
                        :label="$t('Password Reset Email Template')"
                        :value="customerPassResetEmailTemplate"
                    />
                    <aui-master-data-item
                        :label="$t('Invoice Email Template')"
                        :value="customerInvoiceEmailTemplate"
                    />
                    <aui-master-data-item
                        :label="$t('Invoice Template')"
                        :value="customerInvoiceTemplate"
                    />
                </q-list>
            </div>
            <div
                class="col-6"
            >
                <q-list
                    bordered
                    class="rounded-borders q-pa-md"
                >
                    <q-item-label
                        header
                        class="text-uppercase text-primary text-weight-bold"
                    >
                        {{ $t('Billing Profile') }}
                    </q-item-label>
                    <aui-master-data-item
                        :label="$t('Active Billing Profile')"
                        :value="customerBillingProfile"
                    />
                    <aui-master-data-item
                        :label="$t('Profile Package')"
                        class="q-pb-md"
                        :value="customerProfilePackage"
                    />
                    <q-separator spaced />
                    <q-item-label
                        header
                        class="text-uppercase text-primary text-weight-bold cursor-pointer"
                        @click="showScheduledBillingProfiles = !showScheduledBillingProfiles"
                    >
                        {{ $t('Scheduled Billing Profiles') }}
                        <q-icon
                            :name="showScheduledBillingProfiles ? 'expand_less' : 'expand_more'"
                            class="float-right"
                        />
                    </q-item-label>
                    <div
                        v-if="showScheduledBillingProfiles"
                    >
                        <q-item
                            v-for="(item, index) in customerBillingProfilesData"
                            :key="index"
                            class="q-px-md q-py-sm bg-grey-1 rounded-borders q-mb-sm"
                        >
                            <q-item-section>
                                <q-item-label>
                                    # {{ $t('Billing') }} - {{ $t('Profile') }}
                                </q-item-label>
                                <q-item-label>
                                    {{ item.profile }}
                                </q-item-label>
                                <q-item-label caption>
                                    <b>{{ $t('Start') }} : </b> {{ item.start }}
                                </q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>
                                    # {{ $t('Billing') }} - {{ $t('Network') }}
                                </q-item-label>
                                <q-item-label>
                                    {{ item.network }}
                                </q-item-label>
                                <q-item-label caption>
                                    <b>{{ $t('End') }} : </b> {{ item.end }}
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </div>
                    <q-separator spaced />
                    <q-item-label
                        header
                        class="text-uppercase text-primary text-weight-bold cursor-pointer"
                        @click="showBillingHistory = !showBillingHistory"
                    >
                        {{ $t('Billing Profile History') }}
                        <q-icon
                            :name="showBillingHistory ? 'expand_less' : 'expand_more'"
                            class="float-right"
                        />
                    </q-item-label>
                    <div
                        v-if="showBillingHistory"
                    >
                        <q-item
                            v-for="(billingProfileItem, index) in allBillingProfilesItems"
                            :key="index"
                            :active="isActiveBillingProfile(billingProfileItem, index)"
                            :disable="loading"
                            class="q-px-md q-py-sm q-mb-xs bg-grey-1 rounded-borders"
                        >
                            <q-item-section avatar>
                                <q-icon
                                    v-if="index < customerContext?.billing_profiles.length"
                                    name="date_range"
                                />
                                <q-icon
                                    v-else-if="index === customerContext?.billing_profiles.length"
                                    name="fas fa-hand-holding-usd"
                                />
                                <q-icon
                                    v-else
                                    name="remove"
                                />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>
                                    {{ billingProfileItem.profile.label }}
                                </q-item-label>
                                <q-item-label class="text-weight-light">
                                    {{ billingProfileItem.network.label }}
                                </q-item-label>
                                <q-item-label class="text-weight-light">
                                    {{ billingProfileItem.start }} - {{ billingProfileItem.end }}
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </div>
                </q-list>
            </div>
        </div>
        <portal
            to="page-toolbar-left"
        >
            <aui-edit-button
                v-if="canEdit"
                class="q-mr-sm"
                :disable="!customerContext"
                :to="editAction"
            />
        </portal>
    </aui-base-sub-context>
</template>
<script>
import AuiEditButton from 'components/buttons/AuiEditButton'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiMasterDataItem from 'pages/subscriber-details/AuiMasterDataItem'
import { billingNetworkLabel, billingProfileLabel } from 'src/filters/resource'
import customerContextMixin from 'src/mixins/data-context-pages/customer'

export default {
    name: 'AuiCustomerDetailsMasterData',
    components: {
        AuiMasterDataItem,
        AuiEditButton,
        AuiBaseSubContext
    },
    mixins: [customerContextMixin],
    data () {
        return {
            showBillingHistory: false,
            showScheduledBillingProfiles: false
        }
    },
    computed: {
        customerType () {
            return this.customerContextIsPbx
                ? this.$t('Cloud PBX Account')
                : this.$t('Basic SIP Account')
        },
        customerStatus () {
            return this.customerContext?.status
        },
        customerStatusColor () {
            switch (this.customerContext?.status) {
            case 'active': return 'positive'
            case 'locked': return 'warning'
            case 'terminated': return 'negative'
            default: return 'default'
            }
        },
        customerExternalId () {
            return this.customerContext?.external_id
        },
        customerId () {
            return this.customerContextResourceId
        },
        editAction () {
            return { name: 'customerEdit', params: { id: this.customerId } }
        },
        customerContactEmail () {
            return this.customerContext?.contact_id_expand?.email
        },
        customerSubscribers () {
            return this.customerContext?.max_subscribers
        },
        customerVATRate () {
            return this.customerContext?.vat_rate
        },
        customerSubscriberEmailTemplate () {
            if (this.customerContext?.subscriber_email_template_id === null) { // to avoid showing undefined instead of N/A
                return null
            }
            return this.customerContext?.subscriber_email_template_id
        },
        customerPassResetEmailTemplate () {
            if (this.customerContext?.passreset_email_template_id === null) {
                return null
            }
            return `#${this.customerContext?.passreset_email_template_id} - ${this.customerContext?.passreset_email_template_id_expand?.name}`
        },
        customerInvoiceEmailTemplate () {
            if (this.customerContext?.invoice_email_template_id === null) {
                return null
            }
            return `#${this.customerContext?.invoice_email_template_id} - ${this.customerContext?.invoice_email_template_id_expand?.name}`
        },
        customerInvoiceTemplate () {
            if (this.customerContext?.invoice_template_id === null) {
                return null
            }
            return `#${this.customerContext?.invoice_template_id} - ${this.customerContext?.invoice_template_id_expand?.name}`
        },
        customerBillingProfile () {
            if (this.customerContext?.billing_profile_id === null) {
                return null
            }
            return `#${this.customerContext?.billing_profile_id} - ${this.customerContext?.billing_profile_id_expand?.name}`
        },
        customerProfilePackage () {
            if (this.customerContext?.profile_package_id === null) {
                return null
            }
            return `#${this.customerContext?.profile_package_id} - ${this.customerContext?.profile_package_id_expand?.name}`
        },
        canEdit () {
            return this.$aclCan('update', 'entity.customers')
        },
        customerBillingProfilesData () {
            const profiles = this.customerContextBillingProfiles || [] // Contains profile and network data
            const schedules = this.customerContext?.billing_profiles || [] // Contains schedule data
            return profiles.map((item) => {
                const matchingSchedule = schedules.find(
                    (schedule) =>
                        schedule.profile_id === item.profile.id && schedule.network_id === item.network.id
                )
                return {
                    profile: `#${item.profile.id} - ${item.profile.name}`,
                    network: `#${item.network.id} - ${item.network.name}`,
                    start: matchingSchedule?.start || '-',
                    end: matchingSchedule?.stop || '-'
                }
            })
        },
        allBillingProfilesItems () {
            return (this.customerContext?.all_billing_profiles ?? [])
                .map((profile, index) => {
                    const allBillingExpanded = this.customerContextAllBillingProfiles?.[index]
                    if (!allBillingExpanded) {
                        return null
                    }
                    return {
                        profile: {
                            id: profile.profile_id,
                            label: billingProfileLabel(allBillingExpanded.profile)
                        },
                        network: {
                            id: profile.network_id,
                            label: billingNetworkLabel(allBillingExpanded.network)
                        },
                        start: profile.start || profile.effective_start_time,
                        end: profile.stop
                    }
                })
                .filter(Boolean)
                .reverse()
        },
        isActiveBillingProfile () {
            return (billingProfileItem, index) => (
                billingProfileItem.profile.id === this.customerContext?.billing_profile_id && index === this.customerContext?.billing_profiles.length
            )
        }
    }
}
</script>
