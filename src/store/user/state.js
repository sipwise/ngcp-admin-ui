export default function () {
	return {
		user: null,
		jwt: null,
		loginState: 'loggedOut',
		loginError: null,
		goToOldAdminPanelInfo: true,
		entityCreationState: null,
		entityCreationError: null,
		entityUpdateState: null,
		entityUpdateError: null,
		entityLoadState: null,
		entityLoadError: null,
		entityLoaded: null,
		entityDeletionState: null,
		entityDeletionError: null,
		entityListState: null,
		entityListError: null,
		dialogState: null,
		dialogError: null,
		menuPinned: false,
		menuMinimized: false
	}
}
