<template>
    <div
        class="row q-col-gutter-md"
    >
        <div
            class="col-3 self-center"
        >
            {{ $t('E164 Number') }}
        </div>
        <div
            class="col-1"
        >
            <q-input
                v-model="data.cc"
                dense
                :label="$t('CC')"
                :error="$attrs.error"
                @input="emitInput"
            >
                <q-tooltip>
                    {{ $t('Country Code, e.g. 1 for US or 43 for Austria') }}
                </q-tooltip>
            </q-input>
        </div>
        <div
            class="col-2"
        >
            <q-input
                v-model="data.ac"
                dense
                :label="$t('AC')"
                :error="$attrs.error"
                @input="emitInput"
            >
                <q-tooltip>
                    {{ $t('Area Code, e.g. 212 for NYC or 1 for Vienna') }}
                </q-tooltip>
            </q-input>
        </div>
        <div
            class="col-6"
        >
            <q-input
                v-model="data.sn"
                dense
                :label="$t('SN')"
                :error="$attrs.error"
                :error-message="$attrs['error-message']"
                @input="emitInput"
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
        value: {
            type: Object,
            default: undefined
        }
    },
    data () {
        return {
            data: this.getInitialValue()
        }
    },
    watch: {
        value (newValue) {
            if (newValue) {
                this.data = {
                    cc: newValue.cc,
                    ac: newValue.ac,
                    sn: newValue.sn
                }
            } else {
                this.data = {
                    cc: null,
                    ac: null,
                    sn: null
                }
            }
        }
    },
    methods: {
        emitInput () {
            this.$emit('input', this.data)
        },
        getInitialValue () {
            if (this.value) {
                return {
                    cc: this.value.cc,
                    ac: this.value.ac,
                    sn: this.value.sn
                }
            } else {
                return {
                    cc: null,
                    ac: null,
                    sn: null
                }
            }
        }
    }
}
</script>
