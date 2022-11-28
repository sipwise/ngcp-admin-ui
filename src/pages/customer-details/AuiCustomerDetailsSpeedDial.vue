<template>
    <aui-base-sub-context>
        <div
            v-if="!$wait.is(downloadWaitIdentifier) && customerContext && !customerContextHasSubscribers"
            class="proxy-warning q-pa-xs text-left q-pb-lg"
        >
            <q-icon
                name="warning"
                size="xs"
                color="warning"
            />
            {{ $t('At least a subscriber has to be created before adding speeddials.') }}
        </div>
        <aui-data-table
            v-if="customerContext"
            ref="dataTable"
            table-id="customerspeeddials"
            row-key="id"
            title=""
            resource="customerspeeddials"
            :resource-default-filters="() => ({
                customer_id: customerContext.id
            })"
            resource-type="api"
            :use-api-v2="true"
            :resource-singular="$t('Speed Dial')"
            :columns="columns"
            :searchable="true"
            :addable="false"
            :editable="false"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
        >
            <template
                #list-actions
            >
                <aui-list-action
                    class="q-ml-sm"
                    icon="edit"
                    :label="$t('Edit')"
                    :disable="customerContext && !customerContextHasSubscribers"
                    :to="{ name: 'customerDetailsSpeedDialEdit', params: { id: customerContext.id}}"
                />
            </template>
        </aui-data-table>
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import AuiListAction from 'components/AuiListAction'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiCustomerDetailsSpeedDial',
    components: {
        AuiBaseSubContext,
        AuiDataTable,
        AuiListAction
    },
    mixins: [
        dataTable,
        dataTableColumn,
        customerContextMixin
    ],
    computed: {
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('Id'),
                    field: 'id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'slot',
                    label: this.$t('Slot'),
                    field: 'slot',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'destination',
                    label: this.$t('Destination'),
                    field: 'destination',
                    sortable: true,
                    align: 'left'
                }
            ]
        },
        downloadWaitIdentifier () {
            return WAIT_PAGE
        }
    },
    async mounted () {
        await this.fetchCustomerContextSubscribers()
    }
}
</script>
