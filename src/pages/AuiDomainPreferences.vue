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
import minValue from 'vuelidate/lib/validators/minValue'
import integer from 'vuelidate/lib/validators/integer'
import AuiPreferencesContext from 'pages/AuiPreferencesContext'
import { ip } from 'src/validators/ip'

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
                allowed_ips: {
                    type: 'array',
                    inputValidations: {
                        ip: ip
                    }
                },
                man_allowed_ips: {
                    type: 'array',
                    inputValidations: {
                        ip: ip
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
                        integer: integer,
                        minValue: minValue(0)
                    }
                },
                adm_cf_ncos: {
                    type: 'select-lazy',
                    getter: 'ncosLevels/filteredNcosLevelOptions',
                    action: 'ncosLevels/filterNcosLevels',
                    actionParams: {
                        resellerId: 'reseller_id'
                    }
                },
                adm_ncos: {
                    type: 'select-lazy',
                    getter: 'ncosLevels/filteredNcosLevelOptions',
                    action: 'ncosLevels/filterNcosLevels',
                    actionParams: {
                        resellerId: 'reseller_id'
                    }
                },
                ncos: {
                    type: 'select-lazy',
                    getter: 'ncosLevels/filteredNcosLevelOptions',
                    action: 'ncosLevels/filterNcosLevels',
                    actionParams: {
                        resellerId: 'reseller_id'
                    }
                },
                rewrite_rule_set: {
                    type: 'select-lazy',
                    getter: 'rewriteRuleSets/filteredRewriteRuleSetOptions',
                    action: 'rewriteRuleSets/filterRewriteRuleSets'
                },
                sound_set: {
                    type: 'select-lazy',
                    getter: 'soundSets/filteredSoundSetOptions',
                    action: 'soundSets/filterSoundSets'
                },
                header_rule_set: {
                    type: 'select-lazy',
                    getter: 'headerRuleSets/filteredHeaderRuleSetOptions',
                    action: 'headerRuleSets/filterHeaderRuleSets'
                },
                emergency_mapping_container: {
                    type: 'select-lazy',
                    getter: 'emergencyContainers/filteredEmergencyContainerOptions',
                    action: 'emergencyContainers/filterEmergencyContainers'
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
                concurrent_max_in_per_account: {
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
                concurrent_max_out_per_account: {
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
                concurrent_max_per_account: {
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
                }
            }
        }
    }
}
</script>
