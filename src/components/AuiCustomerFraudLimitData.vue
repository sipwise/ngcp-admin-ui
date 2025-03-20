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
                    :disable="!canEdit || loading"
                    :readonly="true"
                    :label="$t('Source')"
                    data-cy="aui-customerfraudlimits-source"
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
                    :disable="!canEdit || loading"
                    :readonly="true"
                    :label="$t('Fraud limit')"
                    data-cy="aui-customerfraudlimits-fraudlimit"
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
                    :disable="!canEdit || loading"
                    :readonly="true"
                    :label="$t('Lock level')"
                    data-cy="aui-customerfraudlimits-locklevel"
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
                    data-cy="aui-customerfraudlimits-notify"
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
    },
    computed: {
        canEdit () {
            return this.$aclCan('update', 'entity.subscribers')
        }
    }
}
</script>
