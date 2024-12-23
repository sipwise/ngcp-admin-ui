<template>
    <q-select
        ref="select"
        :model-value="$attrs.value"
        :options="displayedOptions"
        :multiple="multiple"
        :use-chips="multiple"
        :emit-value="emitValue"
        map-options
        use-input
        :virtual-scroll-slice-size="pageSize"
        input-debounce="500"
        :loading="internalLoading || $attrs.loading"
        v-bind="$attrs"
        @filter="filter"
        @virtual-scroll="onScroll"
        @update:model-value="emitSelectedData($event)"
    >
        <template #no-option>
            <q-item>
                <q-item-section class="text-italic text-grey">
                    {{ (currentFilter) ? $t('No data found') : $t('No data available') }}
                </q-item-section>
            </q-item>
        </template>

        <template #after-options>
            <q-linear-progress
                v-if="internalLoading"
                query
            />
        </template>

        <template
            #prepend
        >
            <slot
                name="prepend"
            />
            <q-icon
                v-if="icon"
                :name="icon"
            />
        </template>
        <template
            #append
        >
            <slot
                name="append"
            />
        </template>
        <template
            #after
        >
            <q-btn
                v-if="createButtonData && !createButtonData.children"
                :label="createButtonData.label"
                :icon="createButtonData.icon"
                :to="createButtonData.to"
                :disable="$attrs.disable || $attrs.loading"
                size="sm"
                color="primary"
                unelevated
                outline
                data-cy="aui-select-lazy-CreateBtn"
            />
            <q-btn-dropdown
                v-if="createButtonData && createButtonData.children && createButtonData.children.length"
                :label="createButtonData.label"
                :icon="createButtonData.icon"
                :disable="$attrs.disable || $attrs.loading"
                size="sm"
                color="primary"
                unelevated
                outline
                data-cy="aui-select-lazy-CreateBtn-dropdown"
            >
                <q-list>
                    <aui-popup-menu-item
                        v-for="(subBtn, index) in createButtonData.children"
                        :key="subBtn.to && subBtn.to.name || index"
                        :label="subBtn.label"
                        :icon="subBtn.icon"
                        :to="subBtn.to"
                        color="primary"
                    />
                </q-list>
            </q-btn-dropdown>
            <slot
                name="after"
            />
        </template>
    </q-select>
</template>

<script>
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import _ from 'lodash'
import { parseGeneratorFullName, storeGeneratorNames } from 'src/store/storeGenerator'

