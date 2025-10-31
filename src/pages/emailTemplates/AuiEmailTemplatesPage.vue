<template>
    <aui-base-page
        class="row no-wrap"
        :loading="$attrs.loading || $wait.is('aui-data-table-*')"
        v-bind="$attrs"
    >
        <q-list
            class="col-auto q-pl-md q-pt-md"
        >
            <aui-main-menu-item
                v-for="(item, index) in menuItems"
                :key="index"
                :label="item.label"
                :icon="item.icon"
                :to="item.to"
            />
        </q-list>
        <aui-email-templates-list
            v-if="!showCustom"
            class="aui-emailtemplates-list col overflow-auto"
            :show-custom="false"
        />
        <aui-email-templates-list
            v-if="showCustom"
            class="aui-emailtemplates-list col overflow-auto"
            :show-custom="true"
        />
    </aui-base-page>
</template>

<script>
import AuiMainMenuItem from 'components/AuiMainMenuItem'
import AuiBasePage from 'pages/AuiBasePage'
import AuiEmailTemplatesList from 'pages/emailTemplates/AuiEmailTemplatesList'
import emailTemplatesContextMixing from 'src/mixins/data-context-pages/email-templates'
export default {
    name: 'AuiEmailTemplatesPage',
    components: { AuiEmailTemplatesList, AuiMainMenuItem, AuiBasePage },
    mixins: [
        emailTemplatesContextMixing
    ],
    props: {
        showCustom: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        menuItems () {
            return [
                {
                    label: this.$t('Custom Templates'),
                    icon: 'fas fa-user',
                    to: { name: 'emailTemplatePageCustom' }
                },
                {
                    label: this.$t('Default Templates'),
                    icon: 'fas fa-envelope',
                    to: { name: 'emailTemplatePageDefault' }
                }
            ]
        }
    }
}
</script>
<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'
.aui-emailtemplates-list
    padding: $aui-page-padding
</style>
