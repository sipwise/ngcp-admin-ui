<template>
    <aui-preferences-context
        v-if="preferenceResourceId"
        :key="preferenceResourceId"
        preferences-id="customerLocation"
        resource="customers"
        :resource-id="preferenceResourceId"
        resource-data="customerpreferences"
        resource-schema="customerpreferencedefs"
        :schema-filter="filterPreferencesSchema"
        :preference-extension="preferenceExtension"
        :preference-group-extension="preferenceGroupExtension"
        :readonly="!$aclCan('update', 'entity.customerlocations')"
    />
</template>

<script>
import { integer, minValue, numeric } from '@vuelidate/validators'
import AuiPreferencesContext from 'pages/AuiPreferencesContext'
import customerContextMixin from 'src/mixins/data-context-pages/customer'

const PREFERENCE_GROUPS = {
    'Access Restrictions': [
        'concurrent_max',
        'concurrent_max_out',
        'concurrent_max_total',
        'concurrent_max_out_total',
        'concurrent_max_in_total',
        'concurrent_max_in',
        'calllist_clir_scope'
    ],
    'Number Manipulations': [
        'emergency_prefix',
        'emergency_suffix',
        'emergency_cli',
        'emergency_mapping_container'
    ],
    Internals: [
        'concurrent_calls_quota'
    ],
    'Cloud PBX': [
        'ext_range_min',
        'ext_range_max'
    ]
}

function normalisePreferenceGroupName (groupName) {
    return groupName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
}

export default {
    name: 'AuiCustomerDetailsLocationPreferences',
    components: {
        AuiPreferencesContext
    },
    mixins: [
        customerContextMixin
    ],
    computed: {
        customerLocationContext () {
            return this.$store.state.page.customerDetailsLocationContext
        },
        isLocationContextValid () {
            return Number(this.$route.params.id) === this.customerContext?.id &&
                Number(this.$route.params.locationId) === this.customerLocationContext?.id &&
                this.customerLocationContext?.contract_id === this.customerContext?.id
        },
        preferenceResourceId () {
            if (!this.isLocationContextValid) {
                return null
            }
            return `${this.customerLocationContext.contract_id}?location_id=${this.customerLocationContext.id}`
        },
        preferenceGroupExtension () {
            return {
                cloud_pbx: {
                    $c: this.customerContextIsPbx ? 'cloudpbx' : false
                }
            }
        },
        preferenceExtension () {
            return {
                concurrent_max: {
                    validations: {
                        minValue: minValue(0),
                        integer
                    }
                },
                concurrent_max_in: {
                    validations: {
                        minValue: minValue(0),
                        integer
                    }
                },
                concurrent_max_in_total: {
                    validations: {
                        minValue: minValue(0),
                        integer
                    }
                },
                concurrent_max_out: {
                    validations: {
                        minValue: minValue(0),
                        integer
                    }
                },
                concurrent_max_out_total: {
                    validations: {
                        minValue: minValue(0),
                        integer
                    }
                },
                concurrent_max_total: {
                    validations: {
                        minValue: minValue(0),
                        integer
                    }
                },
                calllist_clir_scope: {
                    validations: {
                        minValue: minValue(0),
                        integer
                    }
                },
                emergency_prefix: {
                    validations: {
                        numeric
                    }
                },
                emergency_suffix: {
                    validations: {
                        numeric
                    }
                },
                emergency_cli: {
                    validations: {
                        numeric
                    }
                },
                emergency_mapping_container: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/emergencyMappingContainerList',
                    actionParams: {
                        resellerId: 'contact.reseller_id'
                    }
                },
                concurrent_calls_quota: {
                    validations: {
                        minValue: minValue(1),
                        integer
                    }
                },
                ext_range_max: {
                    validations: {
                        minValue: minValue(1),
                        integer
                    }
                },
                ext_range_min: {
                    validations: {
                        minValue: minValue(0),
                        integer
                    }
                }
            }
        }
    },
    methods: {
        filterPreferencesSchema (preferencesSchema) {
            return Object.entries(PREFERENCE_GROUPS).reduce((filteredSchema, [groupName, preferenceNames]) => {
                const schemaGroup = preferencesSchema.find((group) => group[0] === groupName ||
                    normalisePreferenceGroupName(group[0]) === normalisePreferenceGroupName(groupName))

                if (!schemaGroup) {
                    return filteredSchema
                }

                const preferences = preferenceNames
                    .map((preferenceName) => schemaGroup[1].find(([schemaPreferenceName]) => schemaPreferenceName === preferenceName))
                    .filter(Boolean)

                if (preferences.length > 0) {
                    filteredSchema.push([schemaGroup[0], preferences])
                }

                return filteredSchema
            }, [])
        }
    }
}
</script>
