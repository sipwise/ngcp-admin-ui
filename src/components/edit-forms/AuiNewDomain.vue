<template>
    <q-form>
        <div
            class="row"
        >
            <div
                class="col-md-6 col-xs-12"
            >
                <q-list>
                    <q-item>
                        <q-item-section>
                            <aui-select-reseller
                                v-model="data.reseller_id"
                                dense
                                :error="$v.data.reseller_id.$error"
                                :error-message="$errMsg($v.data.reseller_id)"
                                :hide-bottom-space="true"
                                @blur="$v.data.reseller_id.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                ref="domainInput"
                                v-model.trim="data.domain"
                                clearable
                                dense
                                :label="$t('Domain')"
                                :error="$v.data.domain.$error"
                                :error-message="$errMsg($v.data.domain)"
                                :hide-bottom-space="true"
                                @blur="$v.data.domain.$touch()"
                                @keyup.enter="submit"
                            />
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
    or,
    ipAddress
} from 'vuelidate/lib/validators'
import AuiSelectReseller from 'components/AuiSelectReseller'
import { isFQDN } from 'boot/vuelidate'
export default {
    name: 'AuiNewDomain',
    components: {
        AuiSelectReseller
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            data: this.getDynamicData()
        }
    },
    validations: {
        data: {
            reseller_id: {
                required
            },
            domain: {
                required,
                domainOrIP: or(isFQDN, ipAddress)
            }
        }
    },
    methods: {
        reset () {
            this.data = this.getDynamicData()
            this.$v.$reset()
        },
        submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.$emit('input', this.data)
                this.$parent.$emit('form-input', this.data)
            }
        },
        getDynamicData () {
            return {
                reseller_id: null,
                domain: ''
            }
        }
    }
}
</script>
