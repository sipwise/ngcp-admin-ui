<template>
    <div>
        <q-btn-dropdown
            v-if="menuRoutes && menuRoutes.length > 0"
            :split="('split' in $attrs) ? $attrs.split : false"
            :color="('color' in $attrs) ? $attrs.color : 'primary'"
            :icon="$attrs.icon"
            :size="('size' in $attrs) ? $attrs.size : 'sm'"
            :dense="('dense' in $attrs) ? $attrs.dense : false"
            :disable-dropdown="$attrs.disable"
            :disable-main-btn="$attrs.disable"
            :to="mainButtonRoute"
            menu-anchor="bottom left"
            menu-self="top left"
            unelevated
            v-bind="$attrs"
        >
            <q-list>
                <template
                    v-for="(menuRoute, index) in menuRoutes"
                >
                    <aui-list-action-menu-item
                        v-if="$routeMeta.$aclCan(menuRoute)"
                        :key="menuRoute && menuRoute.name || index"
                        :label="$routeMeta.$label(menuRoute)"
                        :icon="$routeMeta.$icon(menuRoute)"
                        :to="menuRoute"
                    />
                </template>
            </q-list>
        </q-btn-dropdown>
        <q-btn
            v-else
            :color="('color' in $attrs) ? $attrs.color : 'primary'"
            :icon="$attrs.icon"
            :size="('size' in $attrs) ? $attrs.size : 'sm'"
            :dense="('dense' in $attrs) ? $attrs.dense : false"
            :to="mainButtonRoute"
            unelevated
            v-bind="$attrs"
        />
    </div>
</template>

<script>
import AuiListActionMenuItem from 'components/AuiListActionMenuItem'
export default {
    name: 'AuiListAction',
    components: { AuiListActionMenuItem },
    props: {
        routes: {
            type: Array,
            default () {
                return []
            }
        }
    },
    computed: {
        mainButtonRoute () {
            if ((this.$attrs.split && this.routes && this.routes.length > 0) ||
                (this.routes && this.routes.length === 1)) {
                return this.routes[0]
            } else if (this.$attrs.to) {
                return this.$attrs.to
            }
            return undefined
        },
        menuRoutes () {
            if (this.$attrs.split && this.routes && this.routes.length > 1) {
                return this.routes.slice(1)
            } else if (this.routes && this.routes.length > 1) {
                return this.routes
            }
            return []
        },
        dataCyKey () {
            return this.mainButtonRoute?.name
        }
    }
}
</script>
