<template>
    <q-page-container style="padding-top: 20px; padding-left: 30px;">
        <iframe
            v-for="iframe in iframes"
            :key="iframe.src"
            :src="iframe.src"
            :width="730"
            :height="300"
            frameborder="0"
            style="margin-right: 20px;"
        />
    </q-page-container>
</template>
<script>

export default {
    name: 'AuiMenuBasicTab',
    props: {
        iframes: {
            type: Array,
            required: true
        }
    }
}
</script>
