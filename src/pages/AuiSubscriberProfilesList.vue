<template>
    <aui-base-list-page
        acl-resource="entity.subscriberprofilesets"
        :add-button-routes="[{ name: 'subscriberProfilesCreate'}]"
        :row-action-route-names="[
            'subscriberProfilesEdit',
            'subscriberProfilesClone',
            'subscriberProfilesPreferences',
            'subscriberProfileSetList'
        ]"
        :row-action-route-intercept="rowActionRouteIntercept"
    >
        <aui-data-table
            ref="table"
            table-id="subscriberprofiles"
            resource="subscriberprofiles"
            resource-base-path="subscriberprofile"
            resource-search-field="name"
            resource-type="api"
            resource-alt="subscriberprofile/ajax"
            :resource-singular="$t('Subscriber Profiles')"
            row-key="id"
            :title="$t('Subscriber Profiles')"
            :columns="columns"
            :searchable="true"
            :editable="false"
            :row-editable="() => true"
            :addable="true"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
            :row-menu-route-names="[
                'subscriberProfilesClone',
                'subscriberProfilesPreferences',
                'subscriberProfilesEdit'
            ]"
            :row-menu-route-intercept="rowActionRouteIntercept"
        />
    </aui-base-list-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'AuiSubscriberProfilesList',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
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
            // eslint-disable-next-line camelcase
            if (row?.profile_set_id) {
                route.params.profileSetId = row.profile_set_id
            }
            return route
        }
    }
}
</script>
