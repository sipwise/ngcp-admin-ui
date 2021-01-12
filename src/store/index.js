import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './user'
import AdministratorsModule from './administrators'
import ResellersModule from './resellers'
import ContractsModule from './contracts'
import customers from './customers'
import DataTableModule from './dataTable'
import SecurityBansModule from './securityBans'
import domainModule from './domain'

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
	const Store = new Vuex.Store({
		modules: {
			user: UserModule,
			administrators: AdministratorsModule,
			resellers: ResellersModule,
			contracts: ContractsModule,
			customers,
			dataTable: DataTableModule,
			securityBans: SecurityBansModule,
			domain: domainModule
		},
		// enable strict mode (adds overhead!)
		// for dev mode only
		strict: process.env.DEV
	})
	return Store
}
