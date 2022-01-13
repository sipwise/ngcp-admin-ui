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
                                :error="$v.formData.name.$error"
                                :error-message="$errMsg($v.formData.name)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @blur="$v.formData.name.$touch()"
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
                                :error="$v.formData.description.$error"
                                :error-message="$errMsg($v.formData.description)"
                                :disable="loading"
                                @blur="$v.formData.description.$touch()"
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
            <q-item
                v-for="(item, index) of attributesList"
                :key="index"
                class="col-lg-3 col-md-4 col-sm-12 col-xs-12"
            >
                <q-item-section>
                    <q-toggle
                        :value="isChecked(item)"
                        dense
                        :label="item"
                        :disable="loading"
                        @input="toggleChecked(item, index)"
                    />
                </q-item-section>
            </q-item>
        </q-list>
    </aui-base-form>
</template>

<script>
import {
    required
} from 'vuelidate/lib/validators'
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
            formData: this.getInitialData
        }
    },
    validations: {
        formData: {
            name: {
                required
            },
            description: {
                required
            }
        }
    },
    computed: {
        // TODO replace hardcoded attributes with endpoint when available
        attributesList () {
            return [
                'block_in_mode',
                'block_in_list',
                'block_in_clir',
                'block_out_mode',
                'block_out_list',
                'cfu',
                'cfb',
                'cfna',
                'cft',
                'clir',
                'ncos',
                'block_out_override_pin',
                'contract_sound_set',
                'music_on_hold',
                'clir_intrapbx',
                'speed_dial',
                'reminder',
                'auto_attendant',
                'voice_mail',
                'fax_server',
                'extended_dialing_mode',
                'enable_t38',
                'cloud_pbx_callqueue',
                'language',
                'conference_pin',
                'max_queue_length',
                'queue_wrap_up_time',
                'conference_max_participants',
                'softphone_autoprov',
                'clir_override',
                'set_moh_sendonly',
                'codecs_filter',
                'codecs_list',
                'cfs',
                'max_call_duration',
                'secretary_numbers',
                'manager_secretary',
                'set_moh_zeroconnection',
                'csta_controller',
                'csta_client',
                'advice_of_charge',
                'clip_no_screening',
                'pai_clir',
                'accept_auto_answer',
                'rerouting_mode',
                'rerouting_codes',
                'cfr',
                'header_rule_set',
                'codecs_id_filter',
                'codecs_id_list',
                'colp_cf',
                'cfo'
            ].sort()
        },
        getInitialData () {
            if (this.initialFormData) {
                return {
                    name: this.initialFormData.name,
                    description: this.initialFormData.description,
                    set_default: this.initialFormData.set_default,
                    profile_set_id: this.profileSetId,
                    attributes: this.initialFormData.attributes
                }
            } else {
                return {
                    name: null,
                    description: null,
                    set_default: false,
                    profile_set_id: this.profileSetId,
                    attributes: []
                }
            }
        }
    },
    methods: {
        isChecked (attribute) {
            return this.formData?.attributes.includes(attribute)
        },
        toggleChecked (attribute) {
            this.formData.attributes.includes(attribute)
                ? this.formData.attributes = this.formData.attributes.filter(item => item !== attribute)
                : this.formData.attributes.push(attribute)
        }
    }
}
</script>
