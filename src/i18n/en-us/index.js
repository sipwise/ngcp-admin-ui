
export default {
	login: {
		title: 'Admin Sign In',
		description: 'Sign in using your Admin credentials:',
		usernameLabel: 'Username',
		passwordLabel: 'Password',
		signInActionLabel: 'Sign In',
		wrongCredentials: 'Wrong credentials',
		logout: 'Logout'
	},
	mainMenu: {
		dashboard: 'Dashboard',
		settings: 'Settings',
		settingsAdministrators: 'Administrators',
		settingsResellers: 'Resellers',
		settingsCustomers: 'Customers',
		settingsContracts: 'Contracts',
		settingsContacts: 'Contacts',
		settingsDomains: 'Domains',
		settingsSubscribers: 'Subscribers',
		settingsSubscriberProfiles: 'Subscriber Profiles',
		settingsCallListSuppressions: 'Call List Suppressions',
		settingsBilling: 'Billing Profiles',
		settingsBillingNetworks: 'Billing Networks',
		settingsProfilePackages: 'Profile Packages',
		settingsInvoiceTemplates: 'Invoice Templates',
		settingsInvoices: 'Invoices',
		settingsBillingVouchers: 'Billing Vouchers',
		settingsSIPPeeringGroups: 'SIP Peering Groups',
		settingsRewriteRuleSets: 'Rewrite Rule Sets',
		settingsHeaderManipulations: 'Header Manipulations',
		settingsNCOSLevels: 'NCOS Levels',
		settingsSoundSets: 'Sound Sets',
		settingsEmailTemplates: 'Email Templates',
		settingsSecurityBans: 'Security Bans',
		settingsNumberPorting: 'Number Porting',
		settingsEmergencyMappings: 'Emergency Mappings',
		settingsPhonebook: 'Phonebook',
		settingsTimeSet: 'Time Set',
		tools: 'Tools',
		toolsCallRoutingVerification: 'Call Routing Verification',
		toolsPeeringOverview: 'Peering Overview',
		toolsBatchProvisioning: 'Batch Provisioning',
		monitoring: 'Monitoring & Statistics',
		monitoringSystemStatistics: 'System Statistics',
		monitoringSIPStatistics: 'SIP Statistics',
		monitoringDatabaseStatistics: 'Database Statistics',
		monitoringClusterOverview: 'Cluster Overview',
		monitoringSIPCallFlows: 'SIP Call Flows',
		monitoringStatisticsAdministration: 'Statistics Administration',
		documentation: 'Documentation',
		documentationAPI: 'API',
		documentationHandbook: 'Handbook'
	},
	dashboard: {
		systemStatus: 'System Status',
		status: 'Status'
	},
	goToOldAdminPanel: 'Go to old admin panel',
	goToOldAdminPanelInfo: 'You can switch to the old admin panel at every time',
	closeActionLabel: 'Close',
	validators: {
		required: 'Field is required',
		alphaNum: 'Field has to be alpha numeric',
		passwordStrength: 'Password is not strong enough',
		sameAsPassword: 'Passwords must be equal',
		email: 'Input is not a valid email address'
	},
	actions: {
		search: 'Search',
		delete: 'Delete',
		edit: 'Edit',
		cancel: 'Cancel',
		save: 'Save',
		close: 'Close',
		ok: 'OK',
		changePassword: 'Change password'
	},
	dialogs: {
		deleteConfirmationTitle: 'Delete {entity}',
		deleteConfirmationText: 'You are about to delete {entity} {name}',
		actionNotAllowedTitle: 'Action not allowed',
		actionNotAllowedText: 'The action you are trying to perform is not allowed'
	},
	notify: {
		passwordChangedSuccessfully: 'Password changed successfully',
		administratorUpdatedSuccessfully: 'Administrator updated successfully'
	},
	genericAddButtonLabel: 'Add {entity}',

	administrators: {
		singular: 'administrator',
		plural: 'administrators',

		// Table columns
		tcId: 'Id',
		tcReseller: 'Reseller',
		tcLogin: 'Login',
		tcEmail: 'Email',
		tcMaster: 'Master',
		tcCustomerCare: 'Customer Care',
		tcActive: 'Active',
		tcReadOnly: 'Read Only',
		tcShowPasswords: 'Show Passwords',
		tcShowCDRs: 'Show CDRs',
		tcShowBillingInfo: 'Show Billing Info',
		tcLawfulIntercept: 'Lawful Intercept',
		tcSystem: 'System',

		moreMenuCertificateTitle: 'API Certificate actions',
		createCertificate: 'Create Certificate',
		revokeCertificate: 'Revoke Certificate',
		downloadCACertificate: 'Download CA Certificate',

		revokeCertificateDialogTitle: 'Revoke api certificate',
		revokeCertificateDialogText: 'You are about to revoke the api certificate for administrator {admin}'
	},

	resellers: {
		singular: 'reseller',
		plural: 'resellers'
	}
}
