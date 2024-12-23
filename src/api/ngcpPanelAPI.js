import axios from 'axios'
import contentDisposition from 'content-disposition'
import saveAs from 'file-saver'
import _ from 'lodash'
import Qs from 'qs'
import {
    API_REQUEST_DEFAULT_TIMEOUT,
    authTokenInterceptor,
    getInterceptorRejectionFunction,
    handleRequestError
} from 'src/api/common'

// NOTE: we are not exporting this Axios instance to force using only "ajax*" specialized functions
const httpPanel = axios.create({
    timeout: API_REQUEST_DEFAULT_TIMEOUT
})

export function initPanelAPI ({ baseURL, logoutFunc, getLogoutMessage }) {
    httpPanel.defaults.baseURL = baseURL

    const interceptorRejection = getInterceptorRejectionFunction(logoutFunc, getLogoutMessage)

    httpPanel.interceptors.request.use(authTokenInterceptor, interceptorRejection)
    httpPanel.interceptors.request.use(function normalisePanelRequestBody (config) {
        if (config.method === 'POST') {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            config.data = Qs.stringify(config.data)
        }
        return config
    }, interceptorRejection)
}

export async function ajaxGet (path, data) {
    return httpPanel.get(path, data).catch(handleRequestError)
}

export async function ajaxPost (path, data, config) {
    return httpPanel.post(path, data, config).catch(handleRequestError)
}

export async function ajaxFetchTable (path, columns, options) {
    let sortColumn = columns.indexOf(options.pagination.sortBy)
    let isDescending = options.pagination.descending
    if (sortColumn < 0) {
        sortColumn = 0
        isDescending = false
    }
    let sortDirection = 'asc'
    if (isDescending) {
        sortDirection = 'desc'
    }
    const columnProps = {
        sEcho: 1,
        iColumns: columns.length,
        sColumns: `${','.repeat(columns.length - 1)}`,
        iDisplayStart: (options.pagination.page - 1) * options.pagination.rowsPerPage,
        iDisplayLength: options.pagination.rowsPerPage
    }
    columns.forEach((column, index) => {
        columnProps[`mDataProp_${index}`] = `${column}`
        columnProps[`sSearch_${index}`] = ''
        columnProps[`sbRegex_${index}`] = false
        columnProps[`bSearchable_${index}`] = true
        columnProps[`bSortable_${index}`] = true
    })
    columnProps.sSearch = options.filter
    columnProps.bRegex = false
    columnProps.iSortCol_0 = sortColumn
    columnProps.sSortDir_0 = sortDirection
    columnProps.iSortingCols = '1'
    const res = await ajaxGet(path, {
        params: columnProps
    })
    if (res.status === 200) {
        return res.data
    }
    return null
}

export async function ajaxGetPaginatedList (resource, columns, options) {
    const res = await ajaxFetchTable(`/${resource}`, columns, options)
    const totalItems = _.get(res, 'iTotalDisplayRecords', 0)
    const itemsPerPage = _.get(options, 'pagination.rowsPerPage', 10)
    let lastPage = Math.ceil(totalItems / itemsPerPage)
    if (lastPage < 1) {
        lastPage = 1
    }
    return {
        items: _.get(res, 'aaData', []),
        lastPage,
        totalItems
    }
}

export async function ajaxDownloadCsv ({ url, defaultFileName }) {
    const res = await ajaxGet(url)
    const contentDispositionParsed = contentDisposition.parse(res.headers['content-disposition'])
    const fileName = contentDispositionParsed?.parameters?.filename || defaultFileName
    saveAs(new Blob([res.data], { type: res.headers['content-type'] || 'text/csv' || 'application/pdf' }), fileName)
}
