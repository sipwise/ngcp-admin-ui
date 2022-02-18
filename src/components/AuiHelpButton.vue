<template>
    <div>
        <q-btn
            icon="help"
            size="md"
            color="white"
            flat
            dense
            round
            target="_blank"
            :disable="!helpButtonUrl"
            :href="helpButtonUrl"
        />
        <q-tooltip
            v-if="!helpButtonUrl"
        >
            {{ $t('No help available for this page') }}
        </q-tooltip>
    </div>
</template>

<script>

import helpButtonMap from 'src/help-button-map'

export default {
    name: 'AuiHelpButton',
    computed: {
        helpButtonUrl () {
            const lastRoute = this.$route.matched[this.$route.matched.length - 1]
            return helpButtonMap(lastRoute.path)
        }
    }
}
</script>
