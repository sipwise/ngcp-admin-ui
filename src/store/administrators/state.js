export default function () {
	return {
		administratorsState: 'initialized',
		administrators: [],
		administratorsPagination: {
			sortBy: 'id',
			descending: false,
			page: 1,
			rowsPerPage: 10,
			rowsNumber: null
		},
		administratorsFilter: ''
	}
}
