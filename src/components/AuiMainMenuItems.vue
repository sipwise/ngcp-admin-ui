<template>
    <q-expansion-item
        :icon="icon"
        :icon-color="iconColor"
        :label="label"
        :content-inset-level="0.5"
        group="main-menu"
    >
        <template
            v-slot:header
        >
            <q-item-section
                side
            >
                <q-icon
                    :name="icon"
                    :color="iconColor"
                />
            </q-item-section>
            <q-item-section>
                <q-item-label>
                    {{ label }}
                </q-item-label>
            </q-item-section>
        </template>
        <template
            v-for="(child, index) in children"
        >
            <aui-main-menu-item
                v-if="child.visible"
                :key="index"
                :label="child.label"
                :icon="child.icon"
                :link="child.link"
                :to="child.to"
            />
        </template>
    </q-expansion-item>
</template>

<script>
import AuiMainMenuItem from 'components/AuiMainMenuItem'
export default {
    name: 'AuiMainMenuItems',
    components: { AuiMainMenuItem },
    props: {
        icon: {
            type: String,
            default: undefined
        },
        label: {
            type: String,
            required: true
        },
        children: {
            type: Array,
            required: true
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
