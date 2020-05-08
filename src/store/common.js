
export async function fetchAjaxTable (http, path, columns, options) {
	const sortColumn = columns.indexOf(options.pagination.sortBy)
	let sortDirection = 'asc'
	if (options.pagination.descending) {
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
	return http.get(path, {
		params: columnProps
	})
}
