<template>
    <aui-base-sub-context
        @form-has-unsaved-data="hasUnsavedData=$event"
        v-on="$listeners"
    >
        <portal
            to="page-toolbar-left"
        >
            <aui-save-button
                class="q-mr-sm q-ml-md"
                :disable="!hasUnsavedData || $waitPage()"
                @click="submit"
            />
            <aui-reset-button
                class="q-mr-sm"
                :disable="!hasUnsavedData || $waitPage()"
                @click="reset"
            />
            <aui-close-button
                class="q-mr-sm"
                :disable="$waitPage()"
                @click="$router.back()"
            />
        </portal>
        <slot />
    </aui-base-sub-context>
</template>

<script>
import AuiSaveButton from 'components/buttons/AuiSaveButton'
import AuiCloseButton from 'components/buttons/AuiCloseButton'
import AuiResetButton from 'components/buttons/AuiResetButton'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
export default {
    name: 'AuiBaseEditContext',
    components: {
        AuiBaseSubContext,
        AuiResetButton,
        AuiCloseButton,
        AuiSaveButton
    },
    data () {
        return {
            hasUnsavedData: false
        }
    },
    mounted () {
        this.$on('form-has-unsaved-data', (value) => {
            this.hasUnsavedData = value
        })
    },
    methods: {
        getForm () {
            if (this.$slots.default && this.$slots.default[0]) {
                const firstComponent = this.$slots.default[0].componentInstance
                if (firstComponent.$el && firstComponent.$el.tagName.toLowerCase() === 'form') {
                    return firstComponent
                }
            }
            return null
        },
        reset () {
            const form = this.getForm()
            if (form && form.reset) {
                form.reset()
            }
        },
        submit () {
            const form = this.getForm()
            if (form && form.submit) {
                form.submit()
            }
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'

.aui-base-edit-context
    padding: $aui-page-padding
</style>
