<template>
    <q-select
        ref="select"
        :value="$attrs.value"
        :options="filteredOptions"
        emit-value
        map-options
        use-input
        input-debounce="500"
        :loading="$wait.is(waitIdentifier) || $attrs.loading"
        v-bind="$attrs"
        v-on="$listeners"
        @filter="filter"
    >
        <template
            v-slot:prepend
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
            v-slot:append
        >
            <slot
                name="append"
            />
        </template>
        <template
            v-slot:after
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
            />
            <q-btn-dropdown
                v-if="createButtonData && createButtonData.children && createButtonData.children.length"
                :label="createButtonData.label"
                :icon="createButtonData.icon"
                :disable="$attrs.disable || $attrs.loading"
                size="sm"
                color="primary"
                unelevated
            >
                <q-list>
                    <aui-popup-menu-item
                        v-for="(subBtn, index) in createButtonData.children"
                        :key="index"
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
import _ from 'lodash'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
export default {
    name: 'AuiSelectLazy',
    components: { AuiPopupMenuItem },
    props: {
        icon: {
            type: String,
            default: undefined
        },
        storeGetter: {
            type: String,
            required: true
        },
        storeAction: {
            type: String,
            required: true
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
    data () {
        return {
            optionsWereUpdated: false
        }
    },
    computed: {
        filteredOptions () {
            let options = _.clone(this.$store.getters[this.storeGetter])
            if (options === undefined || options === null) {
                options = []
            }
            if (!this.optionsWereUpdated && this.initialOption && (options.length === 0 || options[0].disable === true)) {
                options.splice(0, 1, this.initialOption)
            }
            if (options.length === 0) {
                options.push({
                    label: this.$t('No data found'),
                    disable: true
                })
            }
            return options
        },
        waitIdentifier () {
            return this.$vnode.tag + this.$vnode.componentInstance?._uid
        },
        createButtonData () {
            if (!this.createButtons) {
                return null
            }

            const getSubButtons = (data) => {
                if (!data) {
                    return undefined
                } else {
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
    mounted () {
        if (this.loadInitially) {
            this.filter('')
        }
    },
    methods: {
        async filter (filter, update, abort) {
            this.$wait.start(this.waitIdentifier)
            try {
                const filterFinalised = this.filterCustomizationFunction(filter)
                let options = filterFinalised
                if (_.isObject(this.storeActionParams)) {
                    options = _.merge(this.storeActionParams, {
                        filter: filterFinalised
                    })
                }
                await this.$store.dispatch(this.storeAction, options)
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
    }
}
</script>
