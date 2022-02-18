
let helpButtonMap = null

export function configHelpButtonMap (config = {
    baseUrl: ''
}) {
    helpButtonMap = new Map([
        ['/administrator', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#admin-admins'],
        ['/administrator/:id/edit', config.baseUrl + '/advancedconfiguration/advancedconfiguration.html#_access_rights_of_administrators']
    ])
}

export default function (path) {
    if (helpButtonMap) {
        return helpButtonMap.get(path)
    }
}
