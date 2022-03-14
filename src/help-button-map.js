
let helpButtonMap = null

export function configHelpButtonMap (config = {
    baseUrl: ''
}) {
    helpButtonMap = new Map([
        ['/administrator', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#admin-admins'],
        ['/administrator/:id/edit', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#_access_rights_of_administrators'],
        ['/reseller', config.baseUrl + '/concepts/concepts.html#_resellers'],
        ['/customer', config.baseUrl + '/basicconfiguration/basicconfiguration.html#_creating_a_customer'],
        ['/contract', config.baseUrl + '/concepts/concepts.html#_contracts'],
        ['/contact', config.baseUrl + '/concepts/concepts.html#_contacts'],
        ['/domain', config.baseUrl + '/basicconfiguration/basicconfiguration.html#_creating_a_sip_domain'],
        ['/subscriber', config.baseUrl + '/basicconfiguration/basicconfiguration.html#creating-subscribers'],
        ['/subscriberprofile', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#_subscriber_profiles'],
        ['/billing', config.baseUrl + '/billing/billing.html#_billing_profiles'],
        ['/billing/create', config.baseUrl + '/billing/billing.html#billing_profiles'],
        ['/billing/:id/edit', config.baseUrl + '/billing/billing.html#billing_profiles'],
        ['/billing/:id/fees', config.baseUrl + '/billing/billing.html#_creating_billing_fees'],
        ['/billing/:id/peaktimes', config.baseUrl + '/billing/billing.html#_creating_off_peak_times'],
        ['/network', config.baseUrl + '/billing/billing.html#billing_customization_networks'],
        ['/package', config.baseUrl + '/billing/billing.html#billing_customization_profpacks'],
        ['/invoicetemplate', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#invoice_templates'],
        ['/invoicetemplate/create', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#invoice_templates'],
        ['/invoicetemplate/:id/editcontent', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#_invoice_template_content'],
        ['/invoice', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#_invoices_and_invoice_templates'],
        ['/voucher', config.baseUrl + '/billing/billing.html#billing_customization_vouchers'],
        ['/peering', config.baseUrl + '/basicconfiguration/basicconfiguration.html#_creating_peering_groups'],
        ['/peering/:id/servers', config.baseUrl + '/basicconfiguration/basicconfiguration.html#_creating_peering_servers'],
        ['/rewrite', config.baseUrl + '/basicconfiguration/basicconfiguration.html#dialplans'],
        ['/rewrite/create', config.baseUrl + '/basicconfiguration/basicconfiguration.html#dialplans'],
        ['/rewrite/:id/rules', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#_rewrite_rules'],
        ['/header', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#header-manipulations'],
        ['/ncos', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#_ncos_network_class_of_service_levels'],
        ['/ncos/:id/pattern', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#ncos_patterns'],
        ['/sound', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#_sound_sets'],
        ['/sound/:id/handles', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#_sound_set_and_contract_sound_set_usage'],
        ['/emailtemplate', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#_email_templates_management'],
        ['/device', config.baseUrl + '/ngcp_additional_modules/ngcp_additional_modules.html#device-management'],
        ['/security', config.baseUrl + '/security-performance/security-performance.html#_securing_your_sipwise_c5_against_sip_attacks'],
        ['/lnp', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#lnp_main'],
        ['/emergencymapping', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#emergency_mapping'],
        ['/emergencymapping/emergency_container_create', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#_emergency_mapping_configuration'],
        ['/phonebook', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#phonebook'],
        ['/phonebook/upload_csv', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#_using_csv_upload_and_download'],
        ['/timeset', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#_time_sets_management'],
        ['/timeset/create', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#_web_interface_for_the_time_sets'],
        ['/timeset/:id/event', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#_web_interface_for_the_time_set_events'],
        ['/callroutingverify', config.baseUrl + '/basicconfiguration/basicconfiguration.html#call_routing_verification'],
        ['/batchprovisioning', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#batch-provisioning'],
        ['/batchprovisioning/create', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#batch-provisioning-via-admin-panel'],
        ['/batchprovisioning/templates/:id/form', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#manual-entry-for-a-single-subscriber'],
        ['/batchprovisioning/templates/:id/upload', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#bulk-entry-for-more-subscribers']
    ])
}

export default function (path) {
    if (helpButtonMap) {
        return helpButtonMap.get(path)
    }
}
