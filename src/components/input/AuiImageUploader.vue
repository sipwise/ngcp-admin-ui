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
        <template v-slot:header="scope">
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
        <template v-slot:list>
            <q-item
                v-if="selectedFile"
            >
                <q-item-section
                    avatar
                >
                    <img
                        :src="createObjectUrlFromFile(selectedFile)"
                        :style="previewStyle"
                    >
                </q-item-section>
                <q-item-section>
                    <q-item-label
                        class="full-width ellipsis"
                    >
                        {{ selectedFile.name }}
                    </q-item-label>
                    <q-item-label
                        caption
                    >
                        {{ selectedFile.size }}
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
                v-else-if="image"
            >
                <q-item-section
                    avatar
                >
                    <img
                        :src="createObjectUrlFromFile(image)"
                        :style="previewStyle"
                    >
                </q-item-section>
                <q-item-section>
                    <q-item-label
                        class="full-width ellipsis"
                    >
                        {{ image.name }}
                    </q-item-label>
                    <q-item-label
                        caption
                    >
                        {{ image.size }}
                    </q-item-label>
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
        value: {
            type: File,
            default: null
        },
        image: {
            type: String,
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
    data () {
        return {
            selectedFile: this.value
        }
    },
    watch: {
        value (value) {
            if (!value) {
                this.$refs.uploader.reset()
                this.selectedFile = null
            }
        }
    },
    mounted () {
        this.selectedFile = this.value
    },
    methods: {
        createObjectUrlFromFile (file) {
            return URL.createObjectURL(file)
        },
        setImage (image) {
            if (image) {
                this.$refs.uploader.addFiles([image])
            } else {
                this.$refs.uploader.addFiles([])
            }
        },
        change (files) {
            let payload = null
            if (files && files.length > 0) {
                payload = files[0]
            }
            this.selectedFile = payload
            this.emitInput()
        },
        reset () {
            this.$refs.uploader.reset()
            this.selectedFile = null
            this.emitInput()
        },
        emitInput () {
            this.$emit('input', this.selectedFile)
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.aui-image-uploader
    width: 100%
</style>
