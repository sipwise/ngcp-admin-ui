import moment from 'moment'

export default async ({ app }) => {
    /* NOTE:
          We are not registering here a component to allow it to be asynchronously loaded. With that we will save 1.1Mb for 'vendor.js'
          A pattern to load Timeline component asynchronously on your page could be found in 'AuiCustomerDetailsBillingProfileSchedule.vue'.
          It looks like:

       components: {
           Timeline: () => import(
               / * webpackChunkName: "visjs-libs" * /
               / * webpackMode: "lazy" * /
               'vue-visjs'
           ).then(result => result.Timeline)
       }

     */

    // Note: Since we are applying our MomentJs lib instance to "vue-visjs.Timeline" components for the correct dates localization,
    //       we should synchronize Moment's locale manually with the application locale
    moment.locale(app.i18n.locale)
    app.i18n.vm.$watch('locale', (newLang) => {
        moment.locale(newLang)
    })
}
