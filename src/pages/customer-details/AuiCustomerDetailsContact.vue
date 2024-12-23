<template>
    <aui-base-sub-context>
        <aui-single-row-table
            v-if="customerContextContact"
            :columns="columns"
            :rows="[{
                id: customerContextContact.id,
                email: customerContextContact.email,
                name: fullName,
                company: customerContextContact.company,
                address: address,
                mobilenumber: customerContextContact.mobilenumber,
                phonenumber: customerContextContact.phonenumber,
                faxnumber: customerContextContact.faxnumber,
            }]"
            :row-action-route-names="[
                'contactEditCustomer'
            ]"
        />
    </aui-base-sub-context>
</template>
<script>
import AuiSingleRowTable from 'components/AuiSingleRowTable'
import _ from 'lodash'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
export default {
    name: 'AuiCustomerDetailsContact',
    components: { AuiSingleRowTable, AuiBaseSubContext },
    mixins: [
        customerContextMixin
    ],
    computed: {
        fullName () {
            const contact = this.customerContextContact
            const firstName = contact?.firstname || ''
            const lastName = contact?.lastname || ''
            return _.trimStart(`${firstName} ${lastName}`, ' ')
        },
        address () {
            const contact = this.customerContextContact
            const street = !_.isEmpty(contact.street) ? `${contact.street}, ` : ''
            const postcode = !_.isEmpty(contact.postcode) ? `${contact.postcode} - ` : ''
            const city = !_.isEmpty(contact.city) ? `${contact.city}, ` : ''
            const country = !_.isEmpty(contact.country) ? `${contact.country}, ` : ''
            return _.trimEnd(street + postcode + city + country, [', ', '- '])
        },
        columns () {
            return [
                {
                    name: 'email',
                    label: this.$t('Email')
                },
                {
                    name: 'name',
                    label: this.$t('Name')
                },
                {
                    name: 'company',
                    label: this.$t('Company')
                },
                {
                    name: 'address',
                    label: this.$t('Address')
                },
                {
                    name: 'mobilenumber',
                    label: this.$t('Mobile Phone')
                },
                {
                    name: 'phonenumber',
                    label: this.$t('Fixed Phone')
                },
                {
                    name: 'faxnumber',
                    label: this.$t('Fax')
                }
            ]
        }
    }
}
</script>
