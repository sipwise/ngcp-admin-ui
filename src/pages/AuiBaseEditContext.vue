<template>
    <div
        class="aui-base-edit-context"
    >
        <portal
            to="page-toolbar-left"
        >
            <aui-save-button
                class="q-mr-sm q-ml-xl"
                :disable="!hasUnsavedData || loading"
                @click="$emit('save')"
            />
            <aui-reset-button
                class="q-mr-sm"
                :disable="!hasUnsavedData || loading"
                @click="$emit('reset')"
            />
            <aui-close-button
                class="q-mr-sm"
                :disable="loading"
                @click="$router.push({ name: $route.meta.listRoute })"
            />
        </portal>
        <slot />
    </div>
</template>

<script>
import AuiSaveButton from 'components/buttons/AuiSaveButton'
import AuiCloseButton from 'components/buttons/AuiCloseButton'
import AuiResetButton from 'components/buttons/AuiResetButton'
export default {
    name: 'AuiBaseEditContext',
    components: {
        AuiResetButton,
        AuiCloseButton,
        AuiSaveButton
    },
    props: {
        hasUnsavedData: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'

.aui-base-edit-context
    padding: $aui-page-padding
</style>
