<template>
    <portal
        to="page-toolbar-left"
    >
        <aui-save-button
            class="q-mr-sm"
            :disable="loading || $waitPage()"
            @click="$emit('submit')"
        />
        <aui-close-button
            :disable="loading || $waitPage()"
            @click="close"
        />
    </portal>
</template>
<script>
import AuiSaveButton from 'components/buttons/AuiSaveButton'
import AuiCloseButton from 'components/buttons/AuiCloseButton'
export default {
    name: 'AuiFormActionsCreation',
    components: {
        AuiCloseButton,
        AuiSaveButton
    },
    props: {
        loading: {
            type: Boolean,
            default: false
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
