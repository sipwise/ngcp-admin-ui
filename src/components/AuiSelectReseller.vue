<template>
    <div
        class="row items-baseline q-col-gutter-sm"
    >
        <div
            class="col"
        >
            <aui-select-lazy
                icon="fas fa-users"
                :label="$t('Reseller')"
                clearable
                store-getter="resellers/filteredResellerOptions"
                store-action="resellers/filterResellers"
                :load-initially="false"
                :create-buttons="{ to: { name: 'resellerCreation' }}"
                v-bind="$attrs"
                v-on="$listeners"
            />
        </div>
    </div>
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
    name: 'AuiSelectReseller',
    components: {
        AuiSelectLazy
    }
}
</script>
