<template>
	<q-dialog
		ref="dialog"
		square
		v-bind="$attrs"
		v-on="$listeners"
	>
		<q-card
			class="q-dialog-plugin"
		>
			<q-card-section
				:class="'q-pa-sm bg-' + titleColor + ' text-white'"
			>
				<q-item
					dense
					class="q-pa-none"
				>
					<q-item-section
						side
					>
						<q-icon
							:name="titleIcon"
							:color="titleTextColor"
							size="sm"
						/>
					</q-item-section>
					<q-item-section
						no-wrap
					>
						<q-item-label
							class="text-subtitle1"
						>
							{{ title }}
						</q-item-label>
					</q-item-section>
				</q-item>
			</q-card-section>
			<q-card-section
				class="q-pa-none"
			>
				<div
					class="q-pa-lg"
				>
					{{ text }}
					<slot
						name="content"
					/>
					<q-inner-loading
						:showing="loading"
					>
						<q-spinner-gears
							size="50px"
							color="primary"
						/>
					</q-inner-loading>
				</div>
			</q-card-section>
			<q-card-actions
				align="right"
			>
				<q-btn
					v-close-popup
					flat
					:label="$t('Close')"
					:color="titleColor"
					:disable="loading"
					icon="clear"
				/>
				<slot
					name="actions"
				/>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script>
export default {
	name: 'BaseDialog',
	props: {
		title: {
			type: String,
			default: ''
		},
		text: {
			type: String,
			default: ''
		},
		titleColor: {
			type: String,
			default: 'primary'
		},
		titleTextColor: {
			type: String,
			default: 'white'
		},
		titleIcon: {
			type: String,
			default: 'info'
		},
		loading: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		show () {
			this.$refs.dialog.show()
		},
		hide () {
			this.$refs.dialog.hide()
		}
	}
}
</script>
