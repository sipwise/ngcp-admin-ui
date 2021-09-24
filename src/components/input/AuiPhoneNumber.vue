<template>
    <div
        class="row"
    >
        <div
            class="col-3 q-pt-md"
        >
            {{ $t('E164 Number') }}
        </div>
        <div
            class="col-9 row"
        >
            <q-input
                class="col-2 q-pr-md"
                dense
                :label="$t('CC')"
                :value="data.cc"
                @input="$emit('input', { field: 'cc', value: $event})"
            >
                <q-tooltip>
                    {{ $t('Country Code, e.g. 1 for US or 43 for Austria') }}
                </q-tooltip>
            </q-input>
            <q-input
                class="col-2 q-pr-md"
                dense
                :label="$t('AC')"
                :value="data.ac"
                @input="$emit('input', { field: 'ac', value: $event})"
            >
                <q-tooltip>
                    {{ $t('Area Code, e.g. 212 for NYC or 1 for Vienna') }}
                </q-tooltip>
            </q-input>
            <q-input
                class="col-8 q-pr-md"
                dense
                :label="$t('SN')"
                :value="data.sn"
                @input="$emit('input', { field: 'sn', value: $event})"
            >
                <q-tooltip>
                    {{ $t('Subscriber Number, e.g. 12345678') }}
                </q-tooltip>
            </q-input>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AuiPhoneNumber',
    props: {
        initialValue: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            data: {
                sn: null,
                ac: null,
                cc: null
            }
        }
    },
    computed: {},
    watch: {},
    mounted () {
        this.data = this.initialValue
    },
    methods: {}
}
</script>
