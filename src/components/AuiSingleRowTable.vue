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
            <tr>
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
                                v-if="$routeMeta.$aclCan(constructRowActionRouteObject(actionRouteName))"
                                :key="actionRouteName"
                                :label="$routeMeta.$label(constructRowActionRouteObject(actionRouteName))"
                                :icon="$routeMeta.$icon(constructRowActionRouteObject(actionRouteName))"
                                :to="constructRowActionRouteObject(actionRouteName)"
                            />
                        </template>
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
        row: {
            type: Object,
            default: undefined
        },
        rowActionRouteNames: {
            type: Array,
            default: undefined
        }
    },
    computed: {

    },
    methods: {
        mapAlignmentCssClass (align) {
            return align ? 'text-' + align : 'text-left'
        },
        constructRowActionRouteObject (routeName) {
            return { name: routeName, params: { id: this.row.id } }
        }
    }
}
</script>
