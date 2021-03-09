<template>
    <q-page
        class="q-pa-lg"
    >
        <div
            class="row q-col-gutter-lg justify-start"
        >
            <aui-data-table-banned-ips
                class="col-xs-12 col-lg-6"
            />
            <aui-data-table-banned-users
                class="col-xs-12 col-lg-6"
            />
        </div>
    </q-page>
</template>

<script>
import AuiDataTableBannedIps from 'components/AuiDataTableBannedIps'
import AuiDataTableBannedUsers from 'components/AuiDataTableBannedUsers'
export default {
    name: 'AuiPageSecurityBans',
    components: {
        AuiDataTableBannedUsers,
        AuiDataTableBannedIps
    },
    computed: {
    }
}
</script>
