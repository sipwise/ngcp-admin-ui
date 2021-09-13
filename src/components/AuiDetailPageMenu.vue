<template>
    <q-drawer
        behavior="desktop"
        side="left"
        :mini="false"
        :width="280"
        show-if-above
    >
        <q-list
            class="q-pl-md q-pt-md"
        >
            <aui-main-menu-item
                v-for="(item, index) in items"
                :key="index"
                :label="item.label"
                :icon="item.icon"
                :to="item.to"
            />
        </q-list>
    </q-drawer>
</template>

<script>

import { mapState } from 'vuex'
import _ from 'lodash'
import AuiMainMenuItem from 'components/AuiMainMenuItem'

export default {
    name: 'AuiDetailPageMenu',
    components: { AuiMainMenuItem },
    props: {
        menuItemsModifier: {
            type: Function,
            default: (item, route) => item
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        items () {
            if (this.resourceObject) {
                const items = []
                const addRoute = (route) => {
                    const routeObject = { name: route.name, params: { id: this.resourceObject.id } }
                    let menuItem = {
                        label: this.$routeMeta.$label(routeObject),
                        icon: this.$routeMeta.$icon(routeObject),
                        to: routeObject
                    }
                    menuItem = this.menuItemsModifier(menuItem, route)
                    if (menuItem) {
                        items.push(menuItem)
                    }
                }
                const children = this.$routeMeta.$routeChildren(this.$route)
                if (!_.isEmpty(children)) {
                    children.forEach(addRoute)
                } else {
                    const siblings = this.$routeMeta.$routeSiblings(this.$route)
                    siblings.forEach(addRoute)
                }
                return items
            } else {
                return []
            }
        }
    }
}
</script>
