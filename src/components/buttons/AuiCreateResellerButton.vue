<template>
    <aui-create-button
        :to="{ name: 'resellerCreation' }"
        :form-data="formData"
        :label="$t('Create Reseller')"
    />
</template>

<script>
import AuiCreateButton from 'components/buttons/AuiCreateButton'
export default {
    name: 'AuiCreateResellerButton',
    components: { AuiCreateButton },
    props: {
        formData: {
            type: Object,
            default: undefined
        }
    }
}
</script>
