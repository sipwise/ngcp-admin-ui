<template>
    <portal
        to="page-toolbar-left"
    >
        <aui-save-button
            class="q-mr-sm"
            :disable="(!hasInvalidData && !hasUnsavedData) || loading || $waitPage($wait)"
            data-cy="aui-save-button"
            @click="$emit('submit')"
        />
        <aui-reset-button
            v-if="isnotdefaultFiles"
            class="q-mr-sm"
            :disable="!hasUnsavedData || loading || $waitPage($wait)"
            data-cy="aui-reset-button"
            @click="$emit('reset')"
        />
        <aui-close-button
            v-if="closeButton"
            :disable="loading || $waitPage($wait)"
            data-cy="aui-close-button"
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
        },
        isnotdefaultFiles: {
            type: Boolean,
            default: true
        },
        path: {
            type: String,
            default: null
        }
    },
    emits: ['submit', 'close', 'reset'],
    methods: {
        close () {
            this.$emit('close')
            this.$goBack(this.path)
        }
    }
}
</script>
