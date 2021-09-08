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
        @added="imageAdded"
        @removed="$emit('image-removed')"
    >
        <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                <div class="col">
                    <div class="q-uploader__title">
                        {{ $t('Logo') }}
                    </div>
                </div>
                <q-btn
                    v-if="scope.canAddFiles"
                    icon="add_box"
                    dense
                    flat
                >
                    <q-uploader-add-trigger />
                </q-btn>
            </div>
        </template>
        <template v-slot:list="scope">
            <q-item
                v-if="scope.files && scope.files.length > 0"
            >
                <q-item-section>
                    <q-item-label class="full-width ellipsis">
                        {{ scope.files[0].name }}
                    </q-item-label>

                    <q-item-label caption>
                        {{ scope.files[0].__sizeLabel }}
                    </q-item-label>
                </q-item-section>
                <q-item-section>
                    <img
                        :src="image"
                        :style="previewStyle"
                    >
                </q-item-section>

                <q-item-section
                    side
                >
                    <aui-clearable-button
                        @click="scope.removeFile(scope.files[0])"
                    />
                </q-item-section>
            </q-item>
            <q-item
                v-if="scope.files.length < 1"
            >
                {{ $t('Select an image to upload.') }}
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
    methods: {
        loadImage (image) {
            this.$refs.uploader.addFiles([image])
        },
        imageAdded (images) {
            this.$emit('image-added', images[0])
        },
        reset () {
            this.$refs.uploader.reset()
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.aui-image-uploader
    width: 100%
</style>
