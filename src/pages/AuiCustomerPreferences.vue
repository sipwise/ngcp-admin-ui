<template>
    <aui-preferences-context
        preferences-id="customers"
        list-route="/customer"
        resource="customers"
        :resource-singular="$t('Customer')"
        resource-name-field="id"
        resource-data="customerpreferences"
        resource-schema="customerpreferencedefs"
        :preference-extension="preferenceExtension"
        :preference-group-extension="preferenceGroupExtension"
        :readonly="!$aclCan('update', 'entity.customers')"
    />
</template>
<script>
import minValue from 'vuelidate/lib/validators/minValue'
import integer from 'vuelidate/lib/validators/integer'
import AuiPreferencesContext from 'pages/AuiPreferencesContext'

export default {
    name: 'AuiCustomerPreferences',
    components: {
        AuiPreferencesContext
    },
    computed: {
        preferenceGroupExtension () {
            return {
                cloud_pbx: {
                    $c: 'cloudpbx'
                }
            }
        },
        preferenceExtension () {
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
                    storeGeneratorName: 'selectLazy/ncosLevelList',
                    actionParams: {
                        resellerId: 'contact.reseller_id'
                    }
                },
                ncos: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/ncosLevelList',
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
                    storeGeneratorName: 'selectLazy/emergencyMappingContainerList',
                    actionParams: {
                        resellerId: 'contact.reseller_id'
                    }
                }
            }
        }
    }
}
</script>
