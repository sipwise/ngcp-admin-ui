<template>
    <aui-preferences-context
        preferences-id="domains"
        resource="domains"
        resource-data="domainpreferences"
        resource-schema="domainpreferencedefs"
        :preference-extension="preferenceExtension"
        :preference-group-extension="preferenceGroupExtension"
        :readonly="!$aclCan('update', 'entity.domains')"
    />
</template>
<script>
import { integer, minValue } from '@vuelidate/validators'
import AuiPreferencesContext from 'pages/AuiPreferencesContext'
import { ip } from 'src/validators/ip'

export default {
    name: 'AuiDomainPreferences',
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
                allowed_ips: {
                    type: 'array',
                    inputValidations: {
                        ip
                    }
                },
                man_allowed_ips: {
                    type: 'array',
                    inputValidations: {
                        ip
                    }
                },
                ua_filter_list: {
                    type: 'array'
                },
                announce_error_codes_list: {
                    type: 'array'
                },
                rerouting_codes: {
                    type: 'array'
                },
                stop_forking_code_lists: {
                    type: 'array',
                    inputValidations: {
                        integer,
                        minValue: minValue(0)
                    }
                },
                adm_cf_ncos: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/ncosLevelList',
                    actionParams: {
                        resellerId: 'reseller_id'
                    }
                },
                adm_ncos: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/ncosLevelList',
                    actionParams: {
                        resellerId: 'reseller_id'
                    }
                },
                ncos: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/ncosLevelList',
                    actionParams: {
                        resellerId: 'reseller_id'
                    }
                },
                adm_cf_ncos_set: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/ncosSetsList',
                    actionParams: {
                        resellerId: 'reseller_id'
                    }
                },
                adm_ncos_set: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/ncosSetsList',
                    actionParams: {
                        resellerId: 'reseller_id'
                    }
                },
                ncos_set: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/ncosSetsList',
                    actionParams: {
                        resellerId: 'reseller_id'
                    }
                },
                rewrite_rule_set: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/rewriteRuleSetList',
                    actionParams: {
                        resellerId: 'reseller_id'
                    }
                },
                sound_set: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/soundSetList',
                    actionParams: {
                        resellerId: 'reseller_id',
                        customer_id: '$null'
                    }
                },
                header_rule_set: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/headerSetList',
                    actionParams: {
                        resellerId: 'reseller_id'
                    }
                },
                emergency_mapping_container: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/emergencyMappingContainerList',
                    actionParams: {
                        resellerId: 'reseller_id'
                    }
                },
                emergency_provider_info: {
                    allowedFileTypes: 'text/xml, application/xml, .xml'
                },
                concurrent_max: {
                    validations: {
                        minValue: minValue(1),
                        integer
                    }
                },
                concurrent_max_in: {
                    validations: {
                        minValue: minValue(1),
                        integer
                    }
                },
                concurrent_max_in_per_account: {
                    validations: {
                        minValue: minValue(1),
                        integer
                    }
                },
                concurrent_max_in_total: {
                    validations: {
                        minValue: minValue(1),
                        integer
                    }
                },
                concurrent_max_out: {
                    validations: {
                        minValue: minValue(1),
                        integer
                    }
                },
                concurrent_max_out_per_account: {
                    validations: {
                        minValue: minValue(1),
                        integer
                    }
                },
                concurrent_max_out_total: {
                    validations: {
                        minValue: minValue(1),
                        integer
                    }
                },
                concurrent_max_per_account: {
                    validations: {
                        minValue: minValue(1),
                        integer
                    }
                },
                concurrent_max_total: {
                    validations: {
                        minValue: minValue(1),
                        integer
                    }
                }
            }
        }
    }
}
</script>
