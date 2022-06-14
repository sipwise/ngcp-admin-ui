<template>
    <q-list
        class="q-pl-md q-pt-md"
    >
        <aui-main-menu-item
            v-for="(item, index) in menuItems"
            :key="index"
            :label="item.label"
            :icon="item.icon"
            :to="item.to"
        />
    </q-list>
</template>

<script>

import AuiMainMenuItem from 'components/AuiMainMenuItem'

export default {
    name: 'AuiDetailPageMenu',
    components: { AuiMainMenuItem },
    props: {
        menuItems: {
            type: Array,
            default () {
                return []
            }
        }
    }
}
</script>
