<template>
    <q-btn
        color="primary"
        unelevated
        flat
        icon-right="logout"
        :label="$t('Go to old admin panel')"
        @click="goToOldAdminPanel"
    >
        <q-menu
            no-parent-event
            persistent
            :value="goToOldAdminPanelInfo"
            transition-show="flip-up"
            transition-hide="flip-down"
        >
            <q-banner
                class="bg-info text-white"
                dense
                inline-actions
            >
                {{ $t('You can switch to the old admin panel at anytime') }}
                <template v-slot:action>
                    <q-btn
                        flat
                        color="white"
                        :label="$t('Close')"
                        @click="closeGoToOldAdminPanelInfo"
                    />
                </template>
                <template v-slot:avatar>
                    <q-icon
                        name="info"
                        color="white"
                    />
                </template>
            </q-banner>
        </q-menu>
    </q-btn>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    name: 'AuiGoToOldAdminPanel',
    computed: {
        ...mapState('user', [
            'goToOldAdminPanelInfo'
        ])
    },
    mounted () {
        this.loadGoToOldAdminPanelInfo()
    },
    methods: {
        ...mapActions('user', [
            'goToOldAdminPanel',
            'closeGoToOldAdminPanelInfo',
            'loadGoToOldAdminPanelInfo'
        ])
    }
}
</script>
