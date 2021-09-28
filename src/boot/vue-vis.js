import moment from 'moment'
import { Timeline } from 'vue-visjs'

export default async ({ Vue, app }) => {
    Vue.component('timeline', Timeline)

    // Note: Since we are applying our MomentJs lib instance to Timeline components for the correct dates localization,
    //       we should synchronize Moment's locale manually with the application locale
    moment.locale(app.i18n.locale)
    app.i18n.vm.$watch('locale', (newLang) => {
        moment.locale(newLang)
    })
}
