<template>
    <portal
        to="page-toolbar-left"
    >
        <aui-save-button
            class="q-mr-sm"
            :disable="(!hasInvalidData && !hasUnsavedData) || loading || $waitPage()"
            @click="$emit('submit')"
        />
        <aui-reset-button
            class="q-mr-sm"
            :disable="!hasUnsavedData || loading || $waitPage()"
            @click="$emit('reset')"
        />
        <aui-close-button
            v-if="closeButton"
            :disable="loading || $waitPage()"
            @click="close"
        />
    </portal>
</template>
<script>
import AuiSaveButton from 'components/buttons/AuiSaveButton'
import AuiCloseButton from 'components/buttons/AuiCloseButton'
import AuiResetButton from 'components/buttons/AuiResetButton'
export default {
    name: 'AuiFormActionsUpdate',
    components: {
        AuiResetButton,
        AuiCloseButton,
        AuiSaveButton
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        hasUnsavedData: {
            type: Boolean,
            default: false
        },
        hasInvalidData: {
            type: Boolean,
            default: false
        },
        closeButton: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        close () {
            this.$emit('close')
            this.$auiGoToPrevForm()
        }
    }
}
</script>
