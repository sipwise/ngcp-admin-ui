
export async function fetchAjaxTable (http, path, columns, options) {
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
		sColumns: ','.repeat(columns.length - 1) + '',
		iDisplayStart: (options.pagination.page - 1) * options.pagination.rowsPerPage,
		iDisplayLength: options.pagination.rowsPerPage
	}
	columns.forEach((column, index) => {
		columnProps['mDataProp_' + index] = column + ''
		columnProps['sSearch_' + index] = ''
		columnProps['sbRegex_' + index] = false
		columnProps['bSearchable_' + index] = true
		columnProps['bSortable_' + index] = true
	})
	columnProps.sSearch = options.filter
	columnProps.bRegex = false
	columnProps.iSortCol_0 = sortColumn
	columnProps.sSortDir_0 = sortDirection
	columnProps.iSortingCols = '1'
	const res = await http.get(path, {
		params: columnProps
	})
	if (res.status === 200) {
		return res.data
	} else {
		return null
	}
}

export async function loadEntity (id) {

}
