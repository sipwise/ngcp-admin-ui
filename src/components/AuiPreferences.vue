<template>
    <div
        style="position: relative; height: 100%;"
    >
        <q-list
            style="top: 0; left: 0; right: 0; bottom: 0; overflow: auto;"
            class="absolute"
        >
            <q-item
                v-for="(item, index) of items"
                :key="index"
            >
                <div
                    v-if="item.type === 'group'"
                    style="width: 100%;"
                >
                    <q-item
                        :key="item.name"
                        :style="(index > 0)?'padding-top: 37px;':''"
                        dense
                    >
                        <q-item-section
                            top
                        >
                            <q-item-label
                                class="text-uppercase"
                            >
                                {{ item.label }}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-separator
                        :key="'aui-separator-' + item.name"
                    />
                </div>
                <div
                    v-else-if="item.type === 'preference'"
                    style="width: 100%;"
                >
                    <q-item
                        :key="item.name"
                    >
                        <q-item-section
                            class="col-3 ellipsis text-body2"
                        >
                            <text-highlight
                                v-if="search !== undefined && search !== null && search !== ''"
                                :query="search"
                            >
                                {{ item.name }}
                            </text-highlight>
                            <template
                                v-else
                            >
                                {{ item.name }}
                            </template>
                        </q-item-section>
                        <q-item-section
                            class="col-4"
                        >
                            <aui-input-chips
                                v-if="preferenceExtension[item.name] && preferenceExtension[item.name].type === 'array'"
                                :value="preferencesData[item.name]"
                                :label="item.preference.label"
                                :validation="preferenceExtension[item.name].inputValidations"
                                :disable="$wait.is(waitIdentifier) || !preferencesDataLoaded || readonly"
                                :loading="$wait.is(waitIdentifier + '-' + item.name)"
                                :emit-array="true"
                                dense
                                @input="setPreferenceEvent(item.name, $event)"
                            />
                            <aui-select-lazy
                                v-else-if="preferenceExtension[item.name] && preferenceExtension[item.name].type === 'select-lazy'"
                                :model-value="preferencesData[item.name]"
                                :store-action="preferenceExtension[item.name].action"
                                :store-action-params="selectLazyStoreActionParams(preferenceExtension[item.name].actionParams)"
                                :store-getter="preferenceExtension[item.name].getter"
                                :store-generator-name="preferenceExtension[item.name].storeGeneratorName"
                                :label="item.preference.label"
                                :load-initially="false"
                                :disable="$wait.is(waitIdentifier) || !preferencesDataLoaded || readonly"
                                :loading="$wait.is(waitIdentifier + '-' + item.name)"
                                clearable
                                dense
                                @update:model-value="setPreferenceEvent(item.name, $event)"
                            />
                            <q-input
                                v-else-if="item.preference.data_type === 'string' || item.preference.data_type === 'int'"
                                v-model.trim="preferencesInputData[item.name]"
                                dense
                                clearable
                                hide-bottom-space
                                :type="(item.preference.data_type === 'string')?'text':'number'"
                                :label="item.preference.label"
                                :readonly="item.preference.readonly"
                                :disable="$wait.is(waitIdentifier) || !preferencesDataLoaded || readonly"
                                :loading="$wait.is(waitIdentifier + '-' + item.name)"
                                :error="v$.preferencesInputData[item.name] && v$.preferencesInputData[item.name]?.$errors?.length > 0"
                                :error-message="$errMsg(v$.preferencesInputData[item.name]?.$errors)"
                                @keyup.enter="setPreferenceEvent(item.name, preferencesInputData[item.name])"
                                @clear="resetPreferenceValidation(item.name)"
                                @blur="resetPreferenceValidation(item.name)"
                            >
                                <template
                                    v-if="preferencesInputData[item.name] !== preferencesData[item.name]"
                                    #append
                                >
                                    <q-btn
                                        icon="check"
                                        color="primary"
                                        size="sm"
                                        :label="$t('Save')"
                                        data-cy="preference-save"
                                        flat
                                        dense
                                        @click="setPreferenceEvent(item.name, preferencesInputData[item.name])"
                                    />
                                    <q-btn
                                        icon="undo"
                                        color="primary"
                                        size="sm"
                                        :label="$t('Reset')"
                                        data-cy="preference-reset"
                                        flat
                                        dense
                                        @click="resetPreferenceValue(item.name)"
                                    />
                                </template>
                            </q-input>
                            <q-toggle
                                v-else-if="item.preference.data_type === 'boolean'"
                                dense
                                hide-hint
                                :model-value="preferencesData[item.name] || false"
                                :label="item.preference.label"
                                :readonly="item.preference.readonly"
                                :disable="$wait.is(waitIdentifier) || !preferencesDataLoaded || readonly"
                                :loading="$wait.is(waitIdentifier + '-' + item.name)"
                                @update:model-value="setPreferenceEvent(item.name, $event)"
                            >
                                <q-spinner
                                    v-if="$wait.is(waitIdentifier + '-' + item.name)"
                                    size="sm"
                                    class="q-ml-md"
                                />
                            </q-toggle>
                            <q-select
                                v-else-if="item.preference.data_type === 'enum'"
                                dense
                                hide-hint
                                map-options
                                emit-value
                                :options="selectOptions(item.preference)"
                                :model-value="preferencesData[item.name]"
                                :display-value="getEnumDisplayValue(item.preference, preferencesData[item.name])"
                                :label="item.preference.label"
                                :readonly="item.preference.readonly"
                                :disable="$wait.is(waitIdentifier) || !preferencesDataLoaded || readonly"
                                :loading="$wait.is(waitIdentifier + '-' + item.name)"
                                @update:model-value="setPreferenceEvent(item.name, $event)"
                            />
                            <aui-input-file
                                v-else-if="item.preference.data_type === 'blob'"
                                dense
                                hide-hint
                                :label="item.preference.label"
                                :model-value="initialContentType(item.name)"
                                :readonly="item.preference.readonly"
                                :disable="$wait.is(waitIdentifier) || !preferencesDataLoaded || readonly"
                                :loading="$wait.is(waitIdentifier + '-' + item.name)"
                                :allowed-file-types="allowedTypes(item.name)"
                                :resource-name="item.name"
                                @input="setPreferenceEvent(item.name, $event, true)"
                                @file-download="downloadFile(item.name, $event)"
                            />
                        </q-item-section>
                        <q-item-section
                            class="col-3 q-pl-md text-body2 text-weight-light"
                        >
                            {{ item.preference.description }}
                        </q-item-section>
                        <q-item-section
                            v-if="item.preference.id"
                        >
                            <div class="row no-wrap items-center">
                                <q-btn
                                    color="primary"
                                    :label="$t('Edit')"
                                    icon="edit"
                                    size="sm"
                                    class="q-mr-sm"
                                    @click="goTo(item.preference.id)"
                                />
                                <q-btn
                                    color="negative"
                                    :label="$t('Delete')"
                                    icon="delete"
                                    size="sm"
                                    @click="deleteCustomPreference(item.preference.id)"
                                />
                            </div>
                        </q-item-section>
                    </q-item>
                </div>
            </q-item>
        </q-list>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import AuiInputChips from 'components/input/AuiInputChips'
