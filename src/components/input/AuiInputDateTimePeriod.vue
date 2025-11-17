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
                v-model="data.end"
                :past-selectable="false"
                :past-threshold="data.start"
                :disable="data.start === null"
                :error="errorEnd"
                :error-message="errorMessageEnd"
                v-bind="$attrs"
                @input="emitInput($event, 'end')"
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
        errorEnd: {
            type: Boolean,
            default: false
        },
        errorMessageEnd: {
            type: String,
            default: null
        }
    },
    emits: ['input'],
    data () {
        return {
            data: {
                start: null,
                end: null
            }
        }
    },
    computed: {
        cssClasses () {
            const classes = [
                'row'
            ]
            if (this.columnGutterSize) {
                classes.push('q-col-gutter-' + this.columnGutterSize)
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
                this.data.end = null
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
                    end: null
                }
            } else {
                this.data = {
                    start: this.value.start ?? null,
                    end: this.value.end ?? this.value.stop ?? null
                }
            }
        },
        emitInput ($event, type) {
            if (type === 'start') {
                this.data.start = $event
            } else {
                this.data.end = $event
            }
            this.$emit('input', this.data)
        }
    }
}
</script>
