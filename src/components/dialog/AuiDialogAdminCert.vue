<template>
	<base-dialog
		v-if="admin !== null && admin !== undefined"
		:value="value"
		title-icon="fas fa-file-contract"
		:title="$t('dialogs.dialogAdminCertTitle', { name: admin.login })"
		v-bind="$attrs"
		v-on="$listeners"
		@input="$emit('input', $event)"
	>
		<q-list
			slot="content"
		>
			<q-item>
				<q-item-section>
					<q-item-label
						header
					>
						{{ $t('dialogs.dialogAdminCertText') }}
					</q-item-label>
				</q-item-section>
			</q-item>
			<entity-list-menu-item
				v-if="!hasCertificate"
				:auto-close="0"
				color="primary"
				icon="add"
				:label="$t('administrators.createCertificate')"
				@click="$emit('cert-created', $event)"
			/>
			<entity-list-menu-item
				v-else
				:auto-close="0"
				color="negative"
				icon="fas fa-minus-circle"
				:label="$t('administrators.revokeCertificate')"
				@click="$emit('cert-revoked', $event)"
			/>
			<entity-list-menu-item
				color="primary"
				:auto-close="0"
				icon="fas fa-download"
				:label="$t('administrators.downloadCACertificate')"
				@click="$emit('ca-cert-downloaded', $event)"
			/>
		</q-list>
	</base-dialog>
</template>

<script>
import BaseDialog from 'components/dialog/BaseDialog'
import EntityListMenuItem from 'components/EntityListMenuItem'
export default {
	name: 'AuiDialogAdminCert',
	components: { EntityListMenuItem, BaseDialog },
	props: {
		value: {
			type: Boolean,
			required: true
		},
		admin: {
			type: Object,
			default: null
		},
		hasCertificate: {
			type: Boolean,
			default: false
		}
	}
}
</script>
