<template>
    <q-dialog
        ref="dialog"
        class="wide-dialog"
        square
        v-bind="$attrs"
        v-on="$listeners"
    >
        <q-card
            class="q-dialog-plugin"
        >
            <q-card-section
                :class="'q-pa-sm bg-' + titleColor + ' text-white'"
            >
                <q-item
                    dense
                    class="q-pa-none"
                >
                    <q-item-section
                        side
                    >
                        <q-icon
                            :name="titleIcon"
                            :color="titleTextColor"
                            size="sm"
                        />
                    </q-item-section>
                    <q-item-section
                        no-wrap
                    >
                        <q-item-label
                            class="text-subtitle1"
                        >
                            {{ title }}
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>
            <q-card-section
                class="q-pa-none scroll"
                style="max-height: 50vh"
            >
                <div
                    class="q-pa-lg"
                >
                    <p
                        v-for="(item, index) in items"
                        :key="index"
                    >
                        {{ item }}
                    </p>
                </div>
            </q-card-section>
            <q-separator />
            <q-card-actions
                align="right"
            >
                <q-btn
                    v-close-popup
                    flat
                    :label="$t('Close')"
                    :color="titleColor"
                    icon="clear"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    name: 'AuiErrorsListDialog',
    props: {
        title: {
            type: String,
            default: ''
        },
        items: {
            type: Array,
            default: () => []
        },
        titleColor: {
            type: String,
            default: 'negative'
        },
        titleTextColor: {
            type: String,
            default: 'white'
        },
        titleIcon: {
            type: String,
            default: 'warning'
        }
    },
    methods: {
        show () {
            this.$refs.dialog.show()
        },
        hide () {
            this.$refs.dialog.hide()
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
.wide-dialog
    .q-dialog-plugin
        width: max-content
        max-width: 70vw
</style>
