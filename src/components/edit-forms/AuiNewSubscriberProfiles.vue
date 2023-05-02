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
                <q-list>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.name"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Name')"
                                data-cy="profile-name"
                                :error="v$.formData.name.$errors.length > 0"
                                :error-message="$errMsg(v$.formData.name.$errors)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The name of the Subscriber Profile') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.description"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Description')"
                                data-cy="profile-description"
                                :error="v$.formData.description.$errors.length > 0"
                                :error-message="$errMsg(v$.formData.description.$errors)"
                                :disable="loading"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The description of the Subscriber Profile') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-toggle
                                v-model="formData.set_default"
                                dense
                                :label="$t('Default Profile')"
                                data-cy="profile-set-default-flag"
                                :disable="loading"
                            >
                                <q-tooltip>
                                    {{ $t('Make this profile automatically the default profile for new subscribers having assigned the Profile Set this profile belongs.') }}
                                </q-tooltip>
                            </q-toggle>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
        <q-list
            class="col-12 wrap row"
        >
            <q-item-label
                header
                class="text-uppercase col-12"
            >
                <q-icon
                    name="list"
                    size="sm"
                    class="q-mr-sm"
                />
                {{ $t('Profile flags') }}
                <q-btn
                    class="q-ml-md"
                    icon="fas fa-toggle-on"
                    color="primary"
                    size="sm"
                    :label="$t('Toggle on/off all')"
                    unelevated
                    outline
                    @click="toggleOnOffAllFlags"
                />
                <q-btn
                    class="q-ml-md"
                    icon="exposure"
                    color="primary"
                    size="sm"
                    :label="$t('Flip all')"
                    unelevated
                    outline
                    @click="flipAllFlags"
                />
            </q-item-label>
            <!-- eslint-disable-next-line vue/no-v-for-template-key -->
            <template v-for="(category, indexCategory) of categoryList" :key="indexCategory">
                <q-item-label
                    header
                    class="text-uppercase col-12"
                >
                    <q-icon
                        name="list"
                        size="sm"
                        class="q-mr-sm"
                    />
                    {{ category.label }}
                    <q-btn
                        class="q-ml-md"
                        icon="fas fa-toggle-on"
                        color="primary"
                        size="sm"
                        :label="$t('Toggle on/off')"
                        unelevated
                        outline
                        @click="toggleOnOffCategory(category.value)"
                    />
                    <q-btn
                        class="q-ml-md"
                        icon="exposure"
                        color="primary"
                        size="sm"
                        :label="$t('Flip')"
                        unelevated
                        outline
                        @click="flipCategory(category.value)"
                    />
                </q-item-label>
                <q-item
                    v-for="(item, index) of attributesListCategory(category.value)"
                    :key="indexCategory + '-' + index"
                    class="col-lg-3 col-md-4 col-sm-12 col-xs-12"
                >
                    <q-item-section>
                        <q-toggle
                            :model-value="isChecked(item.value)"
                            dense
                            :label="item.value"
                            :disable="loading"
                            @update:model-value="toggleChecked(item.value, index)"
                        />
                    </q-item-section>
                </q-item>
            </template>
        </q-list>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    required
} from '@vuelidate/validators'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiNewSubscriberProfiles',
    components: {
        AuiBaseForm
    },
    mixins: [baseFormMixin],
    props: {
        initialFormData: {
            type: Object,
            default: null
        },
        profileSetId: {
            type: Number,
            default: null
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            v$: useValidate()
        }
    },
    validations () {
        return {
            formData: {
                name: {
                    required
                },
                description: {
                    required
                }
            }
        }
    },
    computed: {
        // TODO replace hardcoded attributes with endpoint when available
        attributesList () {
            return [
                { value: 'block_in_mode', category: 'block' },
                { value: 'block_in_list', category: 'block' },
                { value: 'block_in_clir', category: 'block' },
                { value: 'block_out_mode', category: 'block' },
                { value: 'block_out_list', category: 'block' },
                { value: 'block_out_override_pin', category: 'block' },
                { value: 'ncos', category: 'block' },
                { value: 'cfu', category: 'forward' },
                { value: 'cfb', category: 'forward' },
                { value: 'cfna', category: 'forward' },
                { value: 'cft', category: 'forward' },
                { value: 'cfs', category: 'forward' },
                { value: 'cfo', category: 'forward' },
                { value: 'cfr', category: 'forward' },
                { value: 'rerouting_mode', category: 'forward' },
                { value: 'rerouting_codes', category: 'forward' },
                { value: 'music_on_hold', category: 'media' },
                { value: 'contract_sound_set', category: 'media' },
                { value: 'play_announce_before_cf', category: 'media' },
                { value: 'play_announce_before_call_setup', category: 'media' },
                { value: 'play_announce_before_recording', category: 'media' },
                { value: 'play_announce_to_callee', category: 'media' },
                { value: 'speed_dial', category: 'features' },
                { value: 'reminder', category: 'features' },
                { value: 'voice_mail', category: 'features' },
                { value: 'fax_server', category: 'features' },
                { value: 'conference_pin', category: 'features' },
                { value: 'conference_max_participants', category: 'features' },
                { value: 'record_call', category: 'features' },
                { value: 'advice_of_charge', category: 'features' },
                { value: 'secretary_numbers', category: 'pbxFeatures' },
                { value: 'manager_secretary', category: 'pbxFeatures' },
                { value: 'max_queue_length', category: 'pbxFeatures' },
                { value: 'cloud_pbx_callqueue', category: 'pbxFeatures' },
                { value: 'queue_wrap_up_time', category: 'pbxFeatures' },
                { value: 'auto_attendant', category: 'pbxFeatures' },
                { value: 'csta_controller', category: 'pbxFeatures' },
                { value: 'csta_client', category: 'pbxFeatures' },
                { value: 'csc_calls', category: 'csc' },
                { value: 'csc_device_provisioning', category: 'csc' },
                { value: 'csc_conversations', category: 'csc' },
                { value: 'csc_registered_devices', category: 'csc' },
                { value: 'csc_hunt_groups', category: 'csc' },
                { value: 'language', category: 'general' },
                { value: 'clir', category: 'general' },
                { value: 'clir_intrapbx', category: 'general' },
                { value: 'clir_override', category: 'general' },
                { value: 'colp_cf', category: 'general' },
                { value: 'contact_ringtimeout', category: 'general' },
                { value: 'accept_auto_answer', category: 'general' },
                { value: 'codecs_filter', category: 'general' },
                { value: 'codecs_list', category: 'general' },
                { value: 'codecs_id_filter', category: 'general' },
                { value: 'codecs_id_list', category: 'general' }
            ].sort()
        },
        categoryList () {
            return [
                {
                    label: this.$t('Call blocking profile flags'),
                    value: 'block'
                },
                {
                    label: this.$t('Call forwarding profile flags'),
                    value: 'forward'
                },
                {
                    label: this.$t('Media profile flags'),
                    value: 'media'
                },
                {
                    label: this.$t('Features profile flags'),
                    value: 'features'
                },
                {
                    label: this.$t('PBX Features profile flags'),
                    value: 'pbxFeatures'
                },
                {
                    label: this.$t('CSC sections profile flags'),
                    value: 'csc'
                },
                {
                    label: this.$t('General profile flags'),
                    value: 'general'
                }
            ]
        },
        getDefaultData () {
            return {
                name: null,
                description: null,
                set_default: false,
                profile_set_id: this.profileSetId,
                attributes: []
            }
        }
    },
    methods: {
        isChecked (attribute) {
            return this.formData?.attributes.includes(attribute)
        },
        toggleChecked (attribute) {
            this.isChecked(attribute)
                ? this.formData.attributes = this.formData.attributes.filter(item => item !== attribute)
                : this.formData.attributes.push(attribute)
        },
        toggleOnOffAllFlags () {
            if (this.attributesList.every(attribute => this.isChecked(attribute.value))) {
                this.formData.attributes = []
            } else {
                this.formData.attributes = Array.from(this.attributesList, attribute => attribute.value)
            }
        },
        flipAllFlags () {
            this.formData.attributes = this.attributesList.reduce((acc, attribute) => {
                if (!this.isChecked(attribute.value)) {
                    acc.push(attribute.value)
                }
                return acc
            }, [])
        },
        attributesListCategory (category) {
            return this.attributesList.filter((attribute) => attribute.category === category).sort()
        },
        toggleOnOffCategory (category) {
            const attributeListCategory = this.attributesListCategory(category)
            if (attributeListCategory.every(attribute => this.isChecked(attribute.value))) {
                this.formData.attributes = this.formData.attributes.filter((attribute) => !attributeListCategory.some(attributeObject => attributeObject.value === attribute))
            } else {
                attributeListCategory.map((attribute) => {
                    if (!this.formData.attributes.includes(attribute.value)) {
                        this.formData.attributes.push(attribute.value)
                    }
                    return attribute
                })
            }
        },
        flipCategory (category) {
            this.formData.attributes = this.attributesList.reduce((acc, attribute) => {
                if (!this.isChecked(attribute.value) && attribute.category === category) {
                    acc.push(attribute.value)
                }
                if (this.isChecked(attribute.value) && attribute.category !== category) {
                    acc.push(attribute.value)
                }
                return acc
            }, [])
        }
    }
}
</script>
