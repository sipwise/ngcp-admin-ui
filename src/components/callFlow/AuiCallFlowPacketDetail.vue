<template>
    <q-card
        v-if="frame"
        flat
        bordered
        class="aui-call-flow-packet-detail"
    >
        <q-card-section class="q-pb-none">
            <div class="text-caption text-grey-7">
                {{ $t('Packet #{number}', { number: frame.packet_number }) }} — {{ frame.timestamp }} — {{ frame.src_ip }}:{{ frame.src_port }} → {{ frame.dst_ip }}:{{ frame.dst_port }}
            </div>
        </q-card-section>
        <q-card-section>
            <pre class="aui-call-flow-packet-payload">{{ frame.payload }}</pre>
        </q-card-section>
    </q-card>
</template>

<script setup>
defineProps({
    frame: { type: Object, default: null }
})
</script>

<style scoped lang="sass">
.aui-call-flow-packet-payload
    white-space: pre-wrap
    word-break: break-all
    font-family: monospace
    font-size: 12px
    max-height: 300px
    overflow-y: auto
</style>
