import { storeExceptionsDecorator } from 'src/helpers/errorHandling'
import AdministratorsModule from 'src/store/administrators'
import billingModule from 'src/store/billing'
import callListSuppressions from 'src/store/callListSuppressions'
import contact from 'src/store/contact'
import ContractsModule from 'src/store/contracts'
import country from 'src/store/country'
import creationSession from 'src/store/creationSession'
import customers from 'src/store/customers'
import dashboardModule from 'src/store/dashboard'
import DataTableModule from 'src/store/dataTable'
import deviceManagement from 'src/store/deviceManagement'
import domainModule from 'src/store/domain'
import emailTemplates from 'src/store/emailTemplates'
import emergencyContainers from 'src/store/emergencyContainers'
import emergencyMappings from 'src/store/emergencyMappings'
import headerRuleSets from 'src/store/headerRuleSets'
import invoices from 'src/store/invoices'
import layout from 'src/store/layout'
import lnp from 'src/store/lnp'
import ncosLevels from 'src/store/ncosLevels'
import ncosSets from 'src/store/ncosSets'
import page from 'src/store/page'
import peering from 'src/store/peering'
import phonebookEntries from 'src/store/phonebookEntries'
import ResellersModule from 'src/store/resellers'
import rewriteRuleSets from 'src/store/rewriteRuleSets'
import SecurityBansModule from 'src/store/securityBans'
import selectLazyModule from 'src/store/selectLazy'
import { gSelectLazyGenerator, gSelectLazyNames } from 'src/store/sgSelectLazy'
import soundSets from 'src/store/soundSets'
import { generateStore, registerStoreGeneratorType } from 'src/store/storeGenerator'
import subscriberProfiles from 'src/store/subscriberProfiles'
import subscribers from 'src/store/subscribers'
import timeSets from 'src/store/timeSets'
import timezone from 'src/store/timezone'
import UserModule from 'src/store/user'
import { createStore } from 'vuex'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
    let storeConfig = {
        modules: {
            user: UserModule,
            administrators: AdministratorsModule,
            resellers: ResellersModule,
            contracts: ContractsModule,
            customers,
            dataTable: DataTableModule,
            securityBans: SecurityBansModule,
            dashboard: dashboardModule,
            domain: domainModule,
            emailTemplates,
            ncosLevels,
            rewriteRuleSets,
            soundSets,
            headerRuleSets,
            emergencyContainers,
            emergencyMappings,
            subscriberProfiles,
            subscribers,
            billing: billingModule,
            contact,
            country,
            timeSets,
            timezone,
            page,
            layout,
            selectLazy: selectLazyModule,
            creationSession,
            phonebookEntries,
            callListSuppressions,
            lnp,
            ncosSets,
            peering,
            invoices,
            deviceManagement
        },
        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: process.env.DEV
    }

    registerStoreGeneratorTypes()
    storeConfig = generateStore(storeConfig)
    storeConfig = storeExceptionsDecorator(storeConfig)

    const Store = createStore(storeConfig)

    return Store
}

function registerStoreGeneratorTypes () {
    registerStoreGeneratorType('SelectLazy', {
        namesFunction: gSelectLazyNames,
        generatorFunction: gSelectLazyGenerator
    })
}
