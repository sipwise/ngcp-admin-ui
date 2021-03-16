import { registerGlobalErrorHooks } from 'src/helpers/errorHandling'

export default async ({ Vue, store }) => {
    registerGlobalErrorHooks(Vue)
}
