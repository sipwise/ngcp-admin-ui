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
                    data-cy="category-selection"
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
                :resource-id="getResourceId"
                :resource-data="resourceData"
                :resource-schema="resourceSchema"
                :resource-context="resourceContext"
                :resource-context-related-objects="resourceRelatedObjects"
                :resource-context-related-sub-objects="resourceRelatedSubObjects"
                :search="preferencesSearch"
                :category="preferencesCategory"
                :preference-extension="preferenceExtension"
                :preference-group-extension="preferenceGroupExtension"
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
import { WAIT_PAGE, WAIT_PREFERENCES, WAIT_SUB_CONTEXT } from 'src/constants'
import { mapWaitingGetters } from 'vue-wait'
import { getCurrentLangAsV1Format } from 'src/i18n'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import _ from 'lodash'

export default {
    name: 'AuiPreferencesContext',
    components: {
        AuiInputSearch,
        AuiPreferences
    },
    mixins: [
        subscriberContextMixin
    ],
    props: {
        preferencesId: {
            type: String,
            required: true
        },
        resourceId: {
            type: [String, Number],
            default: null
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
        preferenceExtension: {
            type: Object,
            default: () => {
                return {}
            }
        },
        preferenceGroupExtension: {
            type: Object,
            default: () => {
                return {}
            }
        },
        readonly: {
            type: Boolean,
            default: false
        },
        isSubscriberPreferences: {
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
        ...mapWaitingGetters({
            preferencesLoading: [WAIT_PREFERENCES]
        }),
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects',
            'resourceRelatedSubObjects'
        ]),
        resourceContext () {
            return this.isSubscriberPreferences ? this.subscriberContext : this.resourceObject
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
                const normalisedGroupName = _.snakeCase(_.lowerCase(group[0]))
                const groupRestricionDefined = this.preferenceGroupExtension[normalisedGroupName]
                if (groupRestricionDefined) {
                    const canDisplayCategory = this.preferenceGroupExtension[normalisedGroupName].$c
                    const userHasCapability = this.$capability(this.preferenceGroupExtension[normalisedGroupName].$c)
                    if (canDisplayCategory && userHasCapability) {
                        options.push({
                            value: group[0],
                            label: group[0]
                        })
                    }
                } else {
                    options.push({
                        value: group[0],
                        label: group[0]
                    })
                }
            })
            return options
        },
        isContextLoading () {
            return this.$wait.is(WAIT_PAGE) ||
                this.$wait.is(WAIT_SUB_CONTEXT)
        },
        getResourceId () {
            if (this.resourceId) {
                return this.resourceId
            }
            return this.$route.params.id
        }
    },
    watch: {
        '$i18n.locale' () {
            this.loadPreferencesSchema({
                preferencesId: this.preferencesId,
                resourceSchema: this.resourceSchema,
                language: getCurrentLangAsV1Format(),
                cache: false
            })
        },
        preferencesLoading (loading) {
            if (loading) {
                this.$wait.start(WAIT_PAGE)
            } else {
                this.$wait.end(WAIT_PAGE)
            }
        }
    },
    async mounted () {
        await this.loadPreferences()
        if (this.$route.query && this.$route.query.search) {
            this.preferencesSearch = this.$route.query.search
        }
    },
    methods: {
        ...mapActions('dataTable', [
            'loadPreferencesSchema',
            'loadPreferencesData'
        ]),
        async loadPreferences (cache = true) {
            await Promise.all([
                this.loadPreferencesSchema({
                    preferencesId: this.preferencesId,
                    resourceSchema: this.resourceSchema,
                    language: getCurrentLangAsV1Format(),
                    cache: cache
                }),
                this.loadPreferencesData({
                    preferencesId: this.preferencesId,
                    resourceData: this.resourceData,
                    resourceId: this.getResourceId
                })
            ])
        }
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
