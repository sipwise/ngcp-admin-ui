<template>
    <aui-page-form
        :title="$t('Add new {resourceSingular}', {
            resourceSingular: resourceSingular
        })"
        :icon="icon"
        :list-route="listRoute"
        :resource-singular="resourceSingular"
        :loading="loading"
        :title-loading="false"
    >
        <template
            v-slot:actions
        >
            <q-btn
                icon="save"
                color="primary"
                unelevated
                :label="$t('Save')"
                :loading="loading"
                :disable="loading"
                @click="$emit('create')"
            />
        </template>
        <slot />
    </aui-page-form>
</template>
<script>
import AuiPageForm from 'pages/AuiPageForm'
export default {
    name: 'AuiPageFormCreation',
    components: {
        AuiPageForm
    },
    props: {
        listRoute: {
            type: String,
            required: true
        },
        resourceSingular: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        },
        icon: {
            type: String,
            default: undefined
        }
    }
}
</script>
