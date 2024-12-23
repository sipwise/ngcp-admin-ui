<template>
    <q-item
        :class="classes"
    >
        <q-item-section>
            <slot />
        </q-item-section>
    </q-item>
</template>

<script>
export default {
    name: 'AuiBaseFormField',
    props: {
        required: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes () {
            if (this.required) {
                return ['aui-required']
            }
            return []
        }
    }
}
</script>
