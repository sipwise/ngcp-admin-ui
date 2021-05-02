<template>
    <aui-base-page
        class="aui-base-list-page"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template
            v-slot:toolbar-left
        >
            <div
                class="q-ml-xl"
            >
                <aui-dropdown-button
                    v-if="addButtonRoutes && addButtonRoutes.length > 1 && $aclCan('create', aclResource)"
                    class="q-mr-sm"
                    icon="add"
                    :label="$t('Add')"
                    :disable-main-btn="$attrs.loading"
                    :disable-dropdown="$attrs.loading"
                    :split="addButtonSplit"
                    :routes="addButtonRoutes"
                    :to="(addButtonSplit) ? addButtonRoutes[0] : undefined"
                />
                <aui-add-button
                    v-else-if="addButtonRoutes && addButtonRoutes.length === 1 && $routeMeta.$aclCan(addButtonRoutes[0])"
                    class="q-mr-sm"
                    :disabled="$attrs.loading"
                    :to="addButtonRoutes[0]"
                />
                <aui-dropdown-button
                    v-if="editButtonRoutes && editButtonRoutes.length > 1 && $aclCan('update', aclResource)"
                    class="q-mr-sm"
                    icon="edit"
                    :label="$t('Edit')"
                    :disable-main-btn="$attrs.loading || !rowsSelected"
                    :disable-dropdown="$attrs.loading || !rowsSelected"
                    :split="editButtonSplit"
                    :routes="editButtonRoutes"
                    :to="(editButtonSplit) ? editButtonRoutes[0] : undefined"
                />
                <aui-edit-button
                    v-else-if="editButtonRoutes && editButtonRoutes.length === 1 && $routeMeta.$aclCan(editButtonRoutes[0])"
                    class="q-mr-sm"
                    :disabled="$attrs.loading || !rowsSelected"
                    :to="editButtonRoutes[0]"
                />
                <aui-delete-button
                    v-if="deleteButton && $aclCan('delete', aclResource)"
                    class="q-mr-sm"
                    :label="deleteButtonLabel"
                    :disabled="$attrs.loading || !rowsSelected"
                    @click="$emit('delete')"
                />
            </div>
        </template>
        <template
            v-slot:toolbar-right
        >
            <aui-input-search
                v-model="search"
                class="q-mr-sm"
                dense
                borderless
                clearable
                :disabled="$attrs.loading"
                @input="$emit('search', $event)"
            />
        </template>
        <slot />
    </aui-base-page>
</template>
<script>
import AuiInputSearch from 'components/input/AuiInputSearch'
import AuiBasePage from 'pages/AuiBasePage'
import AuiEditButton from 'components/buttons/AuiEditButton'
import AuiDeleteButton from 'components/buttons/AuiDeleteButton'
import AuiDropdownButton from 'components/buttons/AuiDropdownButton'
import AuiAddButton from 'components/buttons/AuiAddButton'
export default {
    name: 'AuiBaseListPage',
    components: {
        AuiAddButton,
        AuiDropdownButton,
        AuiDeleteButton,
        AuiEditButton,
        AuiBasePage,
        AuiInputSearch
    },
    props: {
        aclResource: {
            type: String,
            required: true
        },
        addButtonRoutes: {
            type: Array,
            default () {
                return []
            }
        },
        addButtonSplit: {
            type: Boolean,
            default: true
        },
        editButtonRoutes: {
            type: Array,
            default () {
                return []
            }
        },
        editButtonSplit: {
            type: Boolean,
            default: true
        },
        deleteButton: {
            type: Boolean,
            default: true
        },
        deleteButtonLabel: {
            type: String,
            default: null
        },
        rowsSelected: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            search: ''
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'

.aui-base-list-page
    padding: $toolbar-min-height + $aui-page-padding $aui-page-padding $aui-page-padding
</style>
