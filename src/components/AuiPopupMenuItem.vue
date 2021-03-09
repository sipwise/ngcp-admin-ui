<template>
    <q-item
        v-close-popup
        clickable
        v-bind="$attrs"
        v-on="$listeners"
    >
        <q-item-section
            v-if="icon !== undefined"
            side
        >
            <q-icon
                :name="icon"
                :color="color"
            />
        </q-item-section>
        <q-item-section
            no-wrap
        >
            <q-item-label
                :class="'text-subtitle1 text-' + color"
            >
                {{ label }}
            </q-item-label>
            <q-item-label
                v-if="sublabel !== undefined"
                :class="'text-subtitle2 text-' + color"
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
    }
}
</script>
