import dataContextPageMixin from 'src/mixins/data-context-page'

export default {
    mixins: [dataContextPageMixin],
    computed: {
        ncoslevelPatternContext () {
            return this.getDataContextObject('ncosLevelsDetailsNumberPatternContext')
        },
        ncoslevelPatternContextId () {
            return this.$route.params.numberPatternId
        }
    },
    methods: {
        async reloadNcoslevelPatternContext () {
            await this.reloadDataContext('ncosLevelsDetailsNumberPatternContext')
        }
    }
}
