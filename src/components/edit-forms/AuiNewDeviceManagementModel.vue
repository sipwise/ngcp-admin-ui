<template>
    <aui-reseller-form
        dense-list
        layout="6-6"
        :reseller="reseller"
        :reseller-id-acl="resellerIdAcl"
        :reseller-id="formData.reseller_id"
        :reseller-id-error="resellerIdHasError"
        :reseller-id-error-message="resellerIdGetError"
        @update:model-value="resellerIdUpdate"
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
                    data-cy="aui-pbxdevicemodel-vendor"
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
                    data-cy="aui-pbxdevicemodel-model"
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
                    data-cy="aui-pbxdevicemodel-modeltype"
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
                    data-cy="aui-pbxdevicemodel-extensionmodules-num"
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
                                data-cy="aui-pbxdevicemodel-linerange-name"
                                :label="$t('Name')"
                                :disable="loading"
                                @keyup.enter="submit"
                            />
                            <div
                                class="row q-col-gutter-x-sm"
                            >
                                <q-toggle
                                    v-model="line.can_private"
                                    data-cy="aui-pbxdevicemodel-linerange-privateline"
                                    :label="$t('Supports Private Line')"
                                    :disable="loading"
                                />
                                <q-toggle
                                    v-model="line.can_shared"
                                    data-cy="aui-pbxdevicemodel-linerange-sharedline"
                                    :label="$t('Supports Shared Line')"
                                    :disable="loading"
                                />
                                <q-toggle
                                    v-model="line.can_blf"
                                    data-cy="aui-pbxdevicemodel-linerange-blf"
                                    :label="$t('Supports Busy Lamp Field')"
                                    :disable="loading"
                                />
                                <q-toggle
                                    v-model="line.can_speeddial"
                                    data-cy="aui-pbxdevicemodel-linerange-speeddial"
                                    :label="$t('Supports Speeddial')"
                                    :disable="loading"
                                />
                                <q-toggle
                                    v-model="line.can_forward"
                                    data-cy="aui-pbxdevicemodel-linerange-forward"
                                    :label="$t('Supports Forward')"
                                    :disable="loading"
                                />
                                <q-toggle
                                    v-model="line.can_transfer"
                                    data-cy="aui-pbxdevicemodel-linerange-transfer"
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
                                                    data-cy="aui-pbxdevicemodel-linerange-key-x"
                                                    :label="$t('X')"
                                                    :disable="loading"
                                                    class="col-4"
                                                    @keyup.enter="submit"
                                                />
                                                <q-input
                                                    v-model.trim="key.y"
                                                    clearable
                                                    dense
                                                    data-cy="aui-pbxdevicemodel-linerange-key-y"
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
                                                    data-cy="aui-pbxdevicemodel-linerange-key-orientation"
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
                                                data-cy="aui-pbxdevicemodel-linerange-key-delete"
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
                                        data-cy="aui-pbxdevicemodel-linerange-addkey"
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
                                data-cy="aui-pbxdevicemodel-linerange-delete"
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
                            data-cy="aui-pbxdevicemodel-linerange-add"
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
                    data-cy="aui-pbxdevicemodel-bootstrap_method"
                    :error="hasFieldError('bootstrap_method')"
                    :error-message="getFieldError('bootstrap_method')"
                    :label="$t('Bootstrap Method')"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-for="field in bootstrapFields"
                :key="field.name"
            >
                <q-select
                    v-if="field.options"
                    v-model="formData[field.name]"
                    :options="field.options"
                    emit-value
                    map-options
                    dense
                    :clearable="field.clearable"
                    :data-cy="field.dataCy || `aui-pbxdevicemodel-${field.name}`"
                    :label="field.label"
                    :error="hasFieldError(field.name)"
                    :error-message="getFieldError(field.name)"
                    :disable="loading"
                />
                <q-input
                    v-else
                    v-model.trim="formData[field.name]"
                    clearable
                    dense
                    :type="field.password ? 'password' : 'text'"
                    :autocomplete="field.password ? 'new-password' : undefined"
                    :data-cy="field.dataCy || `aui-pbxdevicemodel-${field.name}`"
                    :label="field.label"
                    :error="hasFieldError(field.name)"
                    :error-message="getFieldError(field.name)"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <div
                    v-if="v$.formData.front_image.$error"
                    class="text-negative text-caption q-mr-xs"
                >
                    <q-icon
                        name="error"
                        class="q-mr-xs"
                    />
                    {{ $t('Front image is required') }}
                </div>
                <aui-image-uploader
                    ref="frontimageuploader"
                    data-cy="aui-pbxdevicemodel-frontimage"
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
                    data-cy="aui-pbxdevicemodel-frontimage-thumbnail"
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
                    data-cy="aui-pbxdevicemodel-macadress"
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
    helpers,
    numeric,
    required
} from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiCreateResellerButton from 'components/buttons/AuiCreateResellerButton'
import AuiResellerForm from 'components/edit-forms/AuiResellerForm'
import AuiImageUploader from 'components/input/AuiImageUploader'
import resellerFormMixin from 'src/mixins/reseller-form'
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
            type: Object,
            default: null
        }
    },
    data () {
        return {
            v$: useValidate(),
            front_image: null,
            front_thumb: null,
            front_mac: null,
            snomProductFamilyOptions: [
                { label: 'C-Series', value: 'C-Series' },
                { label: 'D-Series', value: 'D-Series' },
                { label: 'M-Series', value: 'M-Series' },
                { label: 'MSC-Series', value: 'MSC-Series' }
            ]
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
                front_image: {
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
        bootstrapFields () {
            const bootstrapUri = {
                name: 'bootstrap_uri',
                label: this.$t('Bootstrap URI')
            }
            const fields = {
                http: [
                    bootstrapUri,
                    {
                        name: 'bootstrap_config_http_sync_method',
                        label: this.$t('Bootstrap Sync HTTP Method'),
                        options: this.bootstrapConfigOptions,
                        dataCy: 'aui-pbxdevicemodel-bootstrap_synchttp'
                    },
                    {
                        name: 'bootstrap_config_http_sync_uri',
                        label: this.$t('Bootstrap Sync URI'),
                        dataCy: 'aui-pbxdevicemodel-bootstrap_sync_uri'
                    },
                    {
                        name: 'bootstrap_config_http_sync_params',
                        label: this.$t('Bootstrap Sync Parameters'),
                        dataCy: 'aui-pbxdevicemodel-bootstrap_params'
                    }
                ],
                redirect_panasonic: [
                    bootstrapUri,
                    {
                        name: 'bootstrap_config_redirect_panasonic_user',
                        label: this.$t('Panasonic username')
                    },
                    {
                        name: 'bootstrap_config_redirect_panasonic_password',
                        label: this.$t('Panasonic password'),
                        password: true
                    }
                ],
                redirect_yealink: [
                    bootstrapUri,
                    {
                        name: 'bootstrap_config_redirect_yealink_user',
                        label: this.$t('Yealink username')
                    },
                    {
                        name: 'bootstrap_config_redirect_yealink_password',
                        label: this.$t('Yealink password'),
                        password: true
                    }
                ],
                redirect_polycom: [
                    {
                        name: 'bootstrap_config_redirect_polycom_user',
                        label: this.$t('Polycom username')
                    },
                    {
                        name: 'bootstrap_config_redirect_polycom_password',
                        label: this.$t('Polycom password'),
                        password: true
                    },
                    {
                        name: 'bootstrap_config_redirect_polycom_profile',
                        label: this.$t('Polycom profile')
                    }
                ],
                redirect_snom: [
                    bootstrapUri,
                    {
                        name: 'bootstrap_config_redirect_snom_user',
                        label: this.$t('Snom access key id')
                    },
                    {
                        name: 'bootstrap_config_redirect_snom_password',
                        label: this.$t('Snom access key secret'),
                        password: true
                    },
                    {
                        name: 'bootstrap_config_redirect_snom_profile',
                        label: this.$t('Snom profile')
                    },
                    {
                        name: 'bootstrap_config_redirect_snom_product_family',
                        label: this.$t('Snom product family'),
                        options: this.snomProductFamilyOptions,
                        clearable: true
                    }
                ],
                redirect_grandstream: [
                    bootstrapUri,
                    {
                        name: 'bootstrap_config_redirect_grandstream_user',
                        label: this.$t('GAPS CID')
                    },
                    {
                        name: 'bootstrap_config_redirect_grandstream_password',
                        label: this.$t('GAPS KEY'),
                        password: true
                    }
                ],
                redirect_ale: [
                    bootstrapUri,
                    {
                        name: 'bootstrap_config_redirect_ale_user',
                        label: this.$t('ALE username')
                    },
                    {
                        name: 'bootstrap_config_redirect_ale_password',
                        label: this.$t('ALE password'),
                        password: true
                    }
                ]
            }
            return fields[this.formData.bootstrap_method] || []
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
                bootstrap_uri: this.initialFormData?.bootstrap_uri ?? '',
                bootstrap_config_http_sync_method: this.initialFormData?.bootstrap_config_http_sync_method ?? 'GET',
                bootstrap_config_http_sync_uri: this.initialFormData?.bootstrap_config_http_sync_uri ?? 'http://[% client.ip %]/admin/resync',
                bootstrap_config_http_sync_params: this.initialFormData?.bootstrap_config_http_sync_params ?? '[% server.uri %]/$MA',
                bootstrap_config_redirect_panasonic_user: this.initialFormData?.bootstrap_config_redirect_panasonic_user ?? '',
                bootstrap_config_redirect_panasonic_password: this.initialFormData?.bootstrap_config_redirect_panasonic_password ?? '',
                bootstrap_config_redirect_yealink_user: this.initialFormData?.bootstrap_config_redirect_yealink_user ?? '',
                bootstrap_config_redirect_yealink_password: this.initialFormData?.bootstrap_config_redirect_yealink_password ?? '',
                bootstrap_config_redirect_polycom_user: this.initialFormData?.bootstrap_config_redirect_polycom_user ?? '',
                bootstrap_config_redirect_polycom_password: this.initialFormData?.bootstrap_config_redirect_polycom_password ?? '',
                bootstrap_config_redirect_polycom_profile: this.initialFormData?.bootstrap_config_redirect_polycom_profile ?? '',
                bootstrap_config_redirect_snom_user: this.initialFormData?.bootstrap_config_redirect_snom_user ?? '',
                bootstrap_config_redirect_snom_password: this.initialFormData?.bootstrap_config_redirect_snom_password ?? '',
                bootstrap_config_redirect_snom_profile: this.initialFormData?.bootstrap_config_redirect_snom_profile ?? '',
                bootstrap_config_redirect_snom_product_family: this.initialFormData?.bootstrap_config_redirect_snom_product_family ?? '',
                bootstrap_config_redirect_grandstream_user: this.initialFormData?.bootstrap_config_redirect_grandstream_user ?? '',
                bootstrap_config_redirect_grandstream_password: this.initialFormData?.bootstrap_config_redirect_grandstream_password ?? '',
                bootstrap_config_redirect_ale_user: this.initialFormData?.bootstrap_config_redirect_ale_user ?? '',
                bootstrap_config_redirect_ale_password: this.initialFormData?.bootstrap_config_redirect_ale_password ?? '',
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
            Object.keys(file).forEach((key) => {
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
