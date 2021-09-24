<template>
    <div
        class="row"
    >
        <div
            v-for="(number, index) in data"
            :key="index"
            class="row q-mb-sm"
        >
            <div
                class="col-3 q-mt-md"
            >
                {{ index === 0 ? $t('Alias Number Range') : '' }}
            </div>
            <div
                class="col-9 row"
            >
                <q-input
                    class="col-2 q-pr-md"
                    dense
                    :label="$t('CC')"
                    :value="number.cc"
                    @input="$emit('input', { index: index, field: 'cc', value: $event})"
                >
                    <q-tooltip>
                        {{ $t('Country Code, e.g. 1 for US or 43 for Austria') }}
                    </q-tooltip>
                </q-input>
                <q-input
                    class="col-2 q-pr-md"
                    dense
                    :label="$t('AC')"
                    :value="number.ac"
                    @input="$emit('input', { index: index, field: 'ac', value: $event})"
                >
                    <q-tooltip>
                        {{ $t('Area Code, e.g. 212 for NYC or 1 for Vienna') }}
                    </q-tooltip>
                </q-input>
                <q-input
                    class="col-5 q-pr-md"
                    dense
                    :label="$t('SB')"
                    :value="number.sn"
                    @input="$emit('input', { index: index, field: 'sn', value: $event})"
                >
                    <q-tooltip>
                        {{ $t('Subscriber Base, e.g. 12345') }}
                    </q-tooltip>
                </q-input>
                <q-input
                    class="col-2 q-pr-md"
                    dense
                    :label="$t('SNRL')"
                    :value="number.range"
                    @input="$emit('input', { index: index, field: 'range', value: $event})"
                >
                    <q-tooltip>
                        {{ $t('Subscriber Number Range Length, e.g. 2 for 1-212-12345xx') }}
                    </q-tooltip>
                </q-input>
                <aui-clearable-button
                    v-if="index < data.length-1"
                    class="col-1 q-mt-md"
                    @click="$emit('remove-range', index)"
                />
                <q-btn
                    v-if="index === data.length -1"
                    class="col-1 q-mt-md"
                    icon="add"
                    outline
                    dense
                    size="sm"
                    color="primary"
                    @click="$emit('add-range')"
                />
            </div>
        </div>
    </div>
</template>

<script>
import AuiClearableButton from 'components/buttons/AuiClearableButton'
export default {
    name: 'AuiAliasNumberRange',
    components: {
        AuiClearableButton
    },
    props: {
        initialValue: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            data: []
        }
    },
    computed: {},
    watch: {
        initialValue (data) {
            this.data = data
        }
    },
    mounted () {
        this.data = this.initialValue
    },
    methods: {}
}
</script>
