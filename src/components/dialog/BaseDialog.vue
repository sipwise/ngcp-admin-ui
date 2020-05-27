<template>
	<q-dialog
		:value="value"
		square
		@input="$emit('input')"
	>
		<q-card
			style="min-width: 300px"
		>
			<q-card-section
				:class="'bg-' + titleColor + ' text-white'"
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
							size="md"
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
			<q-card-section>
				{{ text }}
				<slot
					name="content"
				/>
			</q-card-section>
			<q-card-actions
				align="right"
			>
				<q-btn
					v-close-popup
					flat
					:label="$t('actions.close')"
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
		value: {
			type: Boolean,
			default: false
		},
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
	}
}
</script>
