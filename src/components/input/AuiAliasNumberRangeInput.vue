<template>
    <aui-phone-number
        :value="{ cc, ac, sn, is_devid }"
        :has-dev-id="true"
        :error="false"
        dense
        :label="$attrs.label"
        @input="emitNumber"
    >
        <template
            #after-number
        >
            <div
                class="col-1"
            >
                <q-input
                    v-model="range"
                    dense
                    debounce="300"
                    :label="$t('SNRL')"
                    @input="emitInput"
                >
                    <q-tooltip>
                        {{ $t('Subscriber Number Range Length, e.g. 2 for 1-212-12345xx') }}
                    </q-tooltip>
                </q-input>
            </div>
        </template>
        <template
            #after
        >
            <slot
                name="after"
            />
        </template>
    </aui-phone-number>
</template>
<script>
import AuiPhoneNumber from 'components/input/AuiPhoneNumber'
export default {
    name: 'AuiAliasNumberRangeInput',
    components: { AuiPhoneNumber },
    props: {
        value: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            cc: null,
            ac: null,
            sn: null,
            range: null,
            is_devid: false
        }
    },
    watch: {
        value: {
            handler (value) {
                if (value) {
                    this.cc = value.cc
                    this.ac = value.ac
                    this.sn = value.sn
                    this.range = value.range
                    this.is_devid = value.is_devid
                } else {
                    this.cc = null
                    this.ac = null
                    this.sn = null
                    this.range = null
                    this.is_devid = false
                }
            },
            immediate: true
        }
    },
    methods: {
        emitNumber (number) {
            this.cc = number.cc
            this.ac = number.ac
            this.sn = number.sn
            this.is_devid = number.is_devid
            this.emitInput()
        },
        emitInput () {
            this.$emit('input', { ...this.$data })
        }
    }
}
</script>
