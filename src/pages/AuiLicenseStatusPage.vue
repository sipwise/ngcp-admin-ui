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

            <div class="row justify-center q-pa-lg">
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

                <div class="fixed-center text-center">
                    {{ isSystemStatAvailable }}
                </div>
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
import { mapState } from 'vuex'
import AuiDoughnutChart from 'src/components/charts/AuiDoughnutChart'
import { date } from 'quasar'
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
            return apiToColorMap[this.platformInfo.license_meta?.check] || 'black'
        },
        licenseExpirationDateFormatted () {
            const timestamp = new Date(this.platformInfo.license_meta.license_valid_until * 1000)
            return date.formatDate(timestamp, 'DD/MM/YYYY')
        },
        licenses () {
            const allLicenses = [
                { name: 'aof', status: 'inactive' },
                { name: 'batch_provisioning', status: 'inactive' },
                { name: 'billing', status: 'inactive' },
                { name: 'call_recording', status: 'inactive' },
                { name: 'csc', status: 'inactive' },
                { name: 'csc_calls', status: 'inactive' },
                { name: 'csta', status: 'inactive' },
                { name: 'ct', status: 'inactive' },
                { name: 'device_provisioning', status: 'inactive' },
                { name: 'enforce', status: 'inactive' },
                { name: 'external_lnp', status: 'inactive' },
                { name: 'fax', status: 'inactive' },
                { name: 'gpu-transcoding', status: 'inactive' },
                { name: 'header_manipulation', status: 'inactive' },
                { name: 'invoice', status: 'inactive' },
                { name: 'lcr', status: 'inactive' },
                { name: 'lnp_importer', status: 'inactive' },
                { name: 'pbx', status: 'inactive' },
                { name: 'phonebook', status: 'inactive' },
                { name: 'prepaid-inewrate', status: 'inactive' },
                { name: 'prepaid-swrate', status: 'inactive' },
                { name: 'pushd', status: 'inactive' },
                { name: 'reseller', status: 'inactive' },
                { name: 'sms', status: 'inactive' },
                { name: 'tpcc', status: 'inactive' },
                { name: 'transcoding', status: 'inactive' },
                { name: 'voisniff-homer', status: 'inactive' },
                { name: 'voisniff-mysql_dump', status: 'inactive' },
                { name: 'voisniff-x2x3', status: 'inactive' },
                { name: 'xmpp', status: 'inactive' }
            ]

            allLicenses.forEach((license, index) => {
                if (this.platformInfo.licenses.includes(license.name)) {
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

/*

*/
