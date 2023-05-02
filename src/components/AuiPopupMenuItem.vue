<template>
    <q-item
        v-close-popup
        clickable
        v-bind="$attrs"
    >
        <q-item-section
            v-if="icon !== undefined"
            side
        >
            <q-icon
                :name="icon"
                :color="iconColor"
                :size="iconSize"
            />
        </q-item-section>
        <q-item-section
            no-wrap
        >
            <q-item-label
                :class="'text-' + color"
            >
                {{ label }}
            </q-item-label>
            <q-item-label
                v-if="sublabel !== undefined"
                :class="'text-' + color"
            >
                {{ sublabel }}
            </q-item-label>
        </q-item-section>
    </q-item>
</template>

<script>
export default {
    name: 'AuiPopupMenuItem',
    props: {
        icon: {
            type: String,
            default: undefined
        },
        iconSize: {
            type: String,
            default: 'md'
        },
        iconColor: {
            type: String,
            default: 'primary'
        },
        color: {
            type: String,
            default: 'primary'
        },
        label: {
            type: String,
            required: true
        },
        sublabel: {
            type: String,
            default: undefined
        }
    },
    computed: {
        dataCyKey () {
            return this.$attrs?.to?.name || this.key
        }
    }
}
</script>
