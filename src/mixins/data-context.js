import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import { mapMutations } from 'vuex'

export default {
    computed: {
        dataContextResource () {
            return null
        },
        dataContextResourceId () {
            return null
        },
        dataContextResourceExpand () {
            return []
        },
        dataContextObject () {
            return this.$store.state.page[this.dataContextObjectId]
        },
        dataContextObjectId () {
            return this.dataContextResource + '/' +
                this.dataContextResourceId + '?' +
                this.dataContextResourceExpandOrdered
        },
        dataContextResourceExpandOrdered () {
            return this.dataContextResourceExpand.sort()
        },
        dataContextLoading () {
            return this.$wait.is(WAIT_PAGE)
        },
        dataContextRootObject () {
            return this.$store.state.page.resourceObject
        },
        dataContextFilters () {
            return []
        }
    },
    async mounted () {
        await this.dataContextLoad()
    },
    destroyed () {
        this.destroyDataContext({
            resourceObjectId: this.dataContextObjectId
        })
    },
    methods: {
        ...mapMutations('page', [
            'destroyDataContext'
        ]),
        ...mapWaitingActions('page', {
            loadDataContext: WAIT_PAGE
        }),
        async dataContextLoad () {
            await this.loadDataContext({
                resource: this.dataContextResource,
                resourceId: this.dataContextResourceId,
                resourceExpand: this.dataContextResourceExpandOrdered,
                resourceObjectId: this.dataContextObjectId,
                resourceFilters: this.dataContextFilters
            })
        }
    }
}
