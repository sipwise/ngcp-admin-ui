<template>
    <q-uploader
        ref="uploader"
        hide-upload-btn
        flat
        bordered
        no-thumbnails
        class="aui-image-uploader"
        :label="label"
        accept=".jpg, image/*"
        @added="change"
        @removed="change"
    >
        <template #header="scope">
            <div class="row no-wrap justify-between items-center q-pa-sm q-gutter-xs">
                <div
                    class="col-auto"
                >
                    <div class="q-uploader__title">
                        {{ label }}
                    </div>
                </div>
                <div
                    class="col-auto"
                >
                    <q-btn
                        icon="add_box"
                        flat
                        size="sm"
                        outline
                        :label="$t('Select image')"
                        :disable="!scope.canAddFiles"
                    >
                        <q-uploader-add-trigger
                            v-if="scope.canAddFiles"
                        />
                    </q-btn>
                </div>
            </div>
        </template>
        <template #list>
            <q-item
                v-if="selectedFile"
            >
                <q-item-section
                    avatar
                >
                    <img
                        :src="selectedFile.url"
                        :style="previewStyle"
                    >
                </q-item-section>
                <q-item-section>
                    <q-item-label
                        caption
                    >
                        {{ selectedFile.size + ' bytes' }}
                    </q-item-label>
                </q-item-section>
                <q-item-section
                    side
                >
                    <aui-clearable-button
                        @click="reset"
                    />
                </q-item-section>
            </q-item>
            <q-item
                v-else
            >
                <q-item-label
                    class="full-width ellipsis"
                >
                    {{ $t('Select an image to upload') }}
                </q-item-label>
            </q-item>
        </template>
    </q-uploader>
</template>

<script>
import AuiClearableButton from 'components/buttons/AuiClearableButton'
export default {
    name: 'AuiImageUploader',
    components: {
        AuiClearableButton
    },
    props: {
        image: {
            type: Object,
            default: null
        },
        label: {
            type: String,
            default: null
        },
        previewStyle: {
            type: String,
            default: null
        }
    },
    emits: ['input'],
    data () {
        return {
            selectedFile: this.image
        }
    },
    watch: {
        image (image) {
            if (!image) {
                this.$refs.uploader.reset()
                this.selectedFile = null
            } else {
                this.selectedFile = image
            }
        }
    },
    methods: {
        change (files) {
            let payload = null
            if (files && files.length > 0) {
                payload = files[0]
            }
            this.selectedFile = {
                url: URL.createObjectURL(payload),
                name: payload.name,
                size: payload.size
            }
            this.$emit('input', payload)
        },
        resetFromPage () {
            this.$refs.uploader.reset()
            this.selectedFile = null
        },
        reset () {
            this.$refs.uploader.reset()
            this.selectedFile = null
            this.$emit('input', null)
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.aui-image-uploader
    width: 100%
</style>
