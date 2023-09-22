<template>
    <aui-preferences-context
        preferences-id="peeringserver"
        resource="peeringservers"
        resource-data="peeringserverpreferences"
        resource-schema="peeringserverpreferencedefs"
        :preference-extension="preferenceExtension"
        :preference-group-extension="preferenceGroupExtension"
        :readonly="!$aclCan('update', 'entity.peeringservers')"
        :resource-id="$route.params.serverId"
    />
</template>
<script>
import { minValue, integer } from '@vuelidate/validators'
import AuiPreferencesContext from 'pages/AuiPreferencesContext'

export default {
    name: 'AuiPeeringGroupDetailsServerPreferences',
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
                announce_error_codes_list: {
                    type: 'array'
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
                        customer_id: 'null'
                    }
                },
                header_rule_set: {
                    type: 'select-lazy',
                    storeGeneratorName: 'selectLazy/headerRuleSetList',
                    actionParams: {
                        resellerId: 'reseller_id'
                    }
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
                concurrent_max_out: {
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
