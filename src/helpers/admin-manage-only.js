export const ADMIN_MANAGE_ONLY = 'admin_manage_only'

// Every subscriber profile flag shown in the form, with its form category and the effect of the
// admin_manage_only flag on it:
//   on  -> stored on, menu visible in csc-ui
//   pbx -> stored on, menu visible in csc-ui on PBX pages only (seat, group, customer preferences, PBX configuration)
//   off -> stored off
// The backend does not enforce admin_manage_only: ngcp-csc-ui has the same effects in its copy of this file,
// keep both in sync.
export const PROFILE_FLAGS = {
    block_in_mode: { category: 'blockAndPrivacy', adminManageOnly: 'pbx' },
    block_in_list: { category: 'blockAndPrivacy', adminManageOnly: 'pbx' },
    block_in_clir: { category: 'blockAndPrivacy', adminManageOnly: 'pbx' },
    block_out_mode: { category: 'blockAndPrivacy', adminManageOnly: 'pbx' },
    block_out_list: { category: 'blockAndPrivacy', adminManageOnly: 'pbx' },
    block_out_override_pin: { category: 'blockAndPrivacy', adminManageOnly: 'pbx' },
    ncos: { category: 'blockAndPrivacy', adminManageOnly: 'pbx' },
    ncos_set: { category: 'blockAndPrivacy', adminManageOnly: 'pbx' },
    clir: { category: 'blockAndPrivacy', adminManageOnly: 'pbx' },
    clir_intrapbx: { category: 'blockAndPrivacy', adminManageOnly: 'pbx' },
    cfu: { category: 'forward', adminManageOnly: 'pbx' },
    cfb: { category: 'forward', adminManageOnly: 'pbx' },
    cfna: { category: 'forward', adminManageOnly: 'pbx' },
    cft: { category: 'forward', adminManageOnly: 'pbx' },
    cfs: { category: 'forward', adminManageOnly: 'pbx' },
    cfo: { category: 'forward', adminManageOnly: 'pbx' },
    cfr: { category: 'forward', adminManageOnly: 'pbx' },
    music_on_hold: { category: 'media', adminManageOnly: 'pbx' },
    contract_sound_set: { category: 'media', adminManageOnly: 'on' },
    play_announce_before_cf: { category: 'media', adminManageOnly: 'on' },
    play_announce_before_call_setup: { category: 'media', adminManageOnly: 'on' },
    play_announce_before_recording: { category: 'media', adminManageOnly: 'off' },
    play_announce_to_callee: { category: 'media', adminManageOnly: 'on' },
    speed_dial: { category: 'features', adminManageOnly: 'pbx' },
    reminder: { category: 'features', adminManageOnly: 'off' },
    voice_mail: { category: 'features', adminManageOnly: 'pbx' },
    fax_server: { category: 'features', adminManageOnly: 'pbx' },
    conference_max_participants: { category: 'features', adminManageOnly: 'pbx' },
    conference_pin: { category: 'features', adminManageOnly: 'pbx' },
    record_call: { category: 'features', adminManageOnly: 'off' },
    dnd: { category: 'features', adminManageOnly: 'pbx' },
    secretary_numbers: { category: 'pbxFeatures', adminManageOnly: 'pbx' },
    manager_secretary: { category: 'pbxFeatures', adminManageOnly: 'pbx' },
    max_queue_length: { category: 'pbxFeatures', adminManageOnly: 'pbx' },
    cloud_pbx_callqueue: { category: 'pbxFeatures', adminManageOnly: 'pbx' },
    queue_wrap_up_time: { category: 'pbxFeatures', adminManageOnly: 'pbx' },
    auto_attendant: { category: 'pbxFeatures', adminManageOnly: 'pbx' },
    phonebook: { category: 'pbxFeatures', adminManageOnly: 'pbx' },
    cdr: { category: 'pbxFeatures', adminManageOnly: 'on' },
    csta_controller: { category: 'pbxFeatures', adminManageOnly: 'pbx' },
    csta_client: { category: 'pbxFeatures', adminManageOnly: 'pbx' },
    csc_calls: { category: 'csc', adminManageOnly: 'off' },
    csc_device_provisioning: { category: 'csc', adminManageOnly: 'on' },
    csc_conversations: { category: 'csc', adminManageOnly: 'off' },
    csc_registered_devices: { category: 'csc', adminManageOnly: 'on' },
    csc_hunt_groups: { category: 'csc', adminManageOnly: 'on' },
    csc_app_info: { category: 'csc', adminManageOnly: 'off' },
    language: { category: 'general', adminManageOnly: 'pbx' },
    accept_auto_answer: { category: 'general', adminManageOnly: 'off' }
}

export const ADMIN_MANAGE_ONLY_EFFECT = Object.fromEntries(
    Object.entries(PROFILE_FLAGS)
        .map(([flag, { adminManageOnly }]) => [flag, adminManageOnly])
)

const FORCED_ON_FLAGS = Object.keys(ADMIN_MANAGE_ONLY_EFFECT)
    .filter((flag) => ADMIN_MANAGE_ONLY_EFFECT[flag] !== 'off')
const FORCED_OFF_FLAGS = Object.keys(ADMIN_MANAGE_ONLY_EFFECT)
    .filter((flag) => ADMIN_MANAGE_ONLY_EFFECT[flag] === 'off')

export function setAdminManageOnly (attributes, enabled) {
    const currentAttributes = attributes ?? []
    if (enabled) {
        const kept = currentAttributes.filter((attribute) => !FORCED_OFF_FLAGS.includes(attribute))
        return [...new Set([...kept, ADMIN_MANAGE_ONLY, ...FORCED_ON_FLAGS])]
    }
    return currentAttributes.filter((attribute) => attribute !== ADMIN_MANAGE_ONLY)
}

export function isAdminManageOnlyPbxOnly (flag) {
    return ADMIN_MANAGE_ONLY_EFFECT[flag] === 'pbx'
}
