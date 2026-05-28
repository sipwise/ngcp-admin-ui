let helpButtonMap = null

export function configHelpButtonMap (config = {
    baseUrl: ''
}) {
    helpButtonMap = new Map([
        ['/administrator', `${config.baseUrl}/features_main/features_main.html#admin-admins`],
        ['/administrator/create', `${config.baseUrl}/features_main/features_main.html#_access_rights_of_administrators`],
        ['/administrator/:id/edit', `${config.baseUrl}/features_main/features_main.html#_access_rights_of_administrators`],
        ['/reseller', `${config.baseUrl}/concepts/concepts.html#_resellers`],
        ['/reseller/:id/details/admin-logins', `${config.baseUrl}/features_main/features_main.html#admin-admins`],
        ['/reseller/:id/details/billing-networks', `${config.baseUrl}/billing/billing.html#billing_customization_networks`],
        ['/reseller/:id/details/billing-profiles', `${config.baseUrl}/billing/billing.html#_billing_profiles`],
        ['/reseller/:id/details/branding', `${config.baseUrl}/selfcare/selfcare.html#_site_customization`],
        ['/reseller/:id/details/customers', `${config.baseUrl}/basic_config_main/basic_config_main.html#creating-scustomer`],
        ['/reseller/:id/details/domains', `${config.baseUrl}/basic_config_main/basic_config_main.html#creating-domain`],
        ['/reseller/:id/details/invoice-templates', `${config.baseUrl}/features_main/features_main.html#invoice_templates`],
        ['/reseller/:id/details/phone-book', `${config.baseUrl}/features_main/features_main.html#_reseller_phonebook`],
        ['/reseller/:id/details/profile-packages', `${config.baseUrl}/billing/billing.html#billing_customization_profpacks`],
        ['/reseller/:id/details/time-sets', `${config.baseUrl}/features_main/features_main.html#timesets_management`],
        ['/customer', `${config.baseUrl}/basic_config_main/basic_config_main.html#creating-scustomer`],
        ['/customer/:id/details/balance-intervals', `${config.baseUrl}/billing/billing.html#_balance_intervals`],
        ['/customer/:id/details/billing-profile-schedule', `${config.baseUrl}/billing/billing.html#billing_customization_schedule`],
        ['/customer/:id/details/contract-balance', `${config.baseUrl}/billing/billing.html#_contract_balance`],
        ['/customer/:id/details/fraud-limits', `${config.baseUrl}/billing/billing.html#_fraud_detection_and_locking`],
        ['/customer/:id/details/invoices', `${config.baseUrl}/features_main/fseatures_main.html#invoice_management`],
        ['/customer/:id/details/pbx-devices', `${config.baseUrl}/ngcp_additional_modules/ngcp_additional_modules.html#_assigning_subscribers_to_a_device`],
        ['/customer/:id/details/pbx-groups', `${config.baseUrl}/ngcp_additional_modules/ngcp_additional_modules.html#_cloud_pbx_groups_with_busy_members`],
        ['/customer/:id/details/phonebook', `${config.baseUrl}/features_main/features_main.html#_customer_phonebook`],
        ['/customer/:id/details/sound-sets', `${config.baseUrl}/features_main/features_main.html#sound-set`],
        ['/customer/:id/details/sound-sets/:id/handles', `${config.baseUrl}/features_main/features_main.html#sound-set-contract`],
        ['/customer/:id/details/speed-dial', `${config.baseUrl}/features_main/features_main.html#_customers_speed_dials`],
        ['/customer/:id/details/subscribers', `${config.baseUrl}/basic_config_main/basic_config_main.html#creating-subscribers`],
        ['/customer/:id/details/top-up-log', `${config.baseUrl}/billing/billing.html#_top_up_log`],
        ['/contract', `${config.baseUrl}/concepts/concepts.html#_contracts`],
        ['/contact', `${config.baseUrl}/concepts/concepts.html#_contacts`],
        ['/domain', `${config.baseUrl}/basic_config_main/basic_config_main.html#creating-domain`],
        ['/domain/:id/preferences', `${config.baseUrl}/basic_config_main/basic_config_main.html#domain-preferences`],
        ['/subscriber', `${config.baseUrl}/basic_config_main/basic_config_main.html#creating-subscribers`],
        ['/subscriber/:id/preferences', `${config.baseUrl}/basic_config_main/basic_config_main.html#subscriber-preferences`],
        ['/subscriber/:id/details/master-data', `${config.baseUrl}/basic_config_main/basic_config_main.html#creating-subscribers`],
        ['/subscriber/:id/details/call-forwarding', `${config.baseUrl}/features_main/features_main.html#call-forwarding`],
        ['/subscriber/:id/details/call-forwarding/source-set', `${config.baseUrl}/features_main/features_main.html#cf_source_sets`],
        ['/subscriber/:id/details/call-forwarding/time-set', `${config.baseUrl}/features_main/features_main.html#cf_time_sets`],
        ['/subscriber/:id/details/call-forwarding/number-set', `${config.baseUrl}/features_main/features_main.html#cf_bnumber_sets`],
        ['/subscriber/:id/details/call-forwarding/destination-set', `${config.baseUrl}/features_main/features_main.html#cf_destination_sets`],
        ['/subscriber/:id/details/recordings', `${config.baseUrl}/features_main/features_main.html#_call_recording_list`],
        ['/subscriber/:id/details/callthrough-clis', `${config.baseUrl}/features_main/features_main.html#call_through_application`],
        ['/subscriber/:id/details/fax', `${config.baseUrl}/appendix_main/appendix_main.html#_fax_services_configuration_per_subscriber`],
        ['/subscriber/:id/details/header-manipulations', `${config.baseUrl}/features_main/features_main.html#_rules`],
        ['/subscriber/:id/details/header-manipulations/:id/actions', `${config.baseUrl}/features_main/features_main.html#_actions`],
        ['/subscriber/:id/details/header-manipulations/:id/conditions', `${config.baseUrl}/features_main/features_main.html#_conditions`],
        ['/subscriber/:id/details/location-mappings', `${config.baseUrl}/features_main/features_main.html#subscriber-location-mappings`],
        ['/subscriber/:id/details/phonebook', `${config.baseUrl}/features_main/features_main.html#_subscriber_phonebook`],
        ['/subscriber/:id/details/registered-devices', `${config.baseUrl}/basic_config_main/basic_config_main.html#aaa`],
        ['/subscriber/:id/details/speed-dial', `${config.baseUrl}/features_main/features_main.html#_subscribers_speed_dials`],
        ['/subscriber/:id/details/trusted-sources', `${config.baseUrl}/features_main/features_main.html#trusted-subscribers`],
        ['/subscriber/:id/details/voicemail', `${config.baseUrl}/features_main/features_main.html#voicemail`],
        ['/subscriber/:id/details/voicemails', `${config.baseUrl}/features_main/features_main.html#voicemail`],
        ['/subscriberprofile', `${config.baseUrl}/features_main/features_main.html#subscriber_profiles`],
        ['/subscriberprofile/:id/profile', `${config.baseUrl}/features_main/features_main.html#subscriber_profiles`],
        ['/calllistsuppression', `${config.baseUrl}/features_main/features_main.html#call-list-suppressions`],
        ['/calllistsuppression/create', `${config.baseUrl}/features_main/features_main.html#cls-single-entry`],
        ['/calllistsuppression/upload', `${config.baseUrl}/features_main/features_main.html#cls-bulk-entry`],
        ['/billing', `${config.baseUrl}/billing/billing.html#_billing_profiles`],
        ['/billing/create', `${config.baseUrl}/billing/billing.html#billing_profiles`],
        ['/billing/:id/edit', `${config.baseUrl}/billing/billing.html#billing_profiles`],
        ['/billing/:id/fees', `${config.baseUrl}/billing/billing.html#_creating_billing_fees`],
        ['/billing/:id/peaktimes', `${config.baseUrl}/billing/billing.html#_creating_off_peak_times`],
        ['/billing/:id/zones', `${config.baseUrl}/billing/billing.html#_creating_billing_fees`],
        ['/network', `${config.baseUrl}/billing/billing.html#billing_customization_networks`],
        ['/package', `${config.baseUrl}/billing/billing.html#billing_customization_profpacks`],
        ['/invoicetemplate', `${config.baseUrl}/features_main/features_main.html#invoice_templates`],
        ['/invoicetemplate/create', `${config.baseUrl}/features_main/features_main.html#invoice_templates`],
        ['/invoicetemplate/:id/editcontent', `${config.baseUrl}/features_main/features_main.html#_invoice_template_content`],
        ['/invoice', `${config.baseUrl}/features_main/features_main.html#invoice_management`],
        ['/voucher', `${config.baseUrl}/billing/billing.html#billing_customization_vouchers`],
        ['/peering', `${config.baseUrl}/basic_config_main/basic_config_main.html#_creating_peering_groups`],
        ['/peering/:id/details/servers', `${config.baseUrl}/basic_config_main/basic_config_main.html#_creating_peering_servers`],
        ['/peering/:id/details/inboundrules', `${config.baseUrl}/basic_config_main/basic_config_main.html#inbound_peering_rules`],
        ['/peering/:id/details/outboundrules', `${config.baseUrl}/basic_config_main/basic_config_main.html#outbound_peering_rules`],
        ['/rewrite', `${config.baseUrl}/basic_config_main/basic_config_main.html#dialplans`],
        ['/header', `${config.baseUrl}/features_main/features_main.html#header-manipulations`],
        ['/header/:id/rules-wizard', `${config.baseUrl}/features_main/features_main.html#_wizard_configurator`],
        ['/header/:id/rules', `${config.baseUrl}/features_main/features_main.html#_rules`],
        ['/header/:id/rules/:id/actions', `${config.baseUrl}/features_main/features_main.html#_actions`],
        ['/header/:id/rules/:id/conditions', `${config.baseUrl}/features_main/features_main.html#_conditions`],
        ['/ncos', `${config.baseUrl}/features_main/features_main.html#_ncos_network_class_of_service_levels`],
        ['/ncos/:id/details', `${config.baseUrl}/features_main/features_main.html#ncos_patterns`],
        ['/ncossets', `${config.baseUrl}/features_main/features_main.html#_ncos_sets`],
        ['/ncossets/:id/levels', `${config.baseUrl}/features_main/features_main.html#_add_levels_to_ncos_set`],
        ['/sound', `${config.baseUrl}/features_main/features_main.html#sound-set`],
        ['/sound/:id/handles', `${config.baseUrl}/features_main/features_main.html#sound-set-contract`],
        ['/emailtemplate/default', `${config.baseUrl}/features_main/features_main.html#_email_templates_management`],
        ['/emailtemplate/custom', `${config.baseUrl}/features_main/features_main.html#_email_templates_management`],
        ['/devicemanagement/model', `${config.baseUrl}/ngcp_additional_modules/ngcp_additional_modules.html#_setting_up_device_models`],
        ['/devicemanagement/firmware', `${config.baseUrl}/ngcp_additional_modules/ngcp_additional_modules.html#uploading_device_firmwares`],
        ['/devicemanagement/configuration', `${config.baseUrl}/ngcp_additional_modules/ngcp_additional_modules.html#creating_device_config`],
        ['/devicemanagement/profile', `${config.baseUrl}/ngcp_additional_modules/ngcp_additional_modules.html#creating_device_profiles`],
        ['/devicemanagement/device', `${config.baseUrl}/ngcp_additional_modules/ngcp_additional_modules.html#device-management`],
        ['/securitybans', `${config.baseUrl}/security-performance/security-performance.html#_securing_your_sipwise_c5_against_sip_attacks`],
        ['/maliciouscall', `${config.baseUrl}/features_main/features_main.html#mcid`],
        ['/lnp', `${config.baseUrl}/features_main/features_main.html#lnp_main`],
        ['/emergencymapping', `${config.baseUrl}/features_main/features_main.html#emergency_mapping`],
        ['/emergencymapping/emergency_container_create', `${config.baseUrl}/features_main/features_main.html#_emergency_mapping_configuration`],
        ['/emergencymappingcontainer/:id/emergencymappings', `${config.baseUrl}/features_main/features_main.html#_emergency_mapping_configuration`],
        ['/phonebook', `${config.baseUrl}/features_main/features_main.html#phonebook`],
        ['/phonebook/upload_csv', `${config.baseUrl}/features_main/features_main.html#_using_csv_upload_and_download`],
        ['/timeset', `${config.baseUrl}/features_main/features_main.html#timesets_management`],
        ['/timeset/create', `${config.baseUrl}/features_main/features_main.html#_web_configuration_of_the_time_sets`],
        ['/timeset/:id/event', `${config.baseUrl}/features_main/features_main.html#_web_configuration_of_the_time_set_events`],
        ['/callroutingverify', `${config.baseUrl}/basic_config_main/basic_config_main.html#call_routing_verification`],
        ['/batchprovisioning', `${config.baseUrl}/features_main/features_main.html#batch-provisioning`],
        ['/batchprovisioning/create', `${config.baseUrl}/features_main/features_main.html#batch-provisioning-via-admin-panel`],
        ['/batchprovisioning/templates/:id/form', `${config.baseUrl}/features_main/features_main.html#batch-provisioning-manual-entry`],
        ['/batchprovisioning/templates/:id/upload', `${config.baseUrl}/features_main/features_main.html#batch-provisioning-bulk-entry`]
    ])
}

export default function (path) {
    if (!helpButtonMap || !path) {
        return undefined
    }

    // Try exact match
    let result = helpButtonMap.get(path)
    if (result) {
        return result
    }

    // Try parent paths (progressively walk up the path hierarchy)
    let currentPath = path
    while (currentPath.lastIndexOf('/') > 0) {
        currentPath = currentPath.substring(0, currentPath.lastIndexOf('/'))
        result = helpButtonMap.get(currentPath)
        if (result) {
            return result
        }
    }

    return undefined
}
