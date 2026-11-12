<template>
    <aui-base-form
        layout="6"
        dense-list
    >
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <template
            #col-1
        >
            <aui-base-form-field
                required
            >
                <aui-select-invoice-template
                    :model-value="formData.template_id"
                    dense
                    :disable="loading"
                    :error="hasFieldError('template_id')"
                    :error-message="getFieldError('template_id')"
                    @update:model-value="loadInvoiceTemplateCategory"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <aui-select-invoice-recipient
                    v-model="formData.customer_id"
                    dense
                    :disable="loading || !formData.template_id"
                    :icon="selectIcon"
                    :label="selectLabel"
                    :error="hasFieldError('customer_id')"
                    :error-message="getFieldError('customer_id')"
                    :category="currentCategory"
                    :reseller-id="currentResellerId"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    :model-value="formData.custom_period"
                    class="q-pb-md"
                    :label="$t('Custom period')"
                    data-cy="invoice-custom_period"
                    :disable="loading"
                    @update:model-value="setCustomPeriod"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="!formData.custom_period"
                required
            >
                <q-input
                    v-model="formData.period"
                    class="col q-mr-md"
                    dense
                    clearable
                    readonly
                    mask="####-##"
                    :label="$t('Invoice Period')"
                    :error="hasFieldError('period')"
                    :error-message="getFieldError('period')"
                >
                    <template #prepend>
                        <q-icon
                            name="event"
                            class="cursor-pointer"
                        >
                            <q-popup-proxy
                                ref="periodPopup"
                                transition-show="scale"
                                transition-hide="scale"
                            >
                                <q-date
                                    v-model="formData.period"
                                    class="aui-period-date"
                                    mask="YYYY-MM"
                                    default-view="Years"
                                    emit-immediately
                                    :navigation-max-year-month="maxYearMonth"
                                    @update:model-value="onPeriodPicked"
                                />
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                    <q-tooltip>
                        {{ $t('YYYY-MM') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field
                v-if="formData.custom_period"
                required
            >
                <aui-input-date-time
                    :value="formData.period_start"
                    dense
                    :label="$t('Start')"
                    :disable="loading"
                    :error="hasFieldError('period_start')"
                    :error-message="getFieldError('period_start')"
                    @input="setPeriodStart"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="formData.custom_period"
                required
            >
                <aui-input-date-time
                    :value="formData.period_end"
                    dense
                    has-end-date
                    :past-selectable="false"
                    :past-threshold="formData.period_start || undefined"
                    :label="$t('End')"
                    :disable="loading || !formData.period_start"
                    :error="hasFieldError('period_end')"
                    :error-message="getFieldError('period_end') || $t('End must be after Start')"
                    @input="setPeriodEnd"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectInvoiceRecipient from 'components/AuiSelectInvoiceRecipient'
import AuiSelectInvoiceTemplate from 'components/AuiSelectInvoiceTemplate'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiInputDateTime from 'components/input/AuiInputDateTime'
import { WAIT_PAGE } from 'src/constants'
import { getMonthPeriod, getPreviousMonth, toInvoiceCreateData } from 'src/helpers/invoices'
import baseFormMixin from 'src/mixins/base-form'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiNewInvoice',
    components: {
        AuiBaseFormField,
        AuiBaseForm,
        AuiInputDateTime,
        AuiSelectInvoiceRecipient,
        AuiSelectInvoiceTemplate
    },
    mixins: [baseFormMixin],
    data () {
        return {
            v$: useValidate(),
            currentCategory: null,
            currentResellerId: null
        }
    },
    validations () {
        const period = this.formData.custom_period
            ? {
                period_start: {
                    required
                },
                period_end: {
                    required,
                    // same format on both sides, so the strings compare as dates
                    afterStart: (value, { period_start: start }) => !value || !start || value > start
                }
            }
            : {
                period: {
                    required
                }
            }
        return {
            formData: {
                template_id: {
                    required
                },
                customer_id: {
                    required
                },
                ...period
            }
        }
    },
    computed: {
        getDefaultData () {
            return {
                customer_id: null,
                template_id: null,
                period: getPreviousMonth(),
                custom_period: false,
                period_start: null,
                period_end: null
            }
        },
        isCustomerCategory () {
            return ['customer', 'did'].includes(this.currentCategory)
        },
        selectIcon () {
            return this.isCustomerCategory ? 'fas fa-user-tie' : 'fas fa-handshake'
        },
        selectLabel () {
            return this.isCustomerCategory ? this.$t('Customers') : this.$t('Contracts')
        },
        maxYearMonth () {
            const now = new Date()
            return `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}`
        }
    },
    methods: {
        ...mapWaitingActions('invoices', {
            fetchInvoiceTemplateCategory: WAIT_PAGE
        }),
        async loadInvoiceTemplateCategory (templateId) {
            if (!templateId) {
                this.formData.template_id = templateId
                this.formData.customer_id = null
                this.currentCategory = null
                this.currentResellerId = null
                return
            }
            const { category, resellerId } = await this.fetchInvoiceTemplateCategory(templateId)
            this.formData.template_id = templateId
            this.formData.customer_id = null
            this.currentCategory = category
            this.currentResellerId = resellerId
        },
        postReset () {
            this.currentCategory = null
            this.currentResellerId = null
        },
        onPeriodPicked (value, reason) {
            if (reason === 'month') {
                this.$refs.periodPopup.hide()
            }
        },
        setCustomPeriod (customPeriod) {
            this.formData.custom_period = customPeriod
            if (customPeriod) {
                // start from the selected month, users change only what they need
                const { start, end } = getMonthPeriod(this.formData.period || getPreviousMonth())
                this.formData.period_start = start
                this.formData.period_end = end
            }
        },
        setPeriodStart (value) {
            this.formData.period_start = value
        },
        setPeriodEnd (value) {
            this.formData.period_end = value
        },
        getSubmitData () {
            return toInvoiceCreateData(this.cloneCurrentData())
        }
    }
}
</script>

<style lang="scss" scoped>
// QDate's month/year header title is a clickable link straight into the
// day-grid (Calendar) view. The period picker only supports year+month,
// so that escape hatch into the day view must stay unreachable.
// display:none (rather than pointer-events:none) also drops it from the
// tab order, so it can't be reached via keyboard focus + Enter either.
.aui-period-date :deep(.q-date__header-title-label) {
    display: none;
}
</style>
