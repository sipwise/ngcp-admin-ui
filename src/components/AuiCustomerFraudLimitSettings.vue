<template>
    <div>
        <aui-base-form-field>
            <q-input
                v-model="limit"
                :disable="!canEdit || loading"
                :label="limitLabel"
                data-cy="customer-fraud-limit"
                :error="v$.limit.$errors.length > 0"
                :error-message="$errMsg(v$.limit.$errors)"
                dense
                clearable
                @blur="v$.limit.$touch()"
                @keypress.space.prevent
                @keydown.space.prevent
                @keyup.space.prevent
                @update:model-value="emitInput"
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
                    :disable="!canEdit || loading"
                    @update:model-value="emitInput"
                />
            </q-item-section>
        </aui-base-form-field>
        <aui-base-form-field>
            <template
                v-if="notify && notify.length > 0"
            >
                <q-item
                    v-for="(editableNotif, index) in notify"
                    :key="index"
                    class="no-padding"
                >
                    <q-item-section>
                        <q-input
                            v-model.trim="notify[index].value"
                            dense
                            clearable
                            :label="$t('Email')"
                            data-cy="notify-email"
                            :disable="loading"
                            :error="v$.$error && v$.notify.$each.$response.$errors[index].value.length > 0"
                            :error-message="$errMsg(v$.notify.$each.$response.$errors[index].value)"
                            @blur="v$.$touch()"
                            @update:model-value="emitInput"
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
                        :disable="!canEdit || loading"
                        @click="addEmail"
                    />
                </q-item-section>
            </q-item>
        </aui-base-form-field>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    numeric,
    email,
    required,
    helpers
} from '@vuelidate/validators'
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
        notifyData: {
            type: Array,
            required: true
        },
        limitData: {
            type: [String, Number],
            default: null
        },
        lockLevelData: {
            type: [String, Number],
            default: null
        }
    },
    emits: ['input'],
    data () {
        return {
            v$: useValidate(),
            notify: [],
            limit: null,
            lockLevel: null
        }
    },
    validations () {
        return {
            limit: {
                numeric
            },
            notify: {
                $each: helpers.forEach({
                    value: {
                        email,
                        required
                    }
                })
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
        canEdit () {
            return this.$aclCan('update', 'entity.subscribers')
        }
    },
    watch: {
        notifyData: {
            handler (data) {
                this.notify = data.map((item) => { return { value: item } })
            },
            deep: true,
            immediate: true
        },
        limitData: {
            handler (data) {
                this.limit = data
            },
            deep: true,
            immediate: true
        },
        lockLevelData: {
            handler (data) {
                this.lockLevel = data
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        addEmail () {
            this.notify.push({ value: '' })
            this.emitInput()
        },
        deleteEmail (index) {
            this.notify.splice(index, 1)
            this.emitInput()
        },
        emitInput () {
            const notify = this.notify.map((item) => item?.value)
            const data = {
                isMonthly: this.isMonthly,
                limit: this.limit,
                lockLevel: this.lockLevel,
                notify
            }
            this.$emit('input', data)
        }
    }
}
</script>
