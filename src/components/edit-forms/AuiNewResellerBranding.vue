<template>
    <aui-base-form
        layout="6"
    >
        <slot
            v-if="canEdit"
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <template
            #col-1
        >
            <aui-base-form-field>
                <aui-image-uploader
                    ref="imageuploader"
                    :image="image"
                    :label="$t('CSC logo')"
                    :disable="!canEdit || loading"
                    preview-style="min-width: 84px; max-width: 100px; max-height: 60px"
                    @input="changeFile"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-color-picker
                    :value="formData.csc_color_primary"
                    :label="$t('CSC font color')"
                    data-cy="csc-font-color"
                    :disable="!canEdit || loading"
                    @input="formData.csc_color_primary=$event"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-color-picker
                    :value="formData.csc_color_secondary"
                    :label="$t('CSC background color')"
                    data-cy="csc-background-color"
                    :disable="!canEdit || loading"
                    @input="formData.csc_color_secondary=$event"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-input-css
                    v-model="formData.css"
                    :label="$t('CSC custom CSS')"
                    :disable="!canEdit || loading"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiColorPicker from 'components/input/AuiColorPicker'
import AuiImageUploader from 'components/input/AuiImageUploader'
import AuiInputCss from 'components/input/AuiInputCss'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiNewResellerBranding',
    components: {
        AuiInputCss,
        AuiBaseFormField,
        AuiBaseForm,
        AuiImageUploader,
        AuiColorPicker
    },
    mixins: [baseFormMixin],
    props: {
        resellerId: {
            type: Number,
            default: null
        }
    },
    data () {
        return {
            image: null
        }
    },
    computed: {
        getInitialData () {
            this.createImage(this.initialFormData?.logo_image)
            return {
                logo_image: this.initialFormData?.logo_image || null,
                csc_color_primary: this.initialFormData?.csc_color_primary || null,
                csc_color_secondary: this.initialFormData?.csc_color_secondary || null,
                css: this.initialFormData?.css || null
            }
        },
        canEdit () {
            return this.$aclCan('update', 'entity.subscribers')
        }
    },
    watch: {
        'formData.logo_image' (value) {
            if (this.$refs.imageuploader) {
                if (!value) {
                    this.$refs.imageuploader.resetFromPage()
                } else {
                    this.$refs.imageuploader.resetFromPage()
                    this.$refs.imageuploader.change([value])
                }
            }
        }
    },
    methods: {
        createImage (file) {
            if (file) {
                this.image = {
                    url: URL.createObjectURL(file),
                    name: file.name,
                    size: file.size
                }
            }
        },
        changeFile (file) {
            this.formData.logo_image = file
        }
    }
}
</script>
