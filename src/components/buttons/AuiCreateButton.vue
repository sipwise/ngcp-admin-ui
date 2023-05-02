<template>
    <q-btn
        size="sm"
        color="primary"
        unelevated
        outline
        icon="add"
        :label="$attrs.label || $t('Create')"
        @click="goTo"
    />
</template>

<script>
export default {
    name: 'AuiCreateButton',
    props: {
        to: {
            type: Object,
            required: true
        },
        formData: {
            type: Object,
            default: undefined
        }
    },
    methods: {
        async goTo () {
            const toPath = this.$router.resolve(this.to).path
            await this.$auiGoToNextForm({
                fromPath: this.$route.path,
                toPath: toPath,
                formData: this.formData
            })
        }
    }
}
</script>