export default {
    name: 'AuiSelectLazy',
    components: { AuiPopupMenuItem },
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: undefined
        },
        storeGeneratorName: {
            type: String,
            default: ''
        },
        storeGetter: {
            type: String,
            default: ''
        },
        storeAction: {
            type: String,
            default: ''
        },
        storeActionParams: {
            type: Object,
            default: null
        },
        loadInitially: {
            type: Boolean,
            default: true
        },
        filterCustomizationFunction: {
            type: Function,
            default: (filter) => filter
        },
        initialOption: {
            type: Object,
            default: undefined
        },
        initialOptions: {
            type: Array,
            default: undefined
        },
        /**
         * @example '/reseller/create'
         * @example { to: { name: 'someNamedRoute' }}
         * @example { label: $t('Create'), icon: 'add', to: '/reseller/create' }
         * @example { label: $t('Create'), icon: 'add', to: { name: 'someNamedRoute' } }
         * @example [{ label: $t('Add peering contract'), to: '/contract/peering/create' },  { to: { name: 'someNamedRoute' } }]
         * @example { label: $t('Create'), icon: 'add', to: [{ label: $t('Create 1'), icon: 'abc1', to: '/create1' },  { to: '/create2' }] }
         */
        createButtons: {
            type: [String, Object, Array],
            default: undefined
        }
    },
    emits: ['input-data'],
    data () {
        return {
            optionsWereUpdated: false,
            currentFilter: '',
            allOptionsAreLoaded: false
        }
    },
    computed: {
        emitValue () {
            if (_.has(this.$attrs, 'emit-value')) {
                return _.get(this.$attrs, 'emit-value')
            }
            return true
        },
        pageSize () {
            return 20
        },
        storeGetterName () {
            let result = this.storeGetter
            if (!result && this.storeGeneratorName) {
                const generatorParsedFullName = parseGeneratorFullName(this.$props.storeGeneratorName, 'SelectLazy')
                const mappingNames = storeGeneratorNames(generatorParsedFullName)
                result = mappingNames.getterDefaultOptionsName
            }
            return result
        },
        storeActionName () {
            let result = this.storeAction
            if (!result && this.storeGeneratorName) {
                const generatorParsedFullName = parseGeneratorFullName(this.$props.storeGeneratorName, 'SelectLazy')
                const mappingNames = storeGeneratorNames(generatorParsedFullName)
                result = mappingNames.actionName
            }
            return result
        },
        rawOptions () {
            return this.$store.getters[this.storeGetterName]
        },
        displayedOptions () {
            const optionMap = new Map()
            this.rawOptions.forEach((option) => {
                optionMap.set(option.value, option)
            })
            if (this.initialOption) {
                optionMap.set(this.initialOption.value, this.initialOption)
            }
            if (this.initialOptions) {
                this.initialOptions.forEach((option) => {
                    optionMap.set(option.value, option)
                })
            }
            const options = []
            if (optionMap.size > 0) {
                optionMap.forEach((option) => {
                    options.push(option)
                })
            }
            return options
        },
        waitIdentifier (vnode) {
            return vnode.tag + vnode.componentInstance?._uid
        },
        internalLoading () {
            return this.$wait.is(this.waitIdentifier)
        },
        createButtonData () {
            if (!this.createButtons) {
                return null
            }

            const getSubButtons = (data) => {
                if (!data) {
                    return undefined
                }
                const srcData = (data instanceof Array) ? data : [data]
                return srcData.reduce((acc, item) => {
                    const route = (typeof item === 'string') ? item : item?.to
                    const visible = this.$routeMeta.$aclCan(route)
                    if (visible) {
                        acc.push({
                            label: this.$routeMeta.$label(route) || defaultCreateBtn.label,
                            icon: this.$routeMeta.$icon(route) || defaultCreateBtn.icon,
                            to: route,
                            ...((typeof item === 'object') ? item : {})
                        })
                    }
                    return acc
                }, [])
            }
            let result
            const defaultCreateBtn = {
                label: this.$t('Create'),
                icon: 'add'
            }
            if (typeof this.createButtons === 'string') {
                const route = this.createButtons
                const visible = this.$routeMeta.$aclCan(route)
                if (visible) {
                    result = {
                        ...defaultCreateBtn,
                        to: route
                    }
                } else {
                    result = null
                }
            } else if (this.createButtons instanceof Array) {
                result = {
                    ...defaultCreateBtn,
                    children: getSubButtons(this.createButtons)
                }
            } else if (typeof this.createButtons === 'object') {
                result = {
                    ...defaultCreateBtn,
                    ...this.createButtons,
                    children: getSubButtons(this.createButtons.children)
                }
            }
            return result
        }
    },
    created () {
        // NOTE: in Vue2 it's impossible to access another properties in prop's "validator" function to do
        // a cross property validation. So this is a workaround to overcome that.
        if (!(this.$props.storeGeneratorName || (this.$props.storeAction && this.$props.storeGetter))) {
            // eslint-disable-next-line no-console
            console.error('You should define "storeGeneratorName" or ["storeAction", "storeGetter"] properties')
        }
    },
    mounted () {
        if (this.loadInitially) {
            this.filter('')
        }
    },
    methods: {
        async filter (filter, update, abort) {
            this.allOptionsAreLoaded = false
            this.currentFilter = filter
            await this.internalFilter({ filter, update, abort })
        },
        async internalFilter ({ filter, update, abort, loadTo }) {
            const requestNextDataSlice = loadTo > this.displayedOptions.length - 1
            if (!this.allOptionsAreLoaded && (loadTo === undefined || requestNextDataSlice)) {
                this.$wait.start(this.waitIdentifier)
                try {
                    let customizedFilter = this.filterCustomizationFunction(filter)
                    if (typeof customizedFilter !== 'object' || customizedFilter === null) {
                        customizedFilter = { filter: customizedFilter }
                    }

                    const actionPayload = {
                        ...this.storeActionParams,
                        ...customizedFilter,
                        ...(requestNextDataSlice
                            ? {
                                rows: this.pageSize,
                                page: Math.trunc(this.rawOptions.length / this.pageSize) + 1
                            }
                            : {
                                rows: this.pageSize,
                                page: 0 // Note: "0" means invalidate cache
                            }
                        )
                    }

                    const optionsLengthBeforeRequest = this.rawOptions.length
                    await this.$store.dispatch(this.storeActionName, actionPayload)
                    if (requestNextDataSlice && optionsLengthBeforeRequest === this.rawOptions.length) {
                        this.allOptionsAreLoaded = true
                    }
                    this.optionsWereUpdated = true

                    if (typeof update === 'function') {
                        update()
                    }
                } catch (e) {
                    if (typeof abort === 'function') {
                        abort()
                    }
                    throw e
                } finally {
                    this.$wait.end(this.waitIdentifier)
                }
            }
        },
        async onScroll ({ index, direction, ref }) {
            // next line is for back compatibility. It can be removed when all SelectLazy instances will be migrated to storeGeneratorName
            if (!this.storeGeneratorName) {
                return
            }

            if (direction === 'increase' && !this.internalLoading) {
                /* A subjective magic number :-) how many items we will scroll-up by three mouse well scrolls.
                   So we assuming that next portion of data should be loaded by three average scrolls-ups :-D */
                const itemsInThreeWheelScrolls = 30

                await this.internalFilter({
                    filter: this.currentFilter,
                    loadTo: index + itemsInThreeWheelScrolls,
                    index,
                    update () {
                        ref.refresh()
                    }
                })
            }
        },
        emitSelectedData (selectedId) {
            if (this.storeGeneratorName) {
                const path = `${this.storeGeneratorName.replace('/', '.')}_` + 'data'
                const data = _.get(this.$store.state, path)
                this.$emit('input-data', data.find((item) => item.id === selectedId))
            }
        }
    }
}
</script>
