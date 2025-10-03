<template>
    <q-btn
        color="primary"
        unelevated
        flat
        icon-right="logout"
        :label="'V.1'"
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
