<template>
    <q-item
        v-if="link"
        v-ripple
        clickable
        tag="a"
        target="_blank"
        :href="href"
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
import _ from 'lodash'
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
            type: [String, Object],
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
        },
        href () {
            if (_.isObject(this.to)) {
                return this.$appConfig.ngcpPanelUrl + this.$router.resolve(this.to).route.path
            } else {
                return this.$appConfig.ngcpPanelUrl + this.to
            }
        }
    }
}
</script>
