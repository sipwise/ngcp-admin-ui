<template>
    <div
        class="aui-preference-context-wrapper"
    >
        <portal
            to="page-toolbar-right"
        >
            <div
                class="row"
            >
                <q-select
                    v-model="preferencesCategory"
                    style="min-width: 200px"
                    class="q-mr-sm"
                    :options="categoryOptions"
                    :label="$t('Category')"
                    dense
                    map-options
                    emit-value
                    clearable
                    outlined
                    :disable="isContextLoading"
                />
                <aui-input-search
                    v-model.trim="preferencesSearch"
                    style="width: 200px"
                    class="q-mr-sm"
                    dense
                    clearable
                    outlined
                    :disable="isContextLoading"
                />
            </div>
        </portal>
        <div
            class="aui-preference-context"
        >
            <aui-preferences
                :preferences-id="preferencesId"
                :resource="resource"
                :resource-id="resourceId"
                :resource-data="resourceData"
                :resource-schema="resourceSchema"
                :search="preferencesSearch"
                :category="preferencesCategory"
                :preferences-extension="preferencesExtension"
                :readonly="readonly"
                :loading="isContextLoading"
            />
        </div>
    </div>
</template>

<script>
import AuiPreferences from 'components/AuiPreferences'
import { mapActions, mapState } from 'vuex'
import AuiInputSearch from 'components/input/AuiInputSearch'
import { WAIT_PAGE, WAIT_SUB_CONTEXT } from 'src/constants'

export default {
    name: 'AuiPreferencesContext',
    components: {
        AuiInputSearch,
        AuiPreferences
    },
    props: {
        preferencesId: {
            type: String,
            required: true
        },
        resource: {
            type: String,
            required: true
        },
        resourceData: {
            type: String,
            required: true
        },
        resourceSchema: {
            type: String,
            required: true
        },
        preferencesExtension: {
            type: Object,
            default: () => {
                return {}
            }
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            preferencesSearch: '',
            preferencesCategory: null
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects',
            'resourceRelatedSubObjects'
        ]),
        resourceId () {
            return this.$route.params.id
        },
        resourceContext () {
            return this.resourceObject
        },
        resourceContextRelatedObjects () {
            return this.resourceRelatedObjects
        },
        preferencesSchema () {
            const schema = this.$store.state.dataTable[this.preferencesId + 'PreferencesSchema']
            if (!schema) {
                return []
            }
            return schema
        },
        categoryOptions () {
            const options = []
            this.preferencesSchema.forEach((group) => {
                options.push({
                    value: group[0],
                    label: group[0]
                })
            })
            return options
        },
        isContextLoading () {
            return this.$wait.is(WAIT_PAGE) ||
                this.$wait.is(WAIT_SUB_CONTEXT)
        }
    },
    async mounted () {
        await Promise.all([
            this.loadPreferencesSchema({
                preferencesId: this.preferencesId,
                resourceSchema: this.resourceSchema
            }),
            this.loadPreferencesData({
                preferencesId: this.preferencesId,
                resourceData: this.resourceData,
                resourceId: this.resourceId
            })
        ])
        if (this.$route.query && this.$route.query.search) {
            this.preferencesSearch = this.$route.query.search
        }
    },
    methods: {
        ...mapActions('dataTable', [
            'loadPreferencesSchema',
            'loadPreferencesData'
        ])
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'

.aui-preference-context-wrapper
    padding: $aui-page-padding
.aui-preference-context
    position: relative
    height: calc(100vh - (3 * #{$toolbar-min-height}) - (2 * #{$aui-page-padding}))
</style>
