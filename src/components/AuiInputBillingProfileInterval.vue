<template>
    <div
        class="row"
    >
        <div
            class="col-6"
        >
            <q-input
                v-model="start"
                class="col q-mr-md"
                dense
                clearable
                readonly
                mask="####-##-## ##:##"
                :label="$t('Start')"
                :rules="[ isValidDateTime ]"
                :error="$v.start.$error"
                :error-message="$errMsg($v.start)"
            >
                <template v-slot:prepend>
                    <q-icon
                        name="event"
                        class="cursor-pointer"
                    >
                        <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                        >
                            <q-date
                                v-model="start"
                                mask="YYYY-MM-DD HH:mm"
                                @input="$emit('startInput', {value: start, index: index})"
                            >
                                <div class="row items-center justify-end">
                                    <q-btn
                                        v-close-popup
                                        label="Close"
                                        color="primary"
                                        flat
                                    />
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-icon>
                </template>
                <template v-slot:append>
                    <q-icon
                        name="access_time"
                        class="cursor-pointer"
                    >
                        <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                        >
                            <q-time
                                v-model="start"
                                mask="YYYY-MM-DD HH:mm"
                                @input="$emit('startInput', {value: start, index: index})"
                            >
                                <div class="row items-center justify-end">
                                    <q-btn
                                        v-close-popup
                                        label="Close"
                                        color="primary"
                                        flat
                                    />
                                </div>
                            </q-time>
                        </q-popup-proxy>
                    </q-icon>
                </template>
                <q-tooltip
                    anchor="top middle"
                    self="center middle"
                >
                    {{ $t('The datetime (YYYY-MM-DD HH:mm) when the billing profile gets active') }}
                </q-tooltip>
            </q-input>
        </div>
        <div
            class="col-6"
        >
            <q-input
                v-model="stop"
                class="col"
                dense
                clearable
                readonly
                mask="####-##-## ##:##"
                :label="$t('End')"
                :rules="[ isValidDateTime, isValidEndTime ]"
                :error="$v.stop.$error"
                :error-message="$errMsg($v.stop)"
            >
                <template v-slot:prepend>
                    <q-icon
                        name="event"
                        class="cursor-pointer"
                    >
                        <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                        >
                            <q-date
                                v-model="stop"
                                mask="YYYY-MM-DD HH:mm"
                                @input="$emit('endInput', {value: stop, index: index})"
                            >
                                <div class="row items-center justify-end">
                                    <q-btn
                                        v-close-popup
                                        label="Close"
                                        color="primary"
                                        flat
                                    />
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-icon>
                </template>
                <template v-slot:append>
                    <q-icon
                        name="access_time"
                        class="cursor-pointer"
                    >
                        <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                        >
                            <q-time
                                v-model="stop"
                                mask="YYYY-MM-DD HH:mm"
                                @input="$emit('endInput', {value: stop, index: index})"
                            >
                                <div class="row items-center justify-end">
                                    <q-btn
                                        v-close-popup
                                        label="Close"
                                        color="primary"
                                        flat
                                    />
                                </div>
                            </q-time>
                        </q-popup-proxy>
                    </q-icon>
                </template>
                <q-tooltip
                    anchor="top middle"
                    self="center middle"
                >
                    {{ $t('The datetime (YYYY-MM-DD HH:mm) when the billing profile gets revoked') }}
                </q-tooltip>
            </q-input>
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { date } from 'quasar'
export default {
    name: 'AuiInputBillingProfileInterval',
    props: {
        index: {
            type: Number,
            default: undefined
        },
        initialValue: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            start: null,
            stop: null
        }
    },
    validations: {
        start: {
            required
        },
        stop: {
            required
        }
    },
    mounted () {
        if (this.initialValue) {
            this.start = this.initialValue.start
            this.stop = this.initialValue.stop
        }
    },
    methods: {
        isValidDateTime (datetime) {
            const today = date.formatDate(Date.now(), 'YYYY/MM/DD')
            const diff = date.getDateDiff(new Date(datetime), new Date(today))
            if (diff < 0) {
                return this.$t('Dates prior to today are not allowed')
            } else if (datetime && !date.isValid(datetime)) {
                return this.$t('Allowed format: YYYY-MM-DD HH:mm')
            }
        },
        isValidEndTime (datetime) {
            return ((datetime && date.getDateDiff(new Date(datetime), new Date(this.start), 'minutes') > 0) || this.$t('End date should succeed start date'))
        },
        touch () {
            this.$v.$touch()
        }
    }
}
</script>
