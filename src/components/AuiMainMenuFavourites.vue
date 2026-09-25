<template>
    <q-expansion-item
        default-opened
        :label="$t('Favourite pages')"
        :content-inset-level="0.5"
    >
        <template #header>
            <q-item-section side>
                <q-icon
                    name="fas fa-star"
                    color="warning"
                />
            </q-item-section>
            <q-item-section>
                <q-item-label>
                    {{ $t('Favourite pages') }}
                </q-item-label>
            </q-item-section>
        </template>
        <aui-main-menu-item
            v-for="item in items"
            :key="'aui-fav-' + item.path"
            :icon="item.icon"
            :label="item.label"
            :to="{ path: item.path }"
            :exact-active="true"
            :deletable="true"
            :filter-reg-exp="filterRegExp"
            @delete="$emit('delete', { path: item.path })"
        />
    </q-expansion-item>
</template>

<script setup>
import AuiMainMenuItem from 'components/AuiMainMenuItem'

defineOptions({ name: 'AuiMainMenuFavourites' })

defineProps({
    items: {
        type: Array,
        required: true
    },
    filterRegExp: {
        type: RegExp,
        default: undefined
    }
})

defineEmits(['delete'])
</script>
