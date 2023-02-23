<template>
    <aui-preferences-context
        preferences-id="subscriber"
        list-route="/subscriber"
        resource="subscribers"
        :resource-singular="$t('Subscribers')"
        resource-name-field="name"
        resource-data="subscriberpreferences"
        resource-schema="subscriberpreferencedefs"
        :preference-extension="preferenceExtension"
        :is-subscriber-preferences="true"
        :preference-group-extension="preferenceGroupExtension"
        :readonly="!$aclCan('update', 'entity.subscribers')"
    />
</template>
<script>
import AuiPreferencesContext from 'pages/AuiPreferencesContext'
import { ip } from 'src/validators/ip'
import integer from 'vuelidate/lib/validators/integer'
import minValue from 'vuelidate/lib/validators/minValue'
export default {
    components: { AuiPreferencesContext },
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
                    storeGeneratorName: 'selectLazy/ncosLevelList',
                    actionParams: {
                        resellerId: 'domain_id_expand.reseller_id'
                    }
                },
                adm_ncos: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/ncosLevelList',
                    actionParams: {
                        resellerId: 'domain_id_expand.reseller_id'
                    }
                },
                ncos: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/ncosLevelList',
                    actionParams: {
                        resellerId: 'domain_id_expand.reseller_id'
                    }
                },
                adm_cf_ncos_set: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/ncosSetsList',
                    actionParams: {
                        resellerId: 'domain_id_expand.reseller_id'
                    }
                },
                adm_ncos_set: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/ncosSetsList',
                    actionParams: {
                        resellerId: 'domain_id_expand.reseller_id'
                    }
                },
                ncos_set: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/ncosSetsList',
                    actionParams: {
                        resellerId: 'domain_id_expand.reseller_id'
                    }
                },
                rewrite_rule_set: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/rewriteRuleSetList',
                    actionParams: {
                        resellerId: 'domain_id_expand.reseller_id'
                    }
                },
                sound_set: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/soundSetList',
                    actionParams: {
                        resellerId: 'domain_id_expand.reseller_id',
                        customer_id: 'null'
                    }
                },
                header_rule_set: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/headerRuleSetList',
                    actionParams: {
                        resellerId: 'domain_id_expand.reseller_id'
                    }
                },
                emergency_mapping_container: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/emergencyMappingContainerList',
                    actionParams: {
                        resellerId: 'domain_id_expand.reseller_id'
                    }
                },
                emergency_provider_info: {
                    allowedFileTypes: 'text/xml, application/xml, .xml'
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
                },
                adm_block_in_list: {
                    type: 'array'
                },
                adm_block_out_list: {
                    type: 'array'
                },
                block_in_list: {
                    type: 'array'
                },
                block_out_list: {
                    type: 'array'
                },
                upn_block_list: {
                    type: 'array'
                },
                allowed_clis: {
                    type: 'array'
                },
                contract_sound_set: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/soundSetList',
                    actionParams: {
                        customer_id: 'customer_id'
                    }
                },
                secretary_numbers: {
                    type: 'array'
                }
            }
        }
    }
}
</script>
