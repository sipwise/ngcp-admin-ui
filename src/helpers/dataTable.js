import _ from 'lodash'
import {
    getLocal,
    setLocal
} from 'src/local-storage'

export const DATA_TABLE_PREFIX = 'dataTableOptions_'

export function setDataTableOptions ({ tableId, filter, filterCriteria, page, rowsPerPage, sortBy, descending }) {
    setDataTableOption({ tableId, option: 'filter', value: filter })
    setDataTableOption({ tableId, option: 'filterCriteria', value: filterCriteria })
    setDataTableOption({ tableId, option: 'page', value: page })
    setDataTableOption({ tableId, option: 'rowsPerPage', value: rowsPerPage })
    setDataTableOption({ tableId, option: 'sortBy', value: sortBy })
    setDataTableOption({ tableId, option: 'descending', value: descending })
}

export function getDataTableOption ({ tableId, option, defaultValue }) {
    const dataTableOptions = getDataTableOptions({ tableId })
    return _.get(dataTableOptions, option, defaultValue)
}

export function setDataTableOption ({ tableId, option, value }) {
    if (value !== undefined) {
        const dataTableOptions = getDataTableOptions({ tableId })
        _.set(dataTableOptions, option, value)
        setLocal(DATA_TABLE_PREFIX + tableId, dataTableOptions)
    }
}

export function getDataTableOptions ({ tableId }) {
    return getLocal(DATA_TABLE_PREFIX + tableId) || {}
}

export function getDataTableFilter ({ tableId, defaultValue = '' }) {
    return getDataTableOption({ tableId, option: 'filter', defaultValue })
}

export function setDataTableFilter ({ tableId, filter }) {
    setDataTableOption({ tableId, option: 'filter', value: filter })
}

export function getDataTableFilterCriteria ({ tableId, defaultValue }) {
    return getDataTableOption({ tableId, option: 'filterCriteria', defaultValue })
}

export function setDataTableFilterCriteria ({ tableId, filterCriteria }) {
    setDataTableOption({ tableId, option: 'filterCriteria', value: filterCriteria })
}

export function getDataTablePage ({ tableId, defaultValue = 1 }) {
    return getDataTableOption({ tableId, option: 'page', defaultValue })
}

export function setDataTablePage ({ tableId, page }) {
    setDataTableOption({ tableId, option: 'page', value: page })
}

export function getDataTableRowsPerPage ({ tableId, defaultValue = 10 }) {
    return getDataTableOption({ tableId, option: 'rowsPerPage', defaultValue })
}

export function setDataTableRowsPerPage ({ tableId, rowsPerPage }) {
    setDataTableOption({ tableId, option: 'rowsPerPage', value: rowsPerPage })
}

export function getDataTableSortBy ({ tableId, defaultValue = '' }) {
    return getDataTableOption({ tableId, option: 'sortBy', defaultValue })
}

export function setDataTableSortBy ({ tableId, sortBy }) {
    setDataTableOption({ tableId, option: 'sortBy', value: sortBy })
}

export function getDataTableDescending ({ tableId, defaultValue = false }) {
    return getDataTableOption({ tableId, option: 'descending', defaultValue })
}

export function setDataTableDescending ({ tableId, descending }) {
    setDataTableOption({ tableId, option: 'descending', value: descending })
}
