<template>
    <aui-page-preferences
        preferences-id="customers"
        list-route="/customer"
        resource="customers"
        :resource-singular="$t('Customer')"
        resource-name-field="id"
        resource-data="customerpreferences"
        resource-schema="customerpreferencedefs"
        :resource-relations="resourceRelations"
        :preferences-extension="preferencesExtension"
        :readonly="!$aclCan('update', 'entity.customers')"
    />
</template>
<script>
import AuiPagePreferences from 'pages/AuiPagePreferences'
import minValue from 'vuelidate/lib/validators/minValue'
import integer from 'vuelidate/lib/validators/integer'

export default {
    name: 'AuiPageCustomerPreferences',
    components: {
        AuiPagePreferences
    },
    computed: {
        resourceRelations () {
            return {
                contact_id: {
                    name: 'contact',
                    resource: 'customercontacts'
                }
            }
        },
        preferencesExtension () {
            return {
                allowed_clis: {
                    type: 'array'
                },
                concurrent_max: {
                    validations: {
                        minValue: minValue(1),
                        integer: integer
                    }
                },
                concurrent_max_in: {
                    validations: {
                        minValue: minValue(1),
                        integer: integer
                    }
                },
                concurrent_max_in_total: {
                    validations: {
                        minValue: minValue(1),
                        integer: integer
                    }
                },
                concurrent_max_out: {
                    validations: {
                        minValue: minValue(1),
                        integer: integer
                    }
                },
                concurrent_max_out_total: {
                    validations: {
                        minValue: minValue(1),
                        integer: integer
                    }
                },
                concurrent_max_total: {
                    validations: {
                        minValue: minValue(1),
                        integer: integer
                    }
                },
                max_call_duration: {
                    validations: {
                        minValue: minValue(1),
                        integer: integer
                    }
                },
                adm_block_in_list: {
                    type: 'array'
                },
                adm_block_out_list: {
                    type: 'array'
                },
                adm_ncos: {
                    type: 'select-lazy',
                    getter: 'ncosLevels/filteredNcosLevelOptions',
                    action: 'ncosLevels/filterNcosLevels',
                    actionParams: {
                        resellerId: 'contact.reseller_id'
                    }
                },
                ncos: {
                    type: 'select-lazy',
                    getter: 'ncosLevels/filteredNcosLevelOptions',
                    action: 'ncosLevels/filterNcosLevels',
                    actionParams: {
                        resellerId: 'contact.reseller_id'
                    }
                },
                block_in_list: {
                    type: 'array'
                },
                block_out_list: {
                    type: 'array'
                },
                ext_range_max: {
                    validations: {
                        minValue: minValue(1),
                        integer: integer
                    }
                },
                ext_range_min: {
                    validations: {
                        minValue: minValue(1),
                        integer: integer
                    }
                },
                concurrent_calls_quota: {
                    validations: {
                        minValue: minValue(1),
                        integer: integer
                    }
                },
                conference_max_participants: {
                    validations: {
                        minValue: minValue(1),
                        integer: integer
                    }
                },
                emergency_mapping_container: {
                    type: 'select-lazy',
                    getter: 'emergencyContainers/filteredEmergencyContainerOptions',
                    action: 'emergencyContainers/filterEmergencyContainers'
                }
            }
        }
    }
}
</script>
