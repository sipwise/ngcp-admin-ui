<template>
    <q-markup-table
        flat
        dense
        v-bind="$attrs"
        v-on="$listeners"
    >
        <thead>
            <tr>
                <th
                    v-for="(column, index) in columns"
                    :key="index"
                    :class="mapAlignmentCssClass(column.align)"
                >
                    {{ column.label }}
                </th>
                <th
                    style="width: 0"
                />
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(row, indexRow) in rows"
                :key="indexRow"
            >
                <td
                    v-for="(column, index) in columns"
                    :key="index"
                    :class="mapAlignmentCssClass(column.align)"
                >
                    <template
                        v-if="row[column.name] && row[column.name] !== ''"
                    >
                        {{ row[column.name] }}
                    </template>
                    <template
                        v-else
                    >
                        {{ $t('N/A') }}
                    </template>
                </td>
                <td>
                    <aui-more-menu>
                        <template
                            v-for="actionRouteName in rowActionRouteNames"
                        >
                            <aui-popup-menu-item
                                v-if="$routeMeta.$aclCan(constructRowActionRouteObject(actionRouteName, row.id))"
                                :key="actionRouteName"
                                :label="$routeMeta.$label(constructRowActionRouteObject(actionRouteName, row.id))"
                                :icon="$routeMeta.$icon(constructRowActionRouteObject(actionRouteName, row.id))"
                                :to="constructRowActionRouteObject(actionRouteName, row.id)"
                            />
                        </template>
                        <aui-popup-menu-item
                            v-if="deletable"
                            :label="$t('Delete')"
                            icon="delete"
                            color="negative"
                            icon-color="negative"
                            unelevated
                            @click="onDelete(indexRow)"
                        />
                    </aui-more-menu>
                </td>
            </tr>
        </tbody>
    </q-markup-table>
</template>

<script>
import AuiMoreMenu from 'components/AuiMoreMenu'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
export default {
    name: 'AuiSingleRowTable',
    components: { AuiPopupMenuItem, AuiMoreMenu },
    props: {
        columns: {
            type: Array,
            default: undefined
        },
        rows: {
            type: Array,
            default: undefined
        },
        rowActionRouteNames: {
            type: Array,
            default: undefined
        },
        deletable: {
            type: Boolean,
            default: false
        }
    },
    computed: {

    },
    methods: {
        mapAlignmentCssClass (align) {
            return align ? 'text-' + align : 'text-left'
        },
        constructRowActionRouteObject (routeName, rowId) {
            return { name: routeName, params: { id: rowId } }
        },
        onDelete (index) {
            this.$emit('delete', index)
        }
    }
}
</script>
