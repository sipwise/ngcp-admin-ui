<template>
    <base-dialog
        :title="title"
        :text="text"
        title-color="info"
        title-text-color="white"
        v-bind="$attrs"
        @update:model-value="$emit('input')"
    >
        <template
            #actions
        >
            <slot
                name="actions"
            />
        </template>
    </base-dialog>
</template>

<script>
import BaseDialog from './BaseDialog'
export default {
    name: 'InfoDialog',
    components: { BaseDialog },
    props: {
        title: {
            type: String,
            default: 'Title'
        },
        text: {
            type: String,
            default: 'Text'
        }
    },
    emits: ['input']
}
</script>
