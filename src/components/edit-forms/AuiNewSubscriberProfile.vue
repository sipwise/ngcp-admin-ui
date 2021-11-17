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
                                class="aui-required"
                                :error="$v.data.reseller_id.$error"
                                :error-message="$errMsg($v.data.reseller_id)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @blur="$v.data.reseller_id.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="data.name"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Name')"
                                :error="$v.data.name.$error"
                                :error-message="$errMsg($v.data.name)"
                                :hide-bottom-space="true"
                                :disable="loading"
                                @blur="$v.data.name.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="data.description"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Description')"
                                :error="$v.data.description.$error"
                                :error-message="$errMsg($v.data.description)"
                                :disable="loading"
                                @blur="$v.data.description.$touch()"
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
    required
} from 'vuelidate/lib/validators'
import AuiSelectReseller from 'components/AuiSelectReseller'
export default {
    name: 'AuiNewSubscriberProfile',
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
            name: {
                required
            },
            description: {
                required
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
                name: null,
                description: null
            }
        }
    }
}
</script>