import AuiInputFile from 'components/input/AuiInputFile'
import AuiSelectLazy from 'components/input/AuiSelectLazy'
import _ from 'lodash'
import { LICENSES, PLATFORM_CE } from 'src/constants'
import { fileToBase64 } from 'src/helpers/file'
import { showGlobalErrorMessage } from 'src/helpers/ui'
import { mapActions } from 'vuex'
export default {
    name: 'AuiPreferences',
    components: { AuiSelectLazy, AuiInputChips, AuiInputFile },
    props: {
        preferencesId: {
            type: String,
            required: true
        },
        resourceId: {
            type: [Number, String],
            required: true
        },
        resource: {
            type: String,
            required: true
        },
        resourceData: {
            type: String,
            required: true
        },
        resourceSchema: {
            type: String,
            required: true
        },
        secondResourceSchema: {
            type: String,
            default: null
        },
        search: {
            type: String,
            default: undefined
        },
        category: {
            type: String,
            default: undefined
        },
        preferenceExtension: {
            type: Object,
            default () {
                return {}
            }
        },
        preferenceGroupExtension: {
            type: Object,
            default () {
                return {}
            }
        },
        readonly: {
            type: Boolean,
            default: false
        },
        resourceContext: {
            type: Object,
            default () {
                return {}
            }
        },
        resourceContextRelatedObjects: {
            type: Object,
            default () {
                return {}
            }
        },
        resourceContextRelatedSubObjects: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            v$: useValidate(),
            preferencesInputData: {}
        }
    },
    validations () {
        const validations = {}
        _.forEach(this.preferenceExtension, (extension, preference) => {
            if (extension.validations) {
                validations[preference] = extension.validations
            }
        })
        return {
            preferencesInputData: validations
        }
    },
    computed: {
        items () {
            const items = []
            let normalisedSearch = ''
            if (_.isString(this.search)) {
                normalisedSearch = _.trim(this.search).toLowerCase()
            }
            this.preferencesSchema.forEach((preferencesGroup) => {
                // This block filters out preferences with invalid licenses for non CE platforms
                const groupsRequiringValidLicense = ['Internals', 'Media Codec Transcoding Options', 'NAT and Media Flow Control']
                const preferencesGroupName = preferencesGroup[0]
                const processedPreferencesGroup = groupsRequiringValidLicense.includes(preferencesGroupName) && this.$store.state.user.platformInfo.type !== PLATFORM_CE ? [preferencesGroupName, this.selectPreferencesWithActiveLicense(preferencesGroup[1])] : preferencesGroup
                const normalisedGroupName = _.snakeCase(_.lowerCase(processedPreferencesGroup[0]))
                const hasCapability = (this.preferenceGroupExtension[normalisedGroupName] &&
                    this.preferenceGroupExtension[normalisedGroupName].$c &&
                    this.$capability(this.preferenceGroupExtension[normalisedGroupName].$c)) ||
                    !this.preferenceGroupExtension[normalisedGroupName]
                if (hasCapability && (!this.category || (this.category && this.category === processedPreferencesGroup[0]))) {
                    if (items.length > 0 && _.last(items).type === 'group') {
                        items.pop()
                    }
                    items.push({
                        type: 'group',
                        name: processedPreferencesGroup[0],
                        label: processedPreferencesGroup[0]
                    })
                    processedPreferencesGroup[1].forEach((preference) => {
                        const normalisedPref = preference[0].toLowerCase()
                        const found = (normalisedSearch !== '' && normalisedPref.includes(normalisedSearch))
                        if (!this.search || found) {
                            items.push({
                                type: 'preference',
                                name: preference[0],
                                preference: preference[1]
                            })
                        }
                    })
                }
            })
            if (items.length > 0 && _.last(items).type === 'group') {
                items.pop()
            }
            return Object.freeze(items)
        },
        preferencesSchema () {
            const schema = this.$store.state.dataTable[`${this.preferencesId}PreferencesSchema`]
            if (!schema) {
                return []
            }
            return schema
        },
        preferencesErrorContext () {
            return this.$store.state.dataTable[`${this.preferencesId}PreferencesErrorContext`]
        },
        preferencesErrorMessage () {
            return this.$store.state.dataTable[`${this.preferencesId}PreferencesErrorMessage`]
        },
        preferencesData () {
            let data
            if (this.preferencesId) {
                data = this.$store.state.dataTable[`${this.preferencesId}PreferencesData`]
            }
            if (data) {
                return data
            }
            return {}
        },
        preferencesDataLoaded () {
            return typeof this.$store.state.dataTable[`${this.preferencesId}PreferencesData`] === 'object'
        },
        waitIdentifier () {
            return `aui-preferences-${this.preferencesId}*`
        },
        initialContentType () {
            return (itemName) => _.get(this.preferencesData, `${itemName}.content_type`)
        },
        allowedTypes () {
            return (itemName) => _.get(this.preferenceExtension, `${itemName}.allowedFileTypes`)
        }
    },
    watch: {
        preferencesData (data) {
            this.preferencesInputData = _.clone(data)
        },
        preferencesErrorMessage (error) {
            if (error !== undefined && error !== null) {
                showGlobalErrorMessage(`${this.preferencesErrorContext}: ${error}`)
            }
        }
    },
    mounted () {
        this.preferencesInputData = _.clone(this.preferencesData)
    },
    methods: {
        ...mapActions('dataTable', [
            'setPreference',
            'removePreference',
            'loadPreferences',
            'loadPreferencesSchema',
            'downloadPreferenceFile',
            'deleteCustomPreferences'
        ]),
        async setPreferenceEvent (field, value, isFile) {
            let isValid = true
            if (this.v$.preferencesInputData[field]) {
                this.v$.preferencesInputData[field].$touch()
                isValid = !this.v$.preferencesInputData[field].$error
            }
            if (isValid) {
                this.$wait.start(`${this.waitIdentifier}-${field}`)
                let processedValue = value
                if (_.isString(processedValue)) {
                    processedValue = _.trim(processedValue)
                }
                if (processedValue === undefined || processedValue === null || processedValue === '' || processedValue === false || (Array.isArray(processedValue) && !processedValue.length)) {
                    await this.removePreference({
                        preferencesId: this.preferencesId,
                        resourceId: this.resourceId,
                        resourceData: this.resourceData,
                        preferenceName: field
                    })
                } else if (processedValue && isFile) {
                    const fileData = { content_type: processedValue.type, data: await fileToBase64(processedValue) }
                    await this.setPreference({
                        preferencesId: this.preferencesId,
                        resourceId: this.resourceId,
                        resourceData: this.resourceData,
                        preferenceName: field,
                        preferenceValue: fileData,
                        existsInCurrentPreferences: this.preferencesData[field] !== undefined
                    })
                } else {
                    await this.setPreference({
                        preferencesId: this.preferencesId,
                        resourceId: this.resourceId,
                        resourceData: this.resourceData,
                        preferenceName: field,
                        preferenceValue: processedValue,
                        existsInCurrentPreferences: this.preferencesData[field] !== undefined
                    })
                }
                this.$wait.end(`${this.waitIdentifier}-${field}`)
            }
        },
        selectOptions (preference) {
            const options = []
            preference.enum_values.forEach((item) => {
                options.push({
                    label: item.label,
                    value: item.value
                })
            })
            return options
        },
        getEnumDisplayValue (preference, value) {
            let processedValue = value
            if (value === undefined) {
                processedValue = null
            }

            const option = preference.enum_values.find((item) => item.value === processedValue)
            return option ? option.label : processedValue
        },
        inputArray (preference, value) {
            if (!this.preferencesInputData[preference]) {
                this.preferencesInputData[preference] = []
            }
            this.preferencesInputData[preference].push(value)
        },
        resetPreferenceValue (preference) {
            this.preferencesInputData[preference] = this.preferencesData[preference]
        },
        resetPreferenceValidation (preference) {
            if ((this.preferencesInputData[preference] === undefined ||
                this.preferencesInputData[preference] === null ||
                this.preferencesInputData[preference] === '') &&
                this.v$.preferencesInputData[preference]) {
                this.v$.preferencesInputData[preference].$reset()
            }
        },
        selectLazyStoreActionParams (actionParams) {
            let params = null
            if (_.isObject(actionParams)) {
                params = {}
                Object.entries(actionParams).forEach((param) => {
                    const [actionParamName, actionParamPath] = param
                    params[actionParamName] = _.get(this.resourceContext, actionParamPath, null)
                    if (params[actionParamName] === null) {
                        params[actionParamName] = _.get(this.resourceContextRelatedObjects, actionParamPath, null)
                    }
                })
            }
            return params
        },
        async downloadFile (itemName, contentType) {
            this.$wait.start(`${this.waitIdentifier}-${itemName}`)
            await this.downloadPreferenceFile({
                contentType,
                resourceData: this.resourceData,
                resourceId: this.resourceId,
                preferenceName: itemName
            })
            this.$wait.end(`${this.waitIdentifier}-${itemName}`)
        },
        selectPreferencesWithActiveLicense (preferencesGroup) {
            const updatedPreferencesGroup = []
            preferencesGroup.forEach((preference) => {
                const preferenceName = preference[0]
                switch (preferenceName) {
                case 'advice_of_charge':
                    if (this.$store.state.user.platformInfo.licenses.includes(LICENSES.aof)) {
                        updatedPreferencesGroup.push(preference)
                    }
                    break
                case 'mobile_push_enable':
                    if (this.$store.state.user.platformInfo.licenses.includes(LICENSES.pushd)) {
                        updatedPreferencesGroup.push(preference)
                    }
                    break
                case 'mobile_push_expiry':
                    if (this.$store.state.user.platformInfo.licenses.includes(LICENSES.pushd)) {
                        updatedPreferencesGroup.push(preference)
                    }
                    break
                case 'always_transcode':
                    if (this.$store.state.user.platformInfo.licenses.includes(LICENSES.transcoding)) {
                        updatedPreferencesGroup.push(preference)
                    }
                    break
                case 'record_call':
                    if (this.$store.state.user.platformInfo.licenses.includes(LICENSES.call_recording)) {
                        updatedPreferencesGroup.push(preference)
                    }
                    break
                default:
                    if (preferenceName.includes('transcode_')) {
                        if (this.$store.state.user.platformInfo.licenses.includes(LICENSES.transcoding)) {
                            updatedPreferencesGroup.push(preference)
                        }
                        break
                    }

                    return updatedPreferencesGroup.push(preference)
                }
            })

            return updatedPreferencesGroup
        },
        async deleteCustomPreference (id) {
            await this.deleteCustomPreferences(id)
            await this.loadPreferencesSchema({
                preferencesId: this.preferencesId,
                resourceSchema: this.resourceSchema,
                secondResourceSchema: this.secondResourceSchema
            })
        },
        async goTo (id) {
            const toPath = this.$router.resolve({
                name: 'customerPreferenceEdit',
                params: {
                    preferenceId: id
                }
            }).path
            await this.$auiGoToNextForm({
                fromPath: this.$route.path,
                toPath,
                formData: this.formData
            })
        }
    }
}
</script>
