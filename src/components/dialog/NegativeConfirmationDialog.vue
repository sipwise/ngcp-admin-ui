<template>
    <base-dialog
        ref="dialog"
        :title="title"
        :text="text"
        :title-icon="icon"
        title-color="negative"
        title-text-color="white"
        v-bind="$attrs"
    >
        <template
            #actions
        >
            <q-btn
                v-close-popup
                unelevated
                :label="buttonLabel"
                :icon="buttonIcon"
                color="negative"
                data-cy="btn-confirm"
                @click="confirmed"
            />
            <slot
                name="actions"
            />
        </template>
    </base-dialog>
</template>

<script>
import BaseDialog from 'src/components/dialog/BaseDialog'
export default {
    name: 'NegativeConfirmationDialog',
    components: { BaseDialog },
    props: {
        title: {
            type: String,
            default: 'Title'
        },
        icon: {
            type: String,
            default: 'delete'
        },
        text: {
            type: String,
            default: 'Text'
        },
        buttonIcon: {
            type: String,
            default: 'delete'
        },
        buttonLabel: {
            type: String,
            default: 'Button'
        }
    },
    emits: ['confirmed', 'ok'],
    methods: {
        show () {
            this.$refs.dialog.show()
        },
        hide () {
            this.$refs.dialog.hide()
        },
        confirmed () {
            this.$emit('confirmed')
            this.$emit('ok')
        }
    }
}
</script>
