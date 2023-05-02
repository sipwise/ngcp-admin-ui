<template>
    <div
        class="row q-col-gutter-md"
    >
        <div
            class="col-2 text-body2 q-field__label self-center"
        >
            {{ phoneNumberLabel }}
        </div>
        <div
            class="col-1"
        >
            <q-input
                v-model="cc"
                :dense="$attrs.dense"
                :label="$t('CC')"
                :error="$attrs.error"
                debounce="300"
                @update:model-value="emitInput"
                @keyup.enter="keyEnter"
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
                v-model="ac"
                :dense="$attrs.dense"
                :label="$t('AC')"
                :error="$attrs.error"
                debounce="300"
                @update:model-value="emitInput"
                @keyup.enter="keyEnter"
            >
                <q-tooltip>
                    {{ $t('Area Code, e.g. 212 for NYC or 1 for Vienna') }}
                </q-tooltip>
            </q-input>
        </div>
        <div
            class="col-grow"
        >
            <q-input
                v-model="sn"
                :dense="$attrs.dense"
                :label="$t('SN')"
                :error="$attrs.error"
                :error-message="$attrs['error-message']"
                debounce="300"
                @update:model-value="emitInput"
                @keyup.enter="keyEnter"
            >
                <q-tooltip>
                    {{ $t('Subscriber Number, e.g. 12345678') }}
                </q-tooltip>
            </q-input>
        </div>
        <slot
            name="after-number"
        />
        <div
            v-if="hasDevId"
            class="col-auto self-center"
        >
            <q-toggle
                v-model="is_devid"
                :label="$t('Is Device ID')"
                @update:model-value="emitInput"
            />
        </div>
        <slot
            name="after"
        />
    </div>
</template>

<script>

export default {
    name: 'AuiPhoneNumber',
    props: {
        value: {
            type: Object,
            default: undefined
        },
        hasDevId: {
            type: Boolean,
            default: false
        }
    },
    emits: ['input', 'key-enter'],
    data () {
        return {
            cc: null,
            ac: null,
            sn: null,
            is_devid: false
        }
    },
    computed: {
        phoneNumberLabel () {
            if (this.$attrs.label) {
                return this.$attrs.label
            } else {
                return this.$t('E164 Number')
            }
        }
    },
    watch: {
        value: {
            handler (newValue) {
                if (newValue) {
                    this.cc = newValue.cc
                    this.ac = newValue.ac
                    this.sn = newValue.sn
                    if (this.hasDevId) {
                        this.is_devid = newValue.is_devid
                    }
                } else {
                    this.cc = null
                    this.ac = null
                    this.sn = null
                    this.is_devid = false
                }
            },
            immediate: true
        }
    },
    methods: {
        emitInput () {
            this.$emit('input', {
                ...(this.value ? this.value : {}),
                cc: this.cc,
                ac: this.ac,
                sn: this.sn,
                ...(this.hasDevId ? { is_devid: this.is_devid } : {})
            })
        },
        keyEnter () {
            this.$emit('key-enter')
        }
    }
}
</script>
