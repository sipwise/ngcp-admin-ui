<template>
    <div>
        <template
            v-if="data && data.length > 0"
        >
            <div
                v-for="(number, index) in data"
                :key="index"
                class="row q-col-gutter-md q-mb-md"
            >
                <div
                    class="col-3 no-wrap self-center"
                >
                    {{ index === 0 ? $t('Alias Number Range') : '' }}
                </div>
                <div
                    class="col-1"
                >
                    <q-input
                        v-model="data[index].cc"
                        dense
                        :label="$t('CC')"
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
                        v-model="data[index].ac"
                        dense
                        :label="$t('AC')"
                        @input="emitInput"
                    >
                        <q-tooltip>
                            {{ $t('Area Code, e.g. 212 for NYC or 1 for Vienna') }}
                        </q-tooltip>
                    </q-input>
                </div>
                <div
                    class="col-4"
                >
                    <q-input
                        v-model="data[index].sn"
                        dense
                        :label="$t('SB')"
                        @input="emitInput"
                    >
                        <q-tooltip>
                            {{ $t('Subscriber Base, e.g. 12345') }}
                        </q-tooltip>
                    </q-input>
                </div>
                <div
                    class="col-1"
                >
                    <q-input
                        v-model="data[index].range"
                        dense
                        :label="$t('SNRL')"
                        @input="emitInput"
                    >
                        <q-tooltip>
                            {{ $t('Subscriber Number Range Length, e.g. 2 for 1-212-12345xx') }}
                        </q-tooltip>
                    </q-input>
                </div>
                <div
                    class="col-1 self-center"
                >
                    <aui-clearable-button
                        @click="removeRange(index)"
                    />
                </div>
            </div>
        </template>
        <div
            class="row justify-start"
        >
            <div
                class="col col-4 offset-3"
            >
                <q-btn
                    class="full-width"
                    icon="add"
                    outline
                    size="sm"
                    color="primary"
                    :label="$t('Add alias number range')"
                    @click="addRange"
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
        value: {
            type: Array,
            default: undefined
        }
    },
    data () {
        return {
            data: this.getInitialValue()
        }
    },
    watch: {
        value (data) {
            this.data = data
        }
    },
    mounted () {
        this.emitInput()
    },
    methods: {
        generateEmptyRange () {
            return {
                cc: '',
                ac: '',
                sn: '',
                range: '',
                is_devid: false
            }
        },
        addRange () {
            this.data.push(this.generateEmptyRange())
            this.emitInput()
        },
        removeRange (index) {
            this.data.splice(index, 1)
            this.emitInput()
        },
        getInitialValue () {
            if (this.value) {
                return this.value
            } else {
                return [this.generateEmptyRange()]
            }
        },
        emitInput () {
            this.$emit('input', [
                ...this.data
            ])
        }
    }
}
</script>
