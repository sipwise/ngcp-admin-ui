<template>
    <div
        class="row items-baseline q-col-gutter-sm"
    >
        <div
            class="col"
        >
            <aui-select-lazy
                icon="fas fa-address-card"
                :label="$t('Contact')"
                store-getter="contracts/filteredSystemContactsAsOptions"
                store-action="contracts/filterSystemContacts"
                v-bind="$attrs"
                v-on="$listeners"
            />
        </div>
        <div
            class="col col-auto"
        >
            <q-btn
                size="sm"
                icon="add"
                color="primary"
                unelevated
                :label="$t('Create')"
                :to="'/contact/create'"
            />
        </div>
    </div>
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
    name: 'AuiSelectContract',
    components: {
        AuiSelectLazy
    }
}
</script>
