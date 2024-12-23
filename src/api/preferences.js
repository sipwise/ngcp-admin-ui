export function normalisePreferences (preferences) {
    const preferencesNormalised = {}
    Object.keys(preferences).forEach((preference) => {
        const pref = preferences[preference]
        if (!preferencesNormalised[pref.preference_group]) {
            preferencesNormalised[pref.preference_group] = []
        }
        preferencesNormalised[pref.preference_group].push([preference, preferences[preference]])
    })
    const preferencesGrouped = []
    Object.keys(preferencesNormalised).forEach((groupName) => {
        preferencesNormalised[groupName].sort((a, b) => {
            if (a[0] < b[0]) {
                return -1
            }
            if (a[0] > b[0]) {
                return 1
            }
            return 0
        })
        preferencesGrouped.push([groupName, preferencesNormalised[groupName]])
    })
    preferencesGrouped.sort((a, b) => {
        if (a[0] < b[0]) {
            return -1
        }
        if (a[0] > b[0]) {
            return 1
        }
        return 0
    })
    return preferencesGrouped
}
