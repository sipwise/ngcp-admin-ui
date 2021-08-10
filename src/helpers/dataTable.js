import { getLocal, setLocal } from 'src/local-storage'

export function storeDataTableOptions ({ routeName, resource, filter, pagination }) {
    setLocal('dataTableOptions-' + routeName + '-' + resource, {
        filter: filter,
        pagination: pagination
    })
}

export function getDataTableOptions ({ routeName, resource }) {
    return getLocal('dataTableOptions-' + routeName + '-' + resource)
}
