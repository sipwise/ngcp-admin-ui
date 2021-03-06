<template>
    <div
        style="position: relative; height: 100%;"
    >
        <q-virtual-scroll
            ref="virtualScroll"
            style="top: 0; left: 0; right: 0; bottom: 0;"
            class="absolute"
            :items="items"
            :virtual-scroll-item-size="56"
            :virtual-scroll-slice-size="10"
        >
            <template
                v-slot="{item, index}"
            >
                <div
                    v-if="item.type === 'group'"
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
                >
                    <q-item
                        :key="item.name"
                    >
                        <q-item-section
                            class="col-3 ellipsis text-body2"
                        >
                            <text-highlight
                                v-if="search !== undefined && search !== null && search !== ''"
                                :queries="[search]"
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
                                :value="preferencesData[item.name]"
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
                                @input="setPreferenceEvent(item.name, $event)"
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
                                :error="$v.preferencesInputData[item.name] && $v.preferencesInputData[item.name].$error"
                                :error-message="$errMsg($v.preferencesInputData[item.name])"
                                @keyup.enter="setPreferenceEvent(item.name, preferencesInputData[item.name])"
                                @clear="resetPreferenceValidation(item.name)"
                                @blur="resetPreferenceValidation(item.name)"
                            >
                                <template
                                    v-if="preferencesInputData[item.name] !== preferencesData[item.name]"
                                    v-slot:append
                                >
                                    <q-btn
                                        icon="check"
                                        color="primary"
                                        size="sm"
                                        :label="$t('Save')"
                                        flat
                                        dense
                                        @click="setPreferenceEvent(item.name, preferencesInputData[item.name])"
                                    />
                                    <q-btn
                                        icon="undo"
                                        color="primary"
                                        size="sm"
                                        :label="$t('Reset')"
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
                                :value="preferencesData[item.name] || false"
                                :label="item.preference.label"
                                :readonly="item.preference.readonly"
                                :disable="$wait.is(waitIdentifier) || !preferencesDataLoaded || readonly"
                                :loading="$wait.is(waitIdentifier + '-' + item.name)"
                                @input="setPreferenceEvent(item.name, $event)"
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
                                :value="preferencesData[item.name]"
                                :label="item.preference.label"
                                :readonly="item.preference.readonly"
                                :disable="$wait.is(waitIdentifier) || !preferencesDataLoaded || readonly"
                                :loading="$wait.is(waitIdentifier + '-' + item.name)"
                                @input="setPreferenceEvent(item.name, $event)"
                            />
                            <aui-input-file
                                v-else-if="item.preference.data_type === 'blob'"
                                dense
                                hide-hint
                                :label="$t('Emergency Provider info')"
                                :initial-file-name="preferencesData[item.name] && preferencesData[item.name].content_type ? preferencesData[item.name].content_type : undefined"
                                :readonly="item.preference.readonly"
                                :disable="$wait.is(waitIdentifier) || !preferencesDataLoaded || readonly"
                                :loading="$wait.is(waitIdentifier + '-' + item.name)"
                                @fileSelected="setPreferenceEvent(item.name, $event, true)"
                            />
                        </q-item-section>
                        <q-item-section
                            class="col-5 q-pl-md text-body2 text-weight-light ellipsis-2-lines"
                        >
                            {{ item.preference.description }}
                        </q-item-section>
                    </q-item>
                </div>
            </template>
        </q-virtual-scroll>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Base64 } from 'js-base64'
