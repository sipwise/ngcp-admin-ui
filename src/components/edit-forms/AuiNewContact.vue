<template>
	<q-form>
		<div
			class="row"
		>
			<div
				class="col-md-4 col-xs-12"
			>
				<q-list>
					<q-item
						class="q-pb-none"
					>
						<q-item-section>
							<aui-select-reseller
								v-model="reseller"
								dense
								:error="$v.reseller.$error"
								:error-message="$errMsg($v.reseller)"
								@blur="$v.reseller.$touch()"
							/>
						</q-item-section>
					</q-item>
					<q-item
						class="q-pt-none"
					>
						<q-item-section>
							<q-input
								v-model.trim="firstname"
								clearable
								dense
								:label="$t('First Name')"
							>
								<q-tooltip>
									{{ $t('The given name of the contact.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="lastname"
								clearable
								dense
								:label="$t('Last Name')"
							>
								<q-tooltip>
									{{ $t('The surname of the contact.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="email"
								class="q-pb-xs"
								clearable
								dense
								:label="$t('Email')"
								:error="$v.email.$error"
								:error-message="$errMsg($v.email)"
								@blur="$v.email.$touch()"
							>
								<q-tooltip>
									{{ $t('The email address of the contact.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="company"
								clearable
								dense
								:label="$t('Company')"
							>
								<q-tooltip>
									{{ $t('The company name of the contact.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="street"
								clearable
								dense
								:label="$t('Street')"
							>
								<q-tooltip>
									{{ $t('The street name of the contact.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="postcode"
								clearable
								dense
								:label="$t('Postcode')"
							>
								<q-tooltip>
									{{ $t('The postal code of the contact.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="city"
								clearable
								dense
								:label="$t('City')"
							>
								<q-tooltip>
									{{ $t('The city name of the contact.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<aui-selection-country
								v-model="country"
								dense
								@countrySelected="countrySelected"
							/>
						</q-item-section>
					</q-item>
				</q-list>
			</div>
			<div
				class="col-md-4 col-xs-12"
			>
				<q-list>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="iban"
								clearable
								dense
								:label="$t('IBAN')"
							>
								<q-tooltip>
									{{ $t('The IBAN (International Bank Account Number) of the contact bank details.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="bic"
								class="q-pb-xs"
								clearable
								dense
								:label="$t('BIC/SWIFT')"
								:error="$v.bic.$error"
								:error-message="$t('Input value must be between 8 and 11 characters')"
								@blur="$v.bic.$touch()"
							>
								<q-tooltip>
									{{ $t('The BIC (Business Identifier Code) of the contact bank details.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="bankname"
								clearable
								dense
								:label="$t('Bank Name')"
							>
								<q-tooltip>
									{{ $t('The bank name of the contact bank details.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="vatnum"
								clearable
								dense
								:label="$t('VAT Number')"
							>
								<q-tooltip>
									{{ $t('The VAT number of the contact.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="comregnum"
								clearable
								dense
								:label="$t('Company Reg. Number')"
							>
								<q-tooltip>
									{{ $t('The company registration number of the contact.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="phonenumber"
								clearable
								dense
								:label="$t('Phone Number')"
							>
								<q-tooltip>
									{{ $t('The phone number of the contact.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="mobilenumber"
								clearable
								dense
								:label="$t('Mobile Number')"
							>
								<q-tooltip>
									{{ $t('The mobile number of the contact.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="faxnumber"
								clearable
								dense
								:label="$t('Fax Number')"
							>
								<q-tooltip>
									{{ $t('The fax number of the contact.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<aui-selection-timezone
								v-model="timezone"
								dense
								@timezoneSelected="timezoneSelected"
							/>
						</q-item-section>
					</q-item>
				</q-list>
			</div>
			<div
				class="col-md-4 col-xs-12"
			>
				<q-list>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="gpp0"
								clearable
								dense
								:label="$t('General Purpose 0')"
							>
								<q-tooltip>
									{{ $t('A general purpose field for free use.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="gpp1"
								clearable
								dense
								:label="$t('General Purpose 1')"
							>
								<q-tooltip>
									{{ $t('A general purpose field for free use.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="gpp2"
								clearable
								dense
								:label="$t('General Purpose 2')"
							>
								<q-tooltip>
									{{ $t('A general purpose field for free use.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="gpp3"
								clearable
								dense
								:label="$t('General Purpose 3')"
							>
								<q-tooltip>
									{{ $t('A general purpose field for free use.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="gpp4"
								clearable
								dense
								:label="$t('General Purpose 4')"
							>
								<q-tooltip>
									{{ $t('A general purpose field for free use.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="gpp5"
								clearable
								dense
								:label="$t('General Purpose 5')"
							>
								<q-tooltip>
									{{ $t('A general purpose field for free use.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="gpp6"
								clearable
								dense
								:label="$t('General Purpose 6')"
							>
								<q-tooltip>
									{{ $t('A general purpose field for free use.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="gpp7"
								clearable
								dense
								:label="$t('General Purpose 7')"
							>
								<q-tooltip>
									{{ $t('A general purpose field for free use.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="gpp8"
								clearable
								dense
								:label="$t('General Purpose 8')"
							>
								<q-tooltip>
									{{ $t('A general purpose field for free use.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section>
							<q-input
								v-model.trim="gpp9"
								clearable
								dense
								:label="$t('General Purpose 9')"
							>
								<q-tooltip>
									{{ $t('A general purpose field for free use.') }}
								</q-tooltip>
							</q-input>
						</q-item-section>
					</q-item>
				</q-list>
			</div>
		</div>
	</q-form>
</template>

<script>
import {
	required,
	email
} from 'vuelidate/lib/validators'
import { mapWaitingActions, mapWaitingGetters } from 'vue-wait'
import AuiSelectReseller from 'components/AuiSelectReseller'
import AuiSelectionCountry from 'components/AuiSelectionCountry'
import AuiSelectionTimezone from 'components/AuiSelectionTimezone'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
const BIC_LENGTH = value => value.length === 0 || (value.length >= 8 && value.length <= 11)
export default {
	name: 'AuiNewContact',
	components: {
		AuiSelectReseller,
		AuiSelectionCountry,
		AuiSelectionTimezone
	},
	data () {
		return {
			reseller: null,
			firstname: '',
			lastname: '',
			email: '',
			company: '',
			street: '',
			postcode: '',
			city: '',
			country: null,
			iban: '',
			bic: '',
			bankname: '',
			vatnum: '',
			comregnum: '',
			phonenumber: '',
			mobilenumber: '',
			faxnumber: '',
			timezone: null,
			gpp0: '',
			gpp1: '',
			gpp2: '',
			gpp3: '',
			gpp4: '',
			gpp5: '',
			gpp6: '',
			gpp7: '',
			gpp8: '',
			gpp9: ''
		}
	},
	validations: {
		reseller: {
			required
		},
		email: {
			required,
			email
		},
		bic: {
			BIC_LENGTH
		}
	},
	computed: {
		...mapWaitingGetters({
			processingCreateContact: 'processing createContact'
		})
	},
	watch: {
		processingCreateContact (value) {
			this.$emit('processing', value)
		}
	},
	methods: {
		...mapWaitingActions('contact', {
			createContact: 'processing createContact'
		}),
		countrySelected (value) {
			this.country = value
		},
		timezoneSelected (value) {
			this.timezone = value
		},
		async submit () {
			this.$v.$touch()
			if (!this.$v.$invalid) {
				try {
					const submitData = {
						reseller_id: this.reseller,
						firstname: this.firstname,
						lastname: this.lastname,
						email: this.email,
						company: this.company,
						street: this.street,
						postcode: this.postcode,
						city: this.city,
						country: this.country,
						iban: this.iban,
						bic: this.bic,
						bankname: this.bankname,
						vatnum: this.vatnum,
						comregnum: this.comregnum,
						phonenumber: this.phonenumber,
						mobilenumber: this.mobilenumber,
						faxnumber: this.faxnumber,
						timezone: this.timezone,
						gpp0: this.gpp0,
						gpp1: this.gpp1,
						gpp2: this.gpp2,
						gpp3: this.gpp3,
						gpp4: this.gpp4,
						gpp5: this.gpp5,
						gpp6: this.gpp6,
						gpp7: this.gpp7,
						gpp8: this.gpp8,
						gpp9: this.gpp9
					}

					await this.createContact(submitData)
					this.$emit('saved', submitData)

					showGlobalSuccessMessage(this.$t('New contact created successfully'))
				} catch (err) {
					showGlobalErrorMessage(err)
				}
			}
		}
	}
}
</script>
