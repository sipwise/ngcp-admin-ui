<template>
    <aui-base-sub-context>
        <q-list>
            <aui-popup-menu-item
                v-for="(item, index) in items"
                :key="index"
                :label="item.label"
                :icon="item.icon"
                :to="item.to"
            />
        </q-list>
    </aui-base-sub-context>
</template>

<script>
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { mapState } from 'vuex'
export default {
    name: 'AuiResellerDetails',
    components: { AuiBaseSubContext, AuiPopupMenuItem },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects',
            'resourceRelatedSubObjects'
        ]),
        items () {
            if (this.resourceObject) {
                const items = []
                const children = this.$routeMeta.$routeChildren(this.$route)
                children.forEach((child, index) => {
                    const routeObject = { name: child.name, params: { id: this.resourceObject.id } }
                    items.push({
                        label: this.$routeMeta.$label(routeObject),
                        icon: this.$routeMeta.$icon(routeObject),
                        to: routeObject
                    })
                })
                return items
            } else {
                return []
            }
        }
    },
    mounted () {
    }
}
</script>