import _ from 'lodash'
import AuiInputChips from 'components/AuiInputChips'
import AuiSelectLazy from 'components/input/AuiSelectLazy'
import AuiInputFile from 'components/input/AuiInputFile'
import { showGlobalErrorMessage } from 'src/helpers/ui'
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
            preferencesInputData: {}
        }
    },
    validations () {
        const validations = {}
        _.forEach(this.preferencesExtension, (extension, preference) => {
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
                const normalisedGroupName = _.snakeCase(_.lowerCase(preferencesGroup[0]))
                const hasCapability = (this.preferenceGroupExtension[normalisedGroupName] &&
                    this.preferenceGroupExtension[normalisedGroupName].$c &&
                    this.$capability(this.preferenceGroupExtension[normalisedGroupName].$c)) ||
                    !this.preferenceGroupExtension[normalisedGroupName]
                if (hasCapability && (!this.category || (this.category && this.category === preferencesGroup[0]))) {
                    if (items.length > 0 && _.last(items).type === 'group') {
                        items.pop()
                    }
                    items.push({
                        type: 'group',
                        name: preferencesGroup[0],
                        label: preferencesGroup[0]
                    })
                    preferencesGroup[1].forEach((preference) => {
                        const normalisedPref = preference[0].toLowerCase()
                        const preferenceParts = normalisedPref.split('_')
                        const found = (normalisedSearch !== '' &&
                            (preferenceParts.find(part => part.startsWith(normalisedSearch)) ||
                                normalisedPref.startsWith(normalisedSearch))
                        )
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
            const schema = this.$store.state.dataTable[this.preferencesId + 'PreferencesSchema']
            if (!schema) {
                return []
            }
            return schema
        },
        preferencesErrorContext () {
            return this.$store.state.dataTable[this.preferencesId + 'PreferencesErrorContext']
        },
        preferencesErrorMessage () {
            return this.$store.state.dataTable[this.preferencesId + 'PreferencesErrorMessage']
        },
        preferencesData () {
            let data
            if (this.preferencesId) {
                data = this.$store.state.dataTable[this.preferencesId + 'PreferencesData']
            }
            if (data) {
                return data
            } else {
                return {}
            }
        },
        preferencesDataLoaded () {
            return typeof this.$store.state.dataTable[this.preferencesId + 'PreferencesData'] === 'object'
        },
        waitIdentifier () {
            return 'aui-preferences-' + this.preferencesId + '*'
        }
    },
    watch: {
        search () {
            this.$refs.virtualScroll.refresh()
        },
        category () {
            this.$refs.virtualScroll.refresh()
        },
        preferencesData (data) {
            this.preferencesInputData = _.clone(data)
        },
        preferencesErrorMessage (error) {
            if (error !== undefined && error !== null) {
                showGlobalErrorMessage(this.preferencesErrorContext + ': ' + error)
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
            'loadPreferencesSchema'
        ]),
        async setPreferenceEvent (field, value, isFile) {
            let isValid = true
            if (this.$v.preferencesInputData[field]) {
                this.$v.preferencesInputData[field].$touch()
                isValid = !this.$v.preferencesInputData[field].$error
            }
            if (isValid) {
                this.$wait.start(this.waitIdentifier + '-' + field)
                if (_.isString(value)) {
                    value = _.trim(value)
                }
                if (value === undefined || value === null || value === '') {
                    await this.removePreference({
                        preferencesId: this.preferencesId,
                        resourceId: this.resourceId,
                        resourceData: this.resourceData,
                        preferenceName: field
                    })
                } else if (isFile) {
                    const fileData = value ? { content_type: 'application/data', data: Base64.encode(value) } : null
                    await this.setPreference({
                        preferencesId: this.preferencesId,
                        resourceId: this.resourceId,
                        resourceData: this.resourceData,
                        preferenceName: field,
                        preferenceValue: fileData
                    })
                } else {
                    await this.setPreference({
                        preferencesId: this.preferencesId,
                        resourceId: this.resourceId,
                        resourceData: this.resourceData,
                        preferenceName: field,
                        preferenceValue: value
                    })
                }
                this.$wait.end(this.waitIdentifier + '-' + field)
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
                this.$v.preferencesInputData[preference]) {
                this.$v.preferencesInputData[preference].$reset()
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
        }
    }
}
</script>
