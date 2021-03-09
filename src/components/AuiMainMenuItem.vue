<template>
    <q-item
        v-if="link"
        v-ripple
        clickable
        tag="a"
        target="_blank"
        :href="$appConfig.ngcpPanelUrl + to"
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
    <q-item
        v-else
        v-ripple
        clickable
        exact
        :to="to"
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
        link: {
            type: Boolean,
            default: false
        },
        to: {
            type: String,
            required: true
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
        }
    }
}
</script>
