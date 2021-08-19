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
                :color="iconColor"
                :size="iconSize"
            />
        </q-item-section>
        <q-item-section>
            <q-item-label>
                {{ label }}
            </q-item-label>
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
        }
    },
    computed: {
        iconSize () {
            return 'sm'
        },
        iconColor () {
            return 'primary'
        },
        navigationProps () {
            if (this.to) {
                return {
                    to: this.to
                }
            }
            if (this.href) {
                return {
                    tag: 'a',
                    href: this.href
                }
            }
            return {}
        }
    }
}
</script>
