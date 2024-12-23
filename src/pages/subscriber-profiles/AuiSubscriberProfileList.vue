<template>
    <aui-base-sub-context
        @refresh="refresh"
    >
        <aui-data-table
            v-if="subscriberProfileSetContext"
            ref="dataTable"
            table-id="subscriberprofiles"
            resource="subscriberprofiles"
            resource-base-path="subscriberprofile"
            resource-search-field="name"
            :resource-search-wildcard="true"
            resource-type="api"
            resource-alt="subscriberprofile/ajax"
            :resource-singular="$t('Subscriber Profiles')"
            :resource-default-filters="() => ({ profile_set_id: subscriberProfileSetContext.id })"
            row-key="id"
            :title="$t('Subscriber Profiles')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :row-editable="() => true"
            :addable="true"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
            :add-action-routes="[{ name: 'subscriberProfileCreate'}]"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                }
            ]"
        />
    </aui-base-sub-context>
</template>

<script>
import { required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import _ from 'lodash'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import subscriberProfileSetContextMixin from 'src/mixins/data-context-pages/subscriber-profile-set'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiSubscriberProfilesList',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        subscriberProfileSetContextMixin
    ],
    computed: {
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('Id'),
                    field: 'id',
                    sortable: true,
                    align: 'center'
                },
                {
                    name: 'profile_set_name',
                    label: this.$t('Profile Set'),
                    sortable: true,
                    align: 'left',
                    field: 'profile_set_id_expand.name',
                    expand: 'profile_set_id'
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Name must not be empty')
                        }
                    ]
                },
                {
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Description must not be empty')
                        }
                    ]
                },
                {
                    name: 'set_default',
                    label: this.$t('Default'),
                    field: 'set_default',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'toggle'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            if (_.includes(['subscriberProfileClone', 'subscriberProfileEdit', 'subscriberProfilePreferences'], route?.name)) {
                route.params.id = this.subscriberProfileSetContext.id
                route.params.profileId = row.id
            }
            return route
        },
        rowActions () {
            return [
                'subscriberProfileClone',
                'subscriberProfilePreferences',
                'subscriberProfileEdit'
            ]
        }
    }
}
</script>
