<template>
    <aui-base-sub-context>
        <q-markup-table
            flat
            dense
            separator="horizontal"
        >
            <thead>
                <tr>
                    <th>
                        {{ $t('Id') }}
                    </th>
                    <th>
                        {{ $t('Name') }}
                    </th>
                    <th>
                        {{ $t('Status') }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-if="resourceObject"
                >
                    <td
                        class="text-center"
                    >
                        {{ resourceObject.id }}
                    </td>
                    <td
                        class="text-center"
                    >
                        {{ resourceObject.name }}
                    </td>
                    <td
                        class="text-center"
                    >
                        {{ resourceObject.status }}
                    </td>
                </tr>
            </tbody>
        </q-markup-table>
    </aui-base-sub-context>
</template>
<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { mapState } from 'vuex'
export default {
    components: { AuiBaseSubContext },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects',
            'resourceRelatedSubObjects'
        ])
    }
}
</script>
