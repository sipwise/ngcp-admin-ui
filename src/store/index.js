import Vue from 'vue'
import Vuex from 'vuex'
import { generateStore, registerStoreGeneratorType } from 'src/store/storeGenerator'
import { gSelectLazyNames, gSelectLazyGenerator } from 'src/store/sgSelectLazy'
import UserModule from './user'
import AdministratorsModule from './administrators'
import ResellersModule from './resellers'
import ContractsModule from './contracts'
import customers from './customers'
import DataTableModule from './dataTable'
import SecurityBansModule from './securityBans'
import domainModule from './domain'
import billingModule from './billing'
import ncosLevels from './ncosLevels'
import rewriteRuleSets from './rewriteRuleSets'
import soundSets from './soundSets'
import headerRuleSets from './headerRuleSets'
import emergencyContainers from './emergencyContainers'
import contact from './contact'
import country from './country'
import timezone from './timezone'
import { storeExceptionsDecorator } from 'src/helpers/errorHandling'
import page from './page'
import layout from './layout'
import selectLazyModule from './selectLazy'

Vue.use(Vuex)

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
            domain: domainModule,
            ncosLevels,
            rewriteRuleSets,
            soundSets,
            headerRuleSets,
            emergencyContainers,
            billing: billingModule,
            contact: contact,
            country: country,
            timezone: timezone,
            page,
            layout,
            selectLazy: selectLazyModule
        },
        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: process.env.DEV
    }

    registerStoreGeneratorTypes()
    storeConfig = generateStore(storeConfig)
    storeConfig = storeExceptionsDecorator(storeConfig)

    const Store = new Vuex.Store(storeConfig)

    return Store
}

function registerStoreGeneratorTypes () {
    registerStoreGeneratorType('SelectLazy', {
        namesFunction: gSelectLazyNames,
        generatorFunction: gSelectLazyGenerator
    })
}
