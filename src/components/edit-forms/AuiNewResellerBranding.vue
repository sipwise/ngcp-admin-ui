<template>
    <aui-base-form>
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <div
            class="row"
        >
            <div
                class="col-md-6 col-xs-12"
            >
                <q-list
                    :disabled="$wait.is('aui-reseller-branding')"
                >
                    <q-item>
                        <aui-image-uploader
                            v-model="formData.logo_image"
                            :label="$t('CSC logo')"
                            :diable="loading"
                            preview-style="min-width: 84px; max-width: 100px; max-height: 60px"
                        />
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-color-picker
                                v-model="formData.csc_color_primary"
                                :label="$t('CSC font color')"
                                data-cy="csc-font-color"
                                :diable="loading"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-color-picker
                                v-model="formData.csc_color_secondary"
                                :label="$t('CSC background color')"
                                data-cy="csc-background-color"
                                :diable="loading"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </aui-base-form>
</template>

<script>
import AuiColorPicker from 'components/input/AuiColorPicker'
import AuiImageUploader from 'components/input/AuiImageUploader'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiNewResellerBranding',
    components: {
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
                    csc_color_secondary: this.initialFormData.csc_color_secondary
                }
            } else {
                return {
                    logo_image: null,
                    csc_color_primary: null,
                    csc_color_secondary: null
                }
            }
        }
    }
}
</script>
