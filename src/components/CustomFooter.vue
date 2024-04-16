<template>
    <q-footer
        v-model="footerVisible"
        class="bg-white text-primary"
    >
        <q-toolbar>
            <q-toolbar-title />
            <aui-go-to-old-admin-panel />
        </q-toolbar>
    </q-footer>
</template>

<script>
import {
    mapState
} from 'vuex'
import AuiGoToOldAdminPanel from 'components/buttons/AuiGoToOldAdminPanel'
export default {
    name: 'CustomFooter',
    components: { AuiGoToOldAdminPanel },
    data () {
        return {
        }
    },
    computed: {
        ...mapState('layout', [
            'footerVisible'
        ])
    }
}
</script>
