<template>
    <aui-base-page
        class="row no-wrap"
        :loading="$attrs.loading || $wait.is('aui-data-table-*')"
        v-bind="$attrs"
    >
        <q-list
            class="q-pl-md q-pt-md"
            style="width: 280px;"
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
            class="aui-emailtemplates-list"
            :show-custom="false"
            style="width: 100%; overflow: auto;"
        />
        <aui-email-templates-list
            v-if="showCustom"
            class="aui-emailtemplates-list"
            :show-custom="true"
            style="width: 100%; overflow: auto;"
        />
    </aui-base-page>
</template>

<script>
import AuiEmailTemplatesList from 'src/pages/emailTemplates/AuiEmailTemplatesList'
import emailTemplatesContextMixing from 'src/mixins/data-context-pages/email-templates'
import AuiMainMenuItem from 'components/AuiMainMenuItem'
import AuiBasePage from 'pages/AuiBasePage'
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
