<template>
    <div>
        <aui-base-form-field>
            <q-input
                v-model="limit"
                :disable="loading"
                :label="limitLabel"
                data-cy="customer-fraud-limit"
                :error="$v.limit.$error"
                :error-message="$errMsg($v.limit)"
                dense
                clearable
                @blur="$v.limit.$touch()"
                @keypress.space.prevent
                @keydown.space.prevent
                @keyup.space.prevent
                @input="emitInput"
            >
                <q-tooltip>
                    {{ limitTooltipLabel }}
                </q-tooltip>
            </q-input>
        </aui-base-form-field>
        <aui-base-form-field>
            <q-item-section>
                <aui-selection-lock-level
                    v-model="lockLevel"
                    class="q-mb-md"
                    @input="emitInput"
                />
            </q-item-section>
        </aui-base-form-field>
        <aui-base-form-field>
            <template
                v-if="editableNotifications && editableNotifications.length > 0"
            >
                <template
                    v-for="(editableNotif, index) in editableNotifications"
                >
                    <q-item
                        :key="index"
                        class="no-padding"
                    >
                        <q-item-section>
                            <q-input
                                v-model.trim="notify[index]"
                                dense
                                clearable
                                :label="$t('Email')"
                                data-cy="notify-email"
                                :disable="loading"
                                :error="$v.notify.$each[index].$error"
                                :error-message="$errMsg($v.notify.$each[index])"
                                @blur="$v.notify.$each[index].$touch()"
                                @input="emitInput"
                            >
                                <q-tooltip>
                                    {{ $t('where e-mail notifications are sent') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                        <q-item-section
                            side
                        >
                            <q-btn
                                color="negative"
                                unelevated
                                dense
                                icon="delete"
                                size="sm"
                                :disable="loading"
                                @click="deleteEmail(index)"
                            />
                        </q-item-section>
                    </q-item>
                </template>
            </template>
            <q-item
                class="no-padding"
            >
                <q-item-section
                    class="aui-list-item-section-button"
                    side
                >
                    <q-btn
                        :label="$t('Add Email')"
                        color="primary"
                        icon="add"
                        size="sm"
                        unelevated
                        outline
                        :disable="loading"
                        @click="addEmail"
                    />
                </q-item-section>
            </q-item>
        </aui-base-form-field>
    </div>
</template>

<script>
import {
    numeric,
    email,
    required
} from 'vuelidate/lib/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectionLockLevel from 'components/AuiSelectionLockLevel'

export default {
    name: 'AuiCustomerFraudLimitSettings',
    components: { AuiBaseFormField, AuiSelectionLockLevel },
    props: {
        isMonthly: {
            type: Boolean,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        },
        value: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            limit: null,
            lockLevel: null,
            notify: null
        }
    },
    validations: {
        limit: {
            numeric
        },
        notify: {
            $each: {
                email,
                required
            }
        }
    },
    computed: {
        limitLabel () {
            return this.$t('Fraud Limit')
        },
        limitTooltipLabel () {
            return this.isMonthly ? this.$t('fraud detection threshold per month, specifying cents') : this.$t('fraud detection threshold per day, specifying cents')
        },
        editableNotifications () {
            const notifications = []
            if (this.notify && this.notify.length > 0) {
                this.notify.forEach((source, index) => {
                    if (this.relations && this.relations.notify && this.relations.notify[index]) {
                        notifications.push(source)
                    } else {
                        notifications.push(null)
                    }
                })
            }
            return notifications
        }
    },
    watch: {
        value: {
            handler (data) {
                this.limit = data.limit
                this.lockLevel = data.lockLevel
                this.notify = data.notify
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        addEmail () {
            this.notify.push(null)
            this.emitInput()
        },
        deleteEmail (index) {
            this.notify.splice(index, 1)
            this.emitInput()
        },
        emitInput () {
            const data = {
                isMonthly: this.isMonthly,
                limit: this.limit,
                lockLevel: this.lockLevel,
                notify: this.notify
            }
            this.$emit('input', data)
        }
    }
}
</script>
