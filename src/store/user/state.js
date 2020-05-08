export default function () {
	return {
		userId: null,
		jwt: null,
		loginState: 'loggedOut',
		loginError: null,
		goToOldAdminPanelInfo: true,
		entityCreationState: null,
		entityCreationError: null,
		entityDeletionState: null,
		entityDeletionError: null,
		entityListState: null,
		entityListError: null
	}
}
