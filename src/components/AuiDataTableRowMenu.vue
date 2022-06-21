<template>
    <aui-popup-menu>
        <template
            v-for="(menuItem, menuItemIndex) in menuItems"
        >
            <aui-popup-menu-item
                v-if="menuItem.visible"
                :key="menuItemIndex"
                :icon="menuItem.icon"
                :label="menuItem.label"
                :color="menuItem.color"
                :icon-color="menuItem.color"
                :data-cy="'aui-data-table-row-menu--' + menuItem.id"
                @click="clickEvent(menuItem)"
            />
        </template>
    </aui-popup-menu>
</template>

<script>
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import AuiPopupMenu from 'components/AuiPopupMenu'
import _ from 'lodash'
import { sortItemsWithLabelAlphabetically } from 'src/helpers/sorting'
export default {
    name: 'AuiDataTableRowMenu',
    components: { AuiPopupMenu, AuiPopupMenuItem },
    props: {
        row: {
            type: Object,
            required: true
        },
        rowActions: {
            type: Array,
            required: true
        },
        isTerminateBtnVisible: {
            type: Boolean,
            required: true
        },
        deletionIcon: {
            type: String,
            default: undefined
        },
        deletionLabel: {
            type: String,
            default: undefined
        }
    },
    computed: {
        menuItems () {
            const items = _.clone(this.rowActions)
            sortItemsWithLabelAlphabetically(items)
            if (this.isTerminateBtnVisible) {
                items.push({
                    name: 'delete',
                    visible: true,
                    icon: this.deletionIcon,
                    label: this.deletionLabel,
                    color: 'negative',
                    click: () => {
                        this.$emit('delete')
                    }
                })
            }
            return items
        }
    },
    methods: {
        clickEvent (menuItem) {
            if (menuItem.click) {
                menuItem.click({ row: this.row })
            }
        }
    }
}
</script>
