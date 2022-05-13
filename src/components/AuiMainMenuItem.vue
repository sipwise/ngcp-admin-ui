<template>
    <q-item
        v-ripple
        clickable
        exact
        :target="openNewWindow ? '_blank' : ''"
        v-bind="navigationProps"
    >
        <q-item-section
            v-if="icon"
            side
        >
            <q-icon
                :name="icon"
                :color="active ? 'primary' : iconColor"
                :size="iconSize"
            />
        </q-item-section>
        <q-item-section>
            <q-item-label>
                <text-highlight
                    v-if="filterRegExp"
                    :queries="[filterRegExp]"
                >
                    {{ label }}
                </text-highlight>
                <template
                    v-else
                >
                    {{ label }}
                </template>
            </q-item-label>
        </q-item-section>
        <q-item-section
            v-if="deletable"
            side
        >
            <q-btn
                color="negative"
                icon="delete_outline"
                flat
                dense
                size="sm"
                @click.stop.prevent="deleteFavPage"
            />
        </q-item-section>
    </q-item>
</template>

<script>
export default {
    name: 'AuiMainMenuItem',
    props: {
        icon: {
            type: String,
            default: undefined
        },
        label: {
            type: String,
            required: true
        },
        openNewWindow: {
            type: Boolean,
            default: false
        },
        to: {
            type: [String, Object],
            default: undefined
        },
        href: {
            type: String,
            default: undefined
        },
        inset: {
            type: Boolean,
            default: false
        },
        exactActive: {
            type: Boolean,
            default: false
        },
        filterRegExp: {
            type: RegExp,
            default: undefined
        },
        deletable: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        iconSize () {
            return 'sm'
        },
        iconColor () {
            return 'grey-9'
        },
        active () {
            const rootRouteName = this.$route?.meta?.parentPath?.split('.')[0]
            if (!this.exactActive && this.to) {
                const routeData = this.$router.resolve(this.to)
                return routeData?.route?.name === rootRouteName ||
                    routeData?.route?.name === this.$route.name ||
                    this.$attrs.active
            } else if (this.to?.path) {
                return this.to?.path === this.$route.path
            }
            return false
        },
        navigationProps () {
            if (this.to) {
                return {
                    ...this.$attrs,
                    to: this.to,
                    active: this.active
                }
            }
            if (this.href) {
                return {
                    ...this.$attrs,
                    tag: 'a',
                    href: this.href,
                    active: this.active
                }
            }
            return {}
        },
        dataCyKey () {
            return this.to?.name
        }
    },
    methods: {
        deleteFavPage () {
            this.$emit('delete')
        }
    }
}
</script>
