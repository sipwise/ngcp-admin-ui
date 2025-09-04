<template>
    <q-dialog
        ref="dialog"
        :full-width="isTranscriptReady"
        @hide="onDialogHide"
    >
        <q-card
            class="q-dialog-plugin"
        >
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">
                    {{ $t('Transcript Details') }}
                </div>
                <q-space />
                <q-btn
                    v-close-popup
                    icon="close"
                    flat
                    round
                    dense
                />
            </q-card-section>

            <q-card-section
                v-if="isLoading"
                class="q-pa-lg text-center"
            >
                <q-spinner
                    color="primary"
                    size="3em"
                />
            </q-card-section>
            <q-card-section v-else>
                <q-card-section v-if="!isTranscriptReady">
                    {{ $t('No data found') }}
                </q-card-section>
                <q-list v-else>
                    <q-item>
                        <q-item-section>
                            <q-item-label caption>
                                {{ $t('Transcript') }}
                            </q-item-label>
                            <q-item-label>{{ text }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn
                    v-close-popup
                    color="primary"
                    :label="$t('Close')"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>

export default {
    name: 'AuiTranscriptDialog',
    props: {
        text: {
            type: String,
            default: null
        },
        status: {
            type: String,
            default: null
        },
        isLoading: {
            type: Boolean,
            default: false
        }
    },
    emits: ['hide', 'close'],
    computed: {
        isTranscriptReady () {
            return this.status === 'done'
        }
    },
    show () {
        this.$refs.dialog.show()
    },
    hide () {
        this.$refs.dialog.hide()
    },
    onDialogHide () {
        this.$refs.dialog.hide()
    }
}
</script>
