export default function () {
	return {
		administratorsState: 'initialized',
		administrators: [],
		administratorsPagination: {
			sortBy: 'id',
			descending: false,
			page: 1,
			rowsPerPage: 8,
			rowsNumber: null
		},
		administratorsFilter: '',
		filteredResellers: [],
		adminUpdateState: null,
		adminUpdateError: null,
		adminState: null,
		adminError: null,
		admin: null,
		relatedReseller: null
	}
}
