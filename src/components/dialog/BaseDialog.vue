<template>
	<q-dialog
		:value="value"
		square
		@input="$emit('input')"
	>
		<q-card
			style="width: 300px"
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
			</q-card-section>
			<q-card-actions
				align="right"
			>
				<q-btn
					v-close-popup
					flat
					:label="$t('actions.close')"
					:color="titleColor"
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
			default: 'Title'
		},
		text: {
			type: String,
			default: 'Text'
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
		}
	}
}
</script>
