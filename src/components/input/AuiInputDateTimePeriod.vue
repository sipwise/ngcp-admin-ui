<template>
    <div
        :class="cssClasses"
    >
        <div
            class="col-6"
        >
            <aui-input-date-time
                v-model="data.start"
                :past-selectable="pastSelectable"
                :error="errorStart"
                :error-message="errorMessageStart"
                v-bind="$attrs"
                @input="emitInput($event, 'start')"
            />
        </div>
        <div
            class="col-6"
        >
            <aui-input-date-time
                v-model="data.stop"
                :past-selectable="false"
                :past-threshold="data.start"
                :disable="data.start === null"
                :error="errorStop"
                :error-message="errorMessageStop"
                v-bind="$attrs"
                @input="emitInput($event, 'stop')"
            />
        </div>
    </div>
</template>

<script>
import AuiInputDateTime from 'components/input/AuiInputDateTime'

export default {
    name: 'AuiInputDateTimePeriod',
    components: { AuiInputDateTime },
    props: {
        value: {
            type: Object,
            default: null
        },
        columnGutterSize: {
            type: String,
            default: 'md'
        },
        pastSelectable: {
            type: Boolean,
            default: false
        },
        errorStart: {
            type: Boolean,
            default: false
        },
        errorMessageStart: {
            type: String,
            default: null
        },
        errorStop: {
            type: Boolean,
            default: false
        },
        errorMessageStop: {
            type: String,
            default: null
        }
    },
    emits: ['input'],
    data () {
        return {
            data: {
                start: null,
                stop: null
            }
        }
    },
    computed: {
        cssClasses () {
            const classes = [
                'row'
            ]
            if (this.columnGutterSize) {
                classes.push(`q-col-gutter-${this.columnGutterSize}`)
            }
            return classes
        }
    },
    watch: {
        value () {
            this.syncData()
        },
        'data.start' (value) {
            if (value === undefined || value === null) {
                this.data.stop = null
            }
        }
    },
    beforeMount () {
        this.syncData()
    },
    methods: {
        syncData () {
            if (this.value === null) {
                this.data = {
                    start: null,
                    stop: null
                }
            } else {
                this.data = this.value
            }
        },
        emitInput ($event, type) {
            if (type === 'start') {
                this.data.start = $event
            } else {
                this.data.stop = $event
            }
            this.$emit('input', this.data)
        }
    }
}
</script>
