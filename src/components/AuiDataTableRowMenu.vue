<template>
    <aui-popup-menu>
        <template
            v-for="(rowMenuItem, rowMenuItemIndex) in rowMenuItems"
        >
            <aui-popup-menu-item
                :key="rowMenuItemIndex"
                :icon="rowMenuItem.icon"
                :label="rowMenuItem.label"
                :to="rowMenuItem.to"
                color="primary"
            />
        </template>
        <slot
            name="row-more-menu"
            :row="row"
        />
        <aui-popup-menu-item
            v-if="isTerminateBtnVisible"
            key="delete"
            :icon="deletionIcon"
            :label="deletionLabel"
            color="negative"
            icon-color="negative"
            @click="$emit('delete')"
        />
    </aui-popup-menu>
</template>
<script>
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import AuiPopupMenu from 'components/AuiPopupMenu'
export default {
    name: 'AuiDataTableRowMenu',
    components: { AuiPopupMenu, AuiPopupMenuItem },
    props: {
        row: {
            type: Object,
            required: true
        },
        rowMenuItems: {
            type: Array,
            required: true
        },
        isEditBtnVisible: {
            type: Boolean,
            required: true
        },
        hasEditRowMenuRoute: {
            type: Boolean,
            required: true
        },
        resourceEditPath: {
            type: [String],
            default: null
        },
        isTerminateBtnVisible: {
            type: Boolean,
            required: true
        },
        deletionIcon: {
            type: String,
            required: true
        },
        deletionLabel: {
            type: String,
            required: true
        }
    }
}
</script>
