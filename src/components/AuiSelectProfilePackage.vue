<template>
    <aui-select-lazy
        icon="fas fa-cubes"
        :label="$t('Profile Package')"
        data-cy="aui-select-profile-package"
        clearable
        store-generator-name="selectLazy/profilePackagesList"
        :load-initially="false"
        v-bind="$attrs"
    >
        <template
            v-for="(_, slotName) of $slots"
            #[slotName]="scope"
        >
            <slot
                :name="slotName"
                v-bind="scope"
            />
        </template>
    </aui-select-lazy>
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
    name: 'AuiSelectProfilePackage',
    components: {
        AuiSelectLazy
    }
}
</script>
