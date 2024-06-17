<template>
    <aui-base-page
        @refresh="refresh"
    >
        <aui-data-context
            :resource-object-id="getEmailTemplatesContextId"
            :resource-id="emailTemplatesContextResourceId"
            :resource="emailTemplatesContextResource"
            :resource-expand="emailTemplatesContextExpand"
        />
    </aui-base-page>
</template>

<script>
import AuiDataContext from 'components/AuiDataContext'
import AuiBasePage from 'pages/AuiBasePage'
import emailTemplatesContextMixin from 'src/mixins/data-context-pages/email-templates'

export default {
    name: 'AuiEmailTemplatesContext',
    components: {
        AuiBasePage,
        AuiDataContext
    },
    mixins: [
        emailTemplatesContextMixin
    ],
    props: {
        isCustomContext: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        getEmailTemplatesContextId () {
            if (this.isCustomContext) {
                return 'emailTemplatesContextCustom'
            }
            return 'emailTemplatesContextDefault'
        },
        getEmailTemplatesContextReseller () {
            if (this.isCustomContext) {
                return this.emailTemplatesContextReseller('emailTemplatesContextCustom')
            }
            return this.emailTemplatesContextReseller('emailTemplatesContextDefault')
        }
    },
    methods: {
        async refresh () {
            if (this.isCustomContext) {
                await this.reloadEmailTemplatesContext('emailTemplatesContextCustom')
            } else {
                await this.reloadEmailTemplatesContext('emailTemplatesContextDefault')
            }
        }

    }
}
</script>
