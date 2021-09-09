<template>
    <q-expansion-item
        group="main-menu"
        :icon="icon"
        :label="label"
        :content-inset-level="0.5"
        :header-class="active ? 'text-primary' : ''"
        :expand-icon-class="active ? 'text-primary' : ''"
    >
        <template
            v-slot:header
        >
            <q-item-section
                side
            >
                <q-icon
                    :name="icon"
                    :color="active ? 'primary' : iconColor"
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
                :open-new-window="child.openNewWindow"
                :to="child.to"
                :href="child.href"
                :active="child.active"
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
        },
        active: {
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
        }
    }
}
</script>
