import dataContextPageMixin from 'src/mixins/data-context-page'
export default {
    mixins: [dataContextPageMixin],
    computed: {
        emailTemplatesContextResourceId () {
            return this.$route.params.id
        },
        emailTemplatesContextResource () {
            return 'emailtemplates'
        },
        emailTemplatesContextExpand () {
            return [
                'reseller_id'
            ]
        }
    },
    methods: {
        async reloadEmailTemplatesContext (contextId) {
            await this.reloadDataContext(contextId)
        },
        emailTemplatesContext (contextId) {
            return this.getDataContextObject(contextId)
        },
        emailTemplatesContextReseller (contextId) {
            return this.emailTemplatesContext(contextId)?.reseller_id_expand
        }
    }
}
