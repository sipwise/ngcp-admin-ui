<template>
    <q-list
        dense
    >
        <q-item>
            <q-item-section>
                <q-input
                    :model-value="source"
                    dense
                    borderless
                    :error="false"
                    :readonly="true"
                    :label="$t('Source')"
                />
            </q-item-section>
        </q-item>
        <q-item
            v-if="isBillingProfileSource && fraudLimit"
        >
            <q-item-section>
                <q-input
                    :model-value="fraudLimit"
                    dense
                    borderless
                    :error="false"
                    :readonly="true"
                    :label="$t('Fraud limit')"
                />
            </q-item-section>
        </q-item>
        <q-item
            v-if="isBillingProfileSource && lockLevel"
        >
            <q-item-section>
                <aui-selection-lock-level
                    :model-value="lockLevel"
                    dense
                    borderless
                    :error="false"
                    :readonly="true"
                    :label="$t('Lock level')"
                />
            </q-item-section>
        </q-item>
        <q-item
            v-if="isBillingProfileSource && notify"
        >
            <q-item-section>
                <q-input
                    :model-value="notify"
                    dense
                    borderless
                    :error="false"
                    :readonly="true"
                    :label="$t('Notify')"
                />
            </q-item-section>
        </q-item>
    </q-list>
</template>

<script>
import AuiSelectionLockLevel from 'components/AuiSelectionLockLevel'
export default {
    name: 'AuiCustomerFraudLimitData',
    components: { AuiSelectionLockLevel },
    props: {
        isBillingProfileSource: {
            type: Boolean,
            default: false
        },
        source: {
            type: String,
            default: undefined
        },
        fraudLimit: {
            type: Number,
            default: undefined
        },
        lockLevel: {
            type: String,
            default: undefined
        },
        notify: {
            type: String,
            default: undefined
        }
    }
}
</script>
