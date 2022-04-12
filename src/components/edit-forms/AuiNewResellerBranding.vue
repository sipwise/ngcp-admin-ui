<template>
    <aui-base-form
        layout="6"
    >
        <slot
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
                    v-model="formData.logo_image"
                    :label="$t('CSC logo')"
                    :diable="loading"
                    preview-style="min-width: 84px; max-width: 100px; max-height: 60px"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-color-picker
                    v-model="formData.csc_color_primary"
                    :label="$t('CSC font color')"
                    data-cy="csc-font-color"
                    :diable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-color-picker
                    v-model="formData.csc_color_secondary"
                    :label="$t('CSC background color')"
                    data-cy="csc-background-color"
                    :diable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-input-css
                    v-model="formData.css"
                    :label="$t('CSC custom CSS')"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import AuiColorPicker from 'components/input/AuiColorPicker'
import AuiImageUploader from 'components/input/AuiImageUploader'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiInputCss from 'components/input/AuiInputCss'
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
    computed: {
        getInitialData () {
            if (this.initialFormData) {
                return {
                    logo_image: this.initialFormData.logo_image,
                    csc_color_primary: this.initialFormData.csc_color_primary,
                    csc_color_secondary: this.initialFormData.csc_color_secondary,
                    css: this.initialFormData.css
                }
            } else {
                return {
                    logo_image: null,
                    csc_color_primary: null,
                    csc_color_secondary: null,
                    css: null
                }
            }
        }
    }
}
</script>
