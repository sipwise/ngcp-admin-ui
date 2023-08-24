<template>
    <q-popup-proxy
        ref="popup"
        persistent
    >
        <q-card>
            <q-card-section>
                <slot />
            </q-card-section>
            <q-card-actions
                align="right"
            >
                <q-btn
                    v-close-popup
                    flat
                    :label="$t('Close')"
                    icon="clear"
                />
                <q-btn
                    icon="check"
                    unelevated
                    color="primary"
                    :label="$t('Save')"
                    @click="doSave"
                />
                <slot
                    name="actions"
                />
            </q-card-actions>
        </q-card>

        <q-inner-loading
            :showing="processing"
        >
            <q-spinner-gears
                size="50px"
                color="primary"
                data-cy="q-spinner-gears"
            />
        </q-inner-loading>
    </q-popup-proxy>
</template>

<script>
/**
 * The component provides a wrapper around some edit\create form to show a popup dialog with Cancel and Save buttons.
 * A nested component should be passed into default slot and has two required and one optional features to work properly:
 * * "submit" method - it will be executed when user pressed "Save" button
 * * "saved" event - which should fire in case the "submit" was successful
 * * "processing(isProcessing: boolean)" event (optional) - if you want to see loading indicator during the submit process
 */
export default {
    name: 'AuiFormPopupProxy',
    data () {
        return {
            processing: false
        }
    },
    computed: {
        getOnSavedHandler () {
            return this.onSaved.bind(this)
        },
        getOnProcessingHandler () {
            return this.onProcessing.bind(this)
        }
    },
    updated () {
        // We should reassign event handlers because the slot components are removing each time we are closing popup.
        // If you know more elegant solution please improve this
        const slotElement = (this.$slots.default || [])[0]
        const slotElementInstance = slotElement?.componentInstance
        if (slotElementInstance) {
            slotElementInstance.$off('saved', this.getOnSavedHandler)
            slotElementInstance.$on('saved', this.getOnSavedHandler)

            slotElementInstance.$off('processing', this.getOnProcessingHandler)
            slotElementInstance.$on('processing', this.getOnProcessingHandler)
        }
    },
    methods: {
        doSave () {
            const slotElement = (this.$slots.default || [])[0]
            if (slotElement) {
                const submitFunction = slotElement.componentInstance.submit
                if (typeof submitFunction === 'function') {
                    slotElement.componentInstance.submit()
                } else {
                    throw Error(`${this.name}: cannot find "submit" method in nested component`)
                }
            } else {
                throw Error(`${this.name}: cannot find nested component`)
            }
        },
        onSaved () {
            this.$refs.popup.hide()
        },
        onProcessing (value) {
            this.processing = value
        }
    }
}
</script>
