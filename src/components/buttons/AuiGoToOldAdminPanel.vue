<template>
    <q-btn
        color="primary"
        unelevated
        flat
        icon-right="logout"
        :label="$t('Go to old admin panel')"
        @click="goToOldAdminPanel"
    />
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'AuiGoToOldAdminPanel',
    methods: {
        ...mapActions('user', [
            'goToOldAdminPanel'
        ])
    }
}
</script>
