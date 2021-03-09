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
            <slot
                name="after"
            />
        </template>
    </q-select>
</template>

<script>
import _ from 'lodash'
export default {
    name: 'AuiSelectLazy',
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
            if (!this.optionsWereUpdated && this.initialOption && options.length === 0) {
                options.push(this.initialOption)
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
                await this.$store.dispatch(this.storeAction, this.filterCustomizationFunction(filter))
                this.optionsWereUpdated = true
                if (typeof update === 'function') {
                    update()
                }
            } catch {
                /* TODO: some API exceptions potentially can be suppressed by current implementation :-(
                         So we should improve it. We should determine the situations\exceptions in which we should
                         just do "abort" (like for 404) AND which exceptions we are considering as unhandled and
                         thus such exceptions should be thrown globally */
                if (typeof abort === 'function') {
                    abort()
                }
            } finally {
                this.$wait.end(this.waitIdentifier)
            }
        }
    }
}
</script>
