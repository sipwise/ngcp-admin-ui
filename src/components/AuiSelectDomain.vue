<template>
    <aui-select-lazy
        :label="$t('Domain')"
        icon="fas fa-network-wired"
        clearable
        dense
        store-generator-name="selectLazy/domainList"
        :store-action-params="{
            resellerId: resellerId
        }"
        :load-initially="false"
        :create-buttons="{ to: { name: 'domainCreation' }}"
        v-bind="$attrs"
        v-on="$listeners"
    />
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
    name: 'AuiSelectDomain',
    components: {
        AuiSelectLazy
    },
    props: {
        resellerId: {
            type: Number,
            default: null
        }
    },
    data () {
        return {}
    }
}
</script>
