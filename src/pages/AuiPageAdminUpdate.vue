<template>
	<aui-page-form-update
		ref="updatePage"
		icon="fas fa-user-cog"
		resource="admins"
		:resource-id="$route.params.id"
		:resource-cascade="resourceCascade"
		resource-name-field="login"
		:resource-singular="$t('Administrator')"
		:loading="$wait.is('aui-administrator-*') || $wait.is('aui-resource-object')"
		:list-route="listRoute"
		:input-changed="!inputEqual"
		@save="save"
		@reset="reset"
		@resource-loaded="resourceLoaded"
	>
		<aui-new-admin
			ref="form"
			:admin="admin"
			:reseller="reseller"
			:enable-password="false"
			:loading="$wait.is('aui-administrator-*') || $wait.is('aui-resource-object')"
			@saved="$refs.updatePage.load()"
			@input-equal="inputEqualEvent"
		/>
	</aui-page-form-update>
</template>
<script>
import AuiNewAdmin from 'components/edit-forms/AuiNewAdmin'
import AuiPageFormUpdate from 'pages/AuiPageFormUpdate'
export default {
	name: 'AuiPageAdminUpdate',
	components: {
		AuiPageFormUpdate,
		AuiNewAdmin
	},
	data () {
		return {
			admin: null,
			reseller: null,
			inputEqual: true
		}
	},
	computed: {
		listRoute () {
			return '/administrator'
		},
		resourceCascade () {
			return {
				reseller_id: {
					resource: 'resellers'
				}
			}
		}
	},
	methods: {
		save () {
			this.$refs.form.submit()
		},
		reset () {
			this.$refs.form.reset()
		},
		saved () {
			this.$router.push({ path: this.listRoute })
		},
		resourceLoaded (payload) {
			this.admin = payload.resourceObject
			this.reseller = payload.resourceCascadedObjects.reseller_id
		},
		inputEqualEvent (inputEqual) {
			this.inputEqual = inputEqual
		}
	}
}
</script>
