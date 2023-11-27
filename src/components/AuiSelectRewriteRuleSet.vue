<template>
    <aui-select-lazy
        :label="$t('Rewrite Rule Set')"
        clearable
        dense
        store-generator-name="selectLazy/rewriteRuleSetsList"
        :store-action-params="{
            reseller_id: resellerId,
        }"
        :load-initially="false"
        v-bind="$attrs"
    >
        <template
            v-for="(_, slotName) of $slots"
            #[slotName]="scope"
        >
            <slot
                :name="slotName"
                v-bind="scope"
            />
        </template>
    </aui-select-lazy>
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
    name: 'AuiSelectRewriteRuleSet',
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
