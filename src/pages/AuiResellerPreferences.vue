<template>
    <aui-preferences-context
        preferences-id="reseller"
        list-route="/reseller"
        resource="resellers"
        :resource-singular="$t('Reseller')"
        resource-name-field="name"
        resource-data="resellerpreferences"
        resource-schema="resellerpreferencedefs"
        :preference-extension="preferenceExtension"
        :readonly="!$aclCan('update', 'entity.resellers')"
    />
</template>
<script>
import AuiPreferencesContext from 'pages/AuiPreferencesContext'

export default {
    name: 'AuiPageResellerPreferences',
    components: {
        AuiPreferencesContext
    },
    computed: {
        preferenceExtension () {
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
