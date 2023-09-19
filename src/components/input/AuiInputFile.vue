<template>
    <div>
        <q-file
            ref="fileInput"
            v-model="selectedFile"
            v-bind="$attrs"
            :display-value="contentType"
            :disable="$attrs.loading || $attrs.disable"
            :accept="allowedFileTypes"
            v-on="overwrittenListeners"
        >
            <template
                #append
            >
                <q-btn
                    v-if="(!selectedFile && $attrs.value === undefined) || !showBtns"
                    icon="folder"
                    text-color="primary"
                    flat
                    dense
                    size="sm"
                    unelevated
                    @click="$refs.fileInput.$el.click()"
                />
                <q-btn
                    v-if="toggleSaveBtns"
                    icon="check"
                    color="primary"
                    size="sm"
                    :label="$t('Save')"
                    flat
                    dense
                    @click="save"
                />
                <q-btn
                    v-if="toggleSaveBtns"
                    icon="undo"
                    color="primary"
                    size="sm"
                    :label="$t('Reset')"
                    flat
                    dense
                    @click="revert"
                />
                <q-btn
                    v-if="$attrs.value !== undefined"
                    class="q-ml-sm"
                    icon="download"
                    flat
                    dense
                    text-color="primary"
                    size="sm"
                    unelevated
                    @click="$emit('file-download', contentType)"
                />
                <q-btn
                    v-if="$attrs.value !== undefined"
                    class="q-ml-sm"
                    icon="delete"
                    flat
                    dense
                    color="red"
                    text-color="red"
                    size="sm"
                    unelevated
                    @click="confirmDelete"
                />
            </template>
        </q-file>
    </div>
</template>

<script>
import NegativeConfirmationDialog from 'components/dialog/NegativeConfirmationDialog'
export default {
    name: 'AuiInputFile',
    props: {
        allowedFileTypes: {
            type: String,
            default: ''
        },
        resourceName: {
            type: String,
            default: null
        },
        showBtns: {
            type: Boolean,
            default: true
        }
    },
    emits: ['input', 'file-download'],
    data () {
        return {
            selectedFile: null,
            toggleSaveBtns: false
        }
    },
    computed: {
        contentType () {
            return this.selectedFile?.type || this.$attrs.value
        },
        overwrittenListeners () {
            return {
                input: () => {
                    if (this.showBtns) {
                        this.showSaveBtns(true)
                    }
                }
            }
        }
    },
    methods: {
        save () {
            this.$emit('input', this.selectedFile)
            this.showSaveBtns(false)
        },
        revert () {
            this.selectedFile = null
            this.showSaveBtns(false)
        },
        showSaveBtns (show) {
            this.toggleSaveBtns = show
        },
        confirmDelete () {
            this.$q.dialog({
                component: NegativeConfirmationDialog,
                componentProps: {
                    title: this.$t('Delete {resourceName}', {
                        resourceName: this.resourceName
                    }),
                    icon: 'delete',
                    text: this.$t('You are about to delete this file'),
                    buttonIcon: 'delete',
                    buttonLabel: this.$t('Delete')
                }
            }).onOk(() => {
                this.selectedFile = null
                this.$emit('input', this.selectedFile)
            })
        }
    }
}
</script>
