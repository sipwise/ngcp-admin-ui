import { createStore } from 'vuex'
import { generateStore, registerStoreGeneratorType } from 'src/store/storeGenerator'
import { gSelectLazyNames, gSelectLazyGenerator } from 'src/store/sgSelectLazy'
import UserModule from './user'
import AdministratorsModule from './administrators'
import ResellersModule from './resellers'
import ContractsModule from './contracts'
import customers from './customers'
import DataTableModule from './dataTable'
import SecurityBansModule from './securityBans'
import dashboardModule from './dashboard'
import domainModule from './domain'
import billingModule from './billing'
import ncosLevels from './ncosLevels'
import rewriteRuleSets from './rewriteRuleSets'
import soundSets from './soundSets'
import headerRuleSets from './headerRuleSets'
import emergencyContainers from './emergencyContainers'
import emergencyMappings from './emergencyMappings'
import contact from './contact'
import country from './country'
import timeSets from './timeSets'
import timezone from './timezone'
import subscriberProfiles from './subscriberProfiles'
import subscribers from './subscribers'
import { storeExceptionsDecorator } from 'src/helpers/errorHandling'
import page from './page'
import layout from './layout'
import selectLazyModule from './selectLazy'
import creationSession from './creationSession'
import phonebookEntries from './phonebookEntries'
import callListSuppressions from './callListSuppressions'
import lnp from './lnp'
import ncosSets from './ncosSets'
import peering from './peering'

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
            ncosLevels,
            rewriteRuleSets,
            soundSets,
            headerRuleSets,
            emergencyContainers,
            emergencyMappings,
            subscriberProfiles,
            subscribers,
            billing: billingModule,
            contact: contact,
            country: country,
            timeSets,
            timezone: timezone,
            page,
            layout,
            selectLazy: selectLazyModule,
            creationSession,
            phonebookEntries,
            callListSuppressions,
            lnp,
            ncosSets,
            peering
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
