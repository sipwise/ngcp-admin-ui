<template>
    <q-drawer
        v-model="drawerVisible"
        behavior="desktop"
        content-class="nested-drawer-content"
        side="left"
        :mini="minimized"
        show-if-above
        @mouseover="(!pinned && autoMinimize) ? minimized = false : null"
        @mouseout="(!pinned && autoMinimize) ? minimized = true : null"
    >
        <q-list>
            <q-item class="q-px-xs">
                <q-item-section
                    avatar
                >
                    <q-btn
                        v-show="minimized"
                        icon="fas fa-caret-right"
                        color="grey-9"
                        flat
                        dense
                        round
                        @click="minimized = false"
                    />
                    <q-btn
                        v-show="!minimized && !pinned"
                        icon="fas fa-thumbtack"
                        color="grey-9"
                        flat
                        dense
                        round
                        @click="pinned = true"
                    />
                </q-item-section>

                <q-item-section
                    v-show="!minimized"
                />
                <q-item-section
                    v-show="!minimized"
                    side
                >
                    <q-btn
                        icon="fas fa-caret-left"
                        color="grey-9"
                        flat
                        dense
                        round
                        @click="closeAndUnpin"
                    />
                </q-item-section>
            </q-item>

            <aui-popup-menu-item
                v-for="(item, index) in items"
                :key="index"
                :label="item.label"
                :icon="item.icon"
                :to="item.to"
                dense
                icon-size="xs"
                color="dark"
            />
        </q-list>
    </q-drawer>
</template>

<script>

import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
    name: 'AuiDetailPageMenu',
    components: { AuiPopupMenuItem },
    props: {
    },
    data () {
        return {
            drawerVisible: true,
            minimized: false,
            pinned: true,
            autoMinimize: true
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
                    items.push({
                        label: this.$routeMeta.$label(routeObject),
                        icon: this.$routeMeta.$icon(routeObject),
                        to: routeObject
                    })
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
    },
    methods: {
        closeAndUnpin () {
            this.autoMinimize = false
            this.minimized = true
            this.pinned = false
            setTimeout(() => { this.autoMinimize = true }, 100)
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
@import 'src/css/quasar.variables.sass'

.q-drawer-container::v-deep .nested-drawer-content
    background: $nested-drawer-bg !important

.q-router-link--active::v-deep
    font-weight: bold

    .q-drawer--mini & .q-icon
        padding: 5px
        margin: -5px
        border-radius: 32px
        border: 1px dashed $primary

</style>
