<template>
    <aui-base-sub-context>
        <aui-single-row-table
            v-if="resourceRelatedObjects && resourceRelatedObjects.contact"
            :columns="columns"
            :row="{
                id: resourceRelatedObjects.contact.id,
                email: resourceRelatedObjects.contact.email,
                name: fullName,
                company: resourceRelatedObjects.contact.company,
                address: address,
                mobilenumber: resourceRelatedObjects.contact.mobilenumber,
                phonenumber: resourceRelatedObjects.contact.phonenumber,
                faxnumber: resourceRelatedObjects.contact.faxnumber,
            }"
            :row-action-route-names="[
                'contactEditCustomer'
            ]"
        />
    </aui-base-sub-context>
</template>
<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiSingleRowTable from 'components/AuiSingleRowTable'
export default {
    components: { AuiSingleRowTable, AuiBaseSubContext },
    computed: {
        ...mapState('page', [
            'resourceRelatedObjects'
        ]),
        fullName () {
            const contact = this.resourceRelatedObjects.contact
            const firstName = contact?.firstname || ''
            const lastName = contact?.lastname || ''
            return _.trimStart(firstName + ' ' + lastName, ' ')
        },
        address () {
            const contact = this.resourceRelatedObjects.contact
            const street = !_.isEmpty(contact.street) ? contact.street + ', ' : ''
            const postcode = !_.isEmpty(contact.postcode) ? contact.postcode + ' - ' : ''
            const city = !_.isEmpty(contact.city) ? contact.city + ', ' : ''
            const country = !_.isEmpty(contact.country) ? contact.country + ', ' : ''
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
