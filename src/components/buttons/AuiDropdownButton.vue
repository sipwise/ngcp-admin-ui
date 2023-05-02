<template>
    <q-btn-dropdown
        color="primary"
        size="sm"
        :label="($attrs.split) ? $routeMeta.$label(routes[0]) : $attrs.label"
        :icon="($attrs.split) ? $routeMeta.$icon(routes[0]) : $attrs.icon"
        unelevated
        menu-anchor="bottom left"
        menu-self="top left"
        v-bind="$attrs"
    >
        <q-list>
            <template
                v-for="(route, index) in routes"
            >
                <aui-popup-menu-item
                    v-if="$routeMeta.$aclCan(route) && (($attrs.split && $attrs.to !== route) || !$attrs.split)"
                    :key="index"
                    :label="$routeMeta.$label(route)"
                    :icon="$routeMeta.$icon(route)"
                    :to="route"
                />
            </template>
        </q-list>
    </q-btn-dropdown>
</template>

<script>
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
export default {
    name: 'AuiDropdownButton',
    components: { AuiPopupMenuItem },
    props: {
        routes: {
            type: Array,
            default () {
                return []
            }
        }
    }
}
</script>
