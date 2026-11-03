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
                                :label="!isClone ? $t('Name') : $t('New Name')"
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
                                :label="!isClone ? $t('Description') : $t('New Description')"
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
                                v-if="!isClone"
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
            v-if="!isClone"
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
                    :disable="adminManageOnly"
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
                    :disable="adminManageOnly"
                    @click="flipAllFlags"
                />
            </q-item-label>
            <div class="col-12 q-px-md q-pb-md">
                <q-card
                    flat
                    bordered
                    data-cy="profile-admin-manage-only-card"
                >
                    <q-card-section class="row items-center no-wrap">
                        <q-icon
                            name="admin_panel_settings"
                            size="md"
                            :color="adminManageOnly ? 'warning' : 'grey-6'"
                            class="q-mr-md"
                        />
                        <div class="col">
                            <div class="text-subtitle1">
                                {{ $t('Admin manage only') }}
                            </div>
                            <div class="text-caption text-grey-7">
                                {{ $t('Restricts the CSC to PBX management. Personal features are hidden.') }}
                            </div>
                        </div>
                        <q-toggle
                            :model-value="adminManageOnly"
                            color="warning"
                            data-cy="profile-admin-manage-only-flag"
                            :disable="loading"
                            @update:model-value="toggleAdminManageOnly"
                        />
                    </q-card-section>
                </q-card>
            </div>
            <!-- eslint-disable-next-line vue/no-v-for-template-key, vue/max-attributes-per-line -->
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
                        :disable="adminManageOnly"
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
                        :disable="adminManageOnly"
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
                            :class="{ 'text-grey-6': adminManageOnly }"
                            :color="adminManageOnly && isChecked(item.value) ? 'positive' : 'primary'"
                            :disable="loading || adminManageOnly"
                            @update:model-value="toggleChecked(item.value)"
                        >
                            <q-badge
                                v-if="adminManageOnly && isPbxOnly(item.value)"
                                outline
                                color="grey-7"
                                class="q-ml-sm"
                                :label="$t('PBX only')"
                            />
                        </q-toggle>
                    </q-item-section>
                </q-item>
            </template>
        </q-list>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import {
    ADMIN_MANAGE_ONLY,
    PROFILE_FLAGS,
    isAdminManageOnlyPbxOnly,
    setAdminManageOnly
} from 'src/helpers/admin-manage-only'
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
        },
        isClone: {
            type: Boolean,
            default: false
        }

    },
    data () {
        return {
            v$: useValidate(),
            attributesBeforeAdminManageOnly: null
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
        attributesList () {
            return Object.entries(PROFILE_FLAGS)
                .map(([value, { category }]) => ({
                    value,
                    category
                }))
        },
        adminManageOnly () {
            return this.isChecked(ADMIN_MANAGE_ONLY)
        },
        categoryList () {
            return [
                {
                    label: this.$t('Call blocking and Privacy profile flags'),
                    value: 'blockAndPrivacy'
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
        setCurrentData (newFormData) {
            baseFormMixin.methods.setCurrentData.call(this, newFormData)
            this.attributesBeforeAdminManageOnly = null
            if (this.adminManageOnly) {
                this.formData.attributes = setAdminManageOnly(this.formData.attributes, true)
            }
        },
        isChecked (attribute) {
            return !!this.formData?.attributes?.includes(attribute)
        },
        toggleChecked (attribute) {
            this.isChecked(attribute)
                ? this.formData.attributes = this.formData.attributes.filter((item) => item !== attribute)
                : this.formData.attributes.push(attribute)
        },
        toggleAdminManageOnly () {
            if (!this.adminManageOnly) {
                this.attributesBeforeAdminManageOnly = [...this.formData.attributes]
                this.formData.attributes = setAdminManageOnly(this.formData.attributes, true)
            } else {
                // Handles the case where flags are turned on and off again before saving
                this.formData.attributes = this.attributesBeforeAdminManageOnly ?? setAdminManageOnly(this.formData.attributes, false)
                this.attributesBeforeAdminManageOnly = null
            }
        },
        isPbxOnly (attribute) {
            return isAdminManageOnlyPbxOnly(attribute)
        },
        setFlags (flags, enabledFlags) {
            this.formData.attributes = this.formData.attributes
                .filter((attribute) => !flags.includes(attribute))
                .concat(enabledFlags)
        },
        toggleOnOffAllFlags () {
            const flags = this.attributesList.map((attribute) => attribute.value)
            this.setFlags(
                flags,
                flags.every((flag) => this.isChecked(flag)) ? [] : flags
            )
        },
        flipAllFlags () {
            const flags = this.attributesList.map((attribute) => attribute.value)
            this.setFlags(
                flags,
                flags.filter((flag) => !this.isChecked(flag))
            )
        },
        attributesListCategory (category) {
            return this.attributesList.filter((attribute) => attribute.category === category).sort()
        },
        toggleOnOffCategory (category) {
            const attributeListCategory = this.attributesListCategory(category)
            if (attributeListCategory.every((attribute) => this.isChecked(attribute.value))) {
                this.formData.attributes = this.formData.attributes.filter((attribute) => !attributeListCategory.some((attributeObject) => attributeObject.value === attribute))
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
            const flags = this.attributesListCategory(category).map((attribute) => attribute.value)
            this.setFlags(
                flags,
                flags.filter((flag) => !this.isChecked(flag))
            )
        }
    }
}
</script>
