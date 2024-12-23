<template>
    <q-page
        class="q-pa-lg justify-center"
    >
        <div class="q-pa-md">
            <div class="row justify-center">
                <h1 class="text-h3">
                    <q-icon
                        name="fas fa-lightbulb"
                        class="text-h4 q-pa-md"
                        :color="statusColor"
                    />
                    {{ $t('License Status') }}
                </h1>
            </div>

            <p
                v-if="platformInfo.license_meta.check !== 'ok'"
                class="text-negative text-center text-weight-bold"
            >
                {{ platformInfo.license_meta.check }}
            </p>

            <div
                v-if="platformInfo.licenses"
                class="row justify-center q-pa-lg"
            >
                <aui-doughnut-chart
                    class="aui-doughnut-chart q-pa-xs"
                    :chart-id="$t('Calls')"
                    :max-value="platformInfo.license_meta.max_calls"
                    :current-value="platformInfo.license_meta.current_calls"
                />

                <aui-doughnut-chart
                    class="aui-doughnut-chart q-pa-xs"
                    :chart-id="$t('Subscribers')"
                    :max-value="platformInfo.license_meta.max_subscribers"
                    :current-value="platformInfo.license_meta.current_subscribers"
                />

                <aui-doughnut-chart
                    class="aui-doughnut-chart"
                    :chart-id="$t('PBX Subscribers')"
                    :max-value="platformInfo.license_meta.max_pbx_subscribers"
                    :current-value="platformInfo.license_meta.current_pbx_subscribers"
                />

                <aui-doughnut-chart
                    class="aui-doughnut-chart"
                    :chart-id="$t('PBX Groups')"
                    :max-value="platformInfo.license_meta.max_pbx_groups"
                    :current-value="platformInfo.license_meta.current_pbx_groups"
                />

                <aui-doughnut-chart
                    class="aui-doughnut-chart"
                    :chart-id="$t('Registered Subscribers')"
                    :max-value="platformInfo.license_meta.max_registered_subscribers"
                    :current-value="platformInfo.license_meta.current_registered_subscribers"
                />
            </div>

            <h6 class="text-body1 text-weight-bold">
                {{ $t('License valid until') }} {{ licenseExpirationDateFormatted }}
            </h6>

            <h2 class="text-h4 text-center">
                {{ $t('Available Licenses') }}
            </h2>
            <div class="q-pa-lg q-mt-lg row justify-center">
                <div
                    v-for="(license, index) in licenses"
                    :key="index"
                    class="q-gutter-xs"
                >
                    <q-chip
                        color="white"
                        class="chip q-pa-md q-mt-md"
                    >
                        <q-avatar
                            v-if="license.status === 'inactive'"
                            color="red"
                            text-color="white"
                        />
                        <q-avatar
                            v-if="license.status === 'active'"
                            color="green"
                            text-color="white"
                        />

                        {{ license.name }}
                    </q-chip>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import AuiDoughnutChart from 'components/charts/AuiDoughnutChart'
import { date } from 'quasar'
import { mapState } from 'vuex'
export default {
    name: 'AuiLicenseStatusPage',
    components: { AuiDoughnutChart },
    computed: {
        ...mapState('user', [
            'platformInfo'
        ]),
        statusColor () {
            const apiToColorMap = {
                error: 'negative',
                warning: 'warning',
                ok: 'positive'
            }
            return apiToColorMap[this.platformInfo.license_meta?.check] || 'negative'
        },
        licenseExpirationDateFormatted () {
            const timestamp = new Date(this.platformInfo.license_meta.license_valid_until * 1000)
            return date.formatDate(timestamp, 'DD/MM/YYYY')
        },
        licenses () {
            const allLicenses = [
                { type: 'aof', status: 'inactive', name: 'Advice of Charge' },
                { type: 'batch_provisioning', status: 'inactive', name: 'Batch Provisioning' },
                { type: 'billing', status: 'inactive', name: 'CDR Rating Engine' },
                { type: 'call_recording', status: 'inactive', name: 'Call Recording' },
                { type: 'csc', status: 'inactive', name: 'User CSC' },
                { type: 'csc_calls', status: 'inactive', name: 'CSC WebRTC calls' },
                { type: 'csta', status: 'inactive', name: 'CSTA communication' },
                { type: 'ct', status: 'inactive', name: 'Call Transfer' },
                { type: 'device_provisioning', status: 'inactive', name: 'Device Provisioning' },
                { type: 'enforce', status: 'inactive', name: 'License Enforcement' },
                { type: 'external_lnp', status: 'inactive', name: 'External LNP' },
                { type: 'fax', status: 'inactive', name: 'Fax' },
                { type: 'gpu-transcoding', status: 'inactive', name: 'GPU Transcoding' },
                { type: 'header_manipulation', status: 'inactive', name: 'Header Manipulation' },
                { type: 'invoice', status: 'inactive', name: 'Invoice Generation' },
                { type: 'lcr', status: 'inactive', name: 'Least Cost Routing' },
                { type: 'lnp_importer', status: 'inactive', name: 'LNP Dataset Importer' },
                { type: 'pbx', status: 'inactive', name: 'CloudPBX' },
                { type: 'phonebook', status: 'inactive', name: 'Phonebook' },
                { type: 'prepaid-inewrate', status: 'inactive', name: 'Alternative Prepaid Engine' },
                { type: 'prepaid-swrate', status: 'inactive', name: 'Prepaid Engine' },
                { type: 'pushd', status: 'inactive', name: 'Mobile Push' },
                { type: 'reseller', status: 'inactive', name: 'Reseller Creation' },
                { type: 'sms', status: 'inactive', name: 'SMS' },
                { type: 'tpcc', status: 'inactive', name: 'Third Party Call Control' },
                { type: 'transcoding', status: 'inactive', name: 'Transcoding' },
                { type: 'voisniff-homer', status: 'inactive', name: 'Homer Integration' },
                { type: 'voisniff-mysql_dump', status: 'inactive', name: ' Call Capture' },
                { type: 'voisniff-x2x3', status: 'inactive', name: 'Lawful Interception' },
                { type: 'xmpp', status: 'inactive', name: 'XMPP' }
            ]

            allLicenses.forEach((license, index) => {
                if (this.platformInfo.licenses.includes(license.type)) {
                    allLicenses[index].status = 'active'
                }
            })

            return allLicenses
        }
    }
}
</script>
<style lang="sass" rel="stylesheet/sass" scoped>
.aui-doughnut-chart
    height: 160px
    width: 230px
    text-align: center
.chip
    width: 200px
</style>
