<template>
    <aui-reseller-form
        dense-list
        layout="6-6"
        :reseller="reseller"
        :reseller-id-acl="resellerIdAcl"
        :reseller-id="formData.reseller_id"
        :reseller-id-error="resellerIdHasError"
        :reseller-id-error-message="resellerIdGetError"
        @update:modelValue="resellerIdUpdate"
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
            #reseller-id-after
        >
            <aui-create-reseller-button
                :form-data="formData"
            />
        </template>
        <template
            #col-1
        >
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.vendor"
                    clearable
                    dense
                    :label="$t('Vendor')"
                    :error="hasFieldError('vendor')"
                    :error-message="getFieldError('vendor')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.model"
                    clearable
                    dense
                    :label="$t('Model')"
                    :error="hasFieldError('model')"
                    :error-message="getFieldError('model')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-select
                    v-model="formData.type"
                    :options="typeOptions"
                    emit-value
                    map-options
                    dense
                    :label="$t('Model type')"
                    :error="hasFieldError('type')"
                    :error-message="getFieldError('type')"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.extensions_num"
                    clearable
                    dense
                    :label="$t('Number of extension modules')"
                    :error="hasFieldError('extensions_num')"
                    :error-message="getFieldError('extensions_num')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <q-list
                dense
            >
                <q-item-label
                    header
                    class="text-uppercase"
                >
                    {{ $t('Line/Key Range*') }}
                </q-item-label>
                <template
                    v-if="formData.linerange && formData.linerange.length > 0"
                >
                    <q-item
                        v-for="(line, index) in formData.linerange"
                        :key="index"
                    >
                        <q-item-section>
                            <q-input
                                v-model.trim="line.name"
                                clearable
                                dense
                                :label="$t('Name')"
                                :disable="loading"
                                @keyup.enter="submit"
                            />
                            <div
                                class="row q-col-gutter-x-sm"
                            >
                                <q-toggle
                                    v-model="line.can_private"
                                    :label="$t('Supports Private Line')"
                                    :disable="loading"
                                />
                                <q-toggle
                                    v-model="line.can_shared"
                                    :label="$t('Supports Shared Line')"
                                    :disable="loading"
                                />
                                <q-toggle
                                    v-model="line.can_blf"
                                    :label="$t('Supports Busy Lamp Field')"
                                    :disable="loading"
                                />
                                <q-toggle
                                    v-model="line.can_speeddial"
                                    :label="$t('Supports Speeddial')"
                                    :disable="loading"
                                />
                                <q-toggle
                                    v-model="line.can_forward"
                                    :label="$t('Supports Forward')"
                                    :disable="loading"
                                />
                                <q-toggle
                                    v-model="line.can_transfer"
                                    :label="$t('Supports Transfer')"
                                    :disable="loading"
                                />
                            </div>
                            <q-item-label
                                header
                            >
                                {{ $t('Key Definition') }}
                            </q-item-label>
                            <q-item
                                v-for="(key, keyId) in formData.linerange[index].keys"
                                :key="keyId"
                            >
                                <q-item-section class="no-padding">
                                    <div class="row q-col-gutter-x-sm items-center">
                                        <div class="col-10">
                                            <div class="row q-col-gutter-x-sm">
                                                <q-input
                                                    v-model.trim="key.x"
                                                    clearable
                                                    dense
                                                    :label="$t('X')"
                                                    :disable="loading"
                                                    class="col-4"
                                                    @keyup.enter="submit"
                                                />
                                                <q-input
                                                    v-model.trim="key.y"
                                                    clearable
                                                    dense
                                                    :label="$t('Y')"
                                                    :disable="loading"
                                                    class="col-4"
                                                    @keyup.enter="submit"
                                                />
                                                <q-select
                                                    v-model="key.labelpos"
                                                    :options="orientationOptions"
                                                    emit-value
                                                    map-options
                                                    dense
                                                    :label="$t('Orientation')"
                                                    :disable="loading"
                                                    class="col-4"
                                                />
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <q-btn
                                                color="negative"
                                                unelevated
                                                dense
                                                icon="delete"
                                                size="sm"
                                                :disable="loading"
                                                @click="deleteKey(index, keyId)"
                                            />
                                        </div>
                                    </div>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section
                                    class="aui-list-item-section-button"
                                    side
                                >
                                    <q-btn
                                        :label="$t('Add Key')"
                                        color="primary"
                                        icon="add"
                                        size="sm"
                                        unelevated
                                        outline
                                        :disable="loading"
                                        @click="addKey(index)"
                                    />
                                </q-item-section>
                            </q-item>
                        </q-item-section>
                        <q-item-section
                            side
                        >
                            <q-btn
                                color="negative"
                                unelevated
                                dense
                                icon="delete"
                                size="sm"
                                :disable="loading"
                                @click="deleteLine(index)"
                            />
                        </q-item-section>
                    </q-item>
                </template>
                <q-item>
                    <q-item-section
                        class="aui-list-item-section-button"
                        side
                    >
                        <q-btn
                            :label="$t('Add another Line/Key Range')"
                            color="primary"
                            icon="add"
                            size="sm"
                            unelevated
                            outline
                            :disable="loading"
                            @click="addLine"
                        />
                    </q-item-section>
                </q-item>
            </q-list>
        </template>
        <template #col-2>
            <aui-base-form-field
                required
            >
                <q-select
                    v-model="formData.bootstrap_method"
                    :options="bootstrapMethodOptions"
                    emit-value
                    map-options
                    dense
                    :error="hasFieldError('bootstrap_method')"
                    :error-message="getFieldError('bootstrap_method')"
                    :label="$t('Bootstrap Method')"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.bootstrap_uri"
                    clearable
                    dense
                    :label="$t('Bootstrap URI')"
                    :error="hasFieldError('bootstrap_uri')"
                    :error-message="getFieldError('bootstrap_uri')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.bootstrap_config_http_sync_method"
                    :options="bootstrapConfigOptions"
                    emit-value
                    map-options
                    dense
                    :label="$t('Bootstrap Sync HTTP Method')"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.bootstrap_config_http_sync_uri"
                    clearable
                    dense
                    :label="$t('Bootstrap Sync URI')"
                    :error="hasFieldError('bootstrap_config_http_sync_uri')"
                    :error-message="getFieldError('bootstrap_config_http_sync_uri')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.bootstrap_config_http_sync_params"
                    clearable
                    dense
                    :label="$t('Bootstrap Sync Parameters')"
                    :error="hasFieldError('bootstrap_config_http_sync_params')"
                    :error-message="getFieldError('bootstrap_config_http_sync_params')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-image-uploader
                    ref="frontimageuploader"
                    :image="front_image"
                    :label="$t('Front Image*')"
                    :disable="loading"
                    preview-style="min-width: 84px; max-width: 100px; max-height: 60px"
                    @input="changeFrontImageFile"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-image-uploader
                    ref="thumbnailimageuploader"
                    :image="front_thumb"
                    :label="$t('Front Image Thumbnail')"
                    :disable="loading"
                    preview-style="min-width: 84px; max-width: 100px; max-height: 60px"
                    @input="changeThumbnailImageFile"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-image-uploader
                    ref="macimageuploader"
                    :image="front_mac"
                    :label="$t('MAC Address Image')"
                    :disable="loading"
                    preview-style="min-width: 84px; max-width: 100px; max-height: 60px"
                    @input="changeMacImageFile"
                />
            </aui-base-form-field>
        </template>
    </aui-reseller-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    required,
    numeric,
    helpers
} from '@vuelidate/validators'
import resellerFormMixin from 'src/mixins/reseller-form'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiResellerForm from 'components/edit-forms/AuiResellerForm'
import AuiCreateResellerButton from 'components/buttons/AuiCreateResellerButton'
import AuiImageUploader from 'components/input/AuiImageUploader'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiNewDeviceManagementModel',
    components: {
        AuiCreateResellerButton,
        AuiResellerForm,
        AuiBaseFormField,
        AuiImageUploader
    },
    mixins: [resellerFormMixin],
    props: {
        reseller: {
            type: Object,
            default: null
        },
        resellerId: {
            type: Number,
            default: null
        },
        images: {
            type: Array,
            default: null
        }
    },
    data () {
        return {
            v$: useValidate(),
            front_image: null,
            front_thumb: null,
            front_mac: null
        }
    },
    validations () {
        return {
            formData: {
                reseller_id: {
                    required
                },
                vendor: {
                    required
                },
                model: {
                    required
                },
                type: {
                    required
                },
                extensions_num: {
                    numeric
                },
                bootstrap_method: {
                    required
                },
                linerange: {
                    $each: helpers.forEach({
                        keys: {
                            $each: helpers.forEach({
                                y: {
                                    numeric,
                                    required
                                },
                                x: {
                                    numeric,
                                    required
                                },
                                labelpos: {
                                    required
                                }
                            })
                        }
                    })
                }
            }
        }
    },
    computed: {
        ...mapGetters('deviceManagement', [
            'typeOptions',
            'orientationOptions',
            'bootstrapMethodOptions',
            'bootstrapConfigOptions'
        ]),
        aclEntity () {
            return 'pbxdevicemodels'
        },
        getInitialData () {
            const defaultLinerange = [{
                name: 'Phone keys',
                can_private: true,
                can_shared: false,
                can_blf: false,
                can_speeddial: false,
                can_transfer: false,
                can_forward: false,
                keys: [{
                    x: 0,
                    y: 0,
                    labelpos: 'top'
                }]
            }]
            if (this.images) {
                this.createFrontImage(this.images)
            }
            return {
                reseller_id: this.initialFormData?.reseller_id || null,
                linerange: this.initialFormData?.linerange || defaultLinerange,
                vendor: this.initialFormData?.vendor || null,
                model: this.initialFormData?.model || null,
                extensions_num: this.initialFormData?.extensions_num || 0,
                type: this.initialFormData?.type || 'phone',
                bootstrap_method: this.initialFormData?.bootstrap_method || 'http',
                bootstrap_uri: this.initialFormData?.bootstrap_uri || null,
                bootstrap_config_http_sync_method: this.initialFormData?.bootstrap_config_http_sync_method || 'GET',
                bootstrap_config_http_sync_uri: this.initialFormData?.bootstrap_config_http_sync_uri || 'http://client.ip/admin/resync',
                bootstrap_config_http_sync_params: this.initialFormData?.bootstrap_config_http_sync_params || 'http://client.ip/admin/resync',
                front_image: this.images?.front_image,
                front_mac: this.images?.front_mac,
                front_thumbnail: this.images?.front_thumb
            }
        }
    },
    watch: {
        'formData.front_image': 'handleImageUpload',
        'formData.front_mac': 'handleImageUpload',
        'formData.front_thumbnail': 'handleImageUpload'
    },
    methods: {
        handleImageUpload (value, key) {
            const uploaderRef = this.$refs[`${key}uploader`]
            if (uploaderRef) {
                uploaderRef.resetFromPage()
                if (value) {
                    uploaderRef.change([value])
                }
            }
        },
        addLine () {
            this.formData.linerange.push({
                name: 'Phone keys',
                can_private: true,
                can_shared: false,
                can_blf: false,
                can_speeddial: false,
                can_transfer: false,
                can_forward: false,
                keys: [{
                    x: 0,
                    y: 0,
                    labelpos: 'top'
                }]
            })
        },
        addKey (index) {
            this.formData.linerange[index].keys.push({
                x: 0,
                y: 0,
                labelpos: 'top'
            })
        },
        deleteLine (index) {
            this.formData.linerange.splice(index, 1)
        },
        deleteKey (index, keyId) {
            this.formData.linerange[index].keys.splice(keyId, 1)
        },
        changeFrontImageFile (file) {
            this.formData.front_image = file
        },
        changeMacImageFile (file) {
            this.formData.front_mac = file
        },
        changeThumbnailImageFile (file) {
            this.formData.front_thumbnail = file
        },
        createFrontImage (file) {
            Object.keys(file).forEach(key => {
                if (file[key]) {
                    this[key] = {
                        url: URL.createObjectURL(file[key]),
                        name: file[key].name,
                        size: file[key].size
                    }
                }
            })
        }
    }
}
</script>
