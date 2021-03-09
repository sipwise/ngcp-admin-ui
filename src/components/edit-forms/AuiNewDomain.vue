<template>
    <q-form>
        <q-list
            dense
        >
            <q-item>
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
            <q-item>
                <q-item-section>
                    <q-input
                        ref="domainInput"
                        v-model.trim="domain"
                        clearable
                        dense
                        :label="$t('Domain')"
                        :error="$v.domain.$error"
                        :error-message="$errMsg($v.domain)"
                        @blur="$v.domain.$touch()"
                    />
                </q-item-section>
            </q-item>
        </q-list>
    </q-form>
</template>

<script>
import {
    required,
    or,
    ipAddress
} from 'vuelidate/lib/validators'
import { mapWaitingActions, mapWaitingGetters } from 'vue-wait'
import AuiSelectReseller from 'components/AuiSelectReseller'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import { isFQDN } from 'boot/vuelidate'
export default {
    name: 'AuiNewDomain',
    components: {
        AuiSelectReseller
    },
    data () {
        return {
            reseller: null,
            domain: ''
        }
    },
    validations: {
        reseller: {
            required
        },
        domain: {
            required,
            domainOrIP: or(isFQDN, ipAddress)
        }
    },
    computed: {
        ...mapWaitingGetters({
            processingCreateDomain: 'processing createDomain'
        })
    },
    watch: {
        processingCreateDomain (value) {
            this.$emit('processing', value)
        }
    },
    methods: {
        ...mapWaitingActions('domain', {
            createDomain: 'processing createDomain'
        }),
        async submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                try {
                    const submitData = {
                        reseller_id: this.reseller,
                        domain: this.domain
                    }

                    await this.createDomain(submitData)
                    this.$emit('saved', submitData)

                    showGlobalSuccessMessage(this.$t('New domain created successfully'))
                } catch (err) {
                    showGlobalErrorMessage(err)
                }
            }
        }
    }
}
</script>
