<template>
    <aui-page-preferences
        preferences-id="reseller"
        list-route="/reseller"
        resource="resellers"
        :resource-singular="$t('Reseller')"
        resource-name-field="name"
        resource-data="resellerpreferences"
        resource-schema="resellerpreferencedefs"
        :preferences-extension="preferencesExtension"
    />
</template>
<script>
import AuiPagePreferences from 'pages/AuiPagePreferences'

export default {
    name: 'AuiPageResellerPreferences',
    components: {
        AuiPagePreferences
    },
    computed: {
        preferencesExtension () {
            return {
                cdr_export_sclidui_rwrs: {
                    type: 'select-lazy',
                    getter: 'rewriteRuleSets/filteredRewriteRuleSetOptions',
                    action: 'rewriteRuleSets/filterRewriteRuleSets'
                }
            }
        }
    }
}
</script>
