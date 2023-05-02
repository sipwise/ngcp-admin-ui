<template>
    <q-list
        dense
    >
        <aui-base-form-field>
            <q-input
                v-model="from_email"
                dense
                :error="false"
                :label="$t('From Email')"
                data-cy="acl-from-email"
                :disable="loading"
                @update:model-value="emitInput"
            >
                <q-tooltip
                    anchor="top middle"
                    self="center middle"
                >
                    {{ $t('Accepted email address to allow mail2fax transmission') }}
                </q-tooltip>
            </q-input>
        </aui-base-form-field>
        <aui-base-form-field>
            <q-input
                v-model="received_from"
                dense
                :error="false"
                :label="$t('Received from IP')"
                data-cy="acl-received-from-ip"
                :disable="loading"
                @update:model-value="emitInput"
            >
                <q-tooltip
                    anchor="top middle"
                    self="center middle"
                >
                    {{ $t('Allow mail2fax emails only to this IP (the IP or hostname is present in the "Received" header)') }}
                </q-tooltip>
            </q-input>
        </aui-base-form-field>
        <aui-base-form-field>
            <q-input
                v-model="destination"
                dense
                :error="false"
                :label="$t('Destination')"
                data-cy="acl-destination"
                :disable="loading"
                @update:model-value="emitInput"
            >
                <q-tooltip
                    anchor="top middle"
                    self="center middle"
                >
                    {{ $t('Allow mail2fax destination only to this number') }}
                </q-tooltip>
            </q-input>
        </aui-base-form-field>
        <aui-base-form-field>
            <q-toggle
                v-model="use_regex"
                :label="$t('Use Regex')"
                data-cy="acl-regex-enable"
                :error="false"
                :disable="loading"
                @update:model-value="emitInput"
            >
                <q-tooltip
                    anchor="top middle"
                    self="center middle"
                >
                    {{ $t('Enable regex matching for "Received from IP" and "Destination" fields') }}
                </q-tooltip>
            </q-toggle>
        </aui-base-form-field>
    </q-list>
</template>
<script>
import AuiBaseFormField from 'components/AuiBaseFormField'
export default {
    name: 'AuiMailToFaxAclInput',
    components: {
        AuiBaseFormField
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        value: {
            type: Object,
            default () {
                return {
                    from_email: '',
                    received_from: '',
                    destination: '',
                    use_regex: false
                }
            }
        }
    },
    emits: ['input'],
    data () {
        return {
            from_email: '',
            received_from: '',
            destination: '',
            use_regex: false
        }
    },
    watch: {
        value: {
            handler (value) {
                this.from_email = value.from_email
                this.received_from = value.received_from
                this.destination = value.destination
                this.use_regex = value.use_regex
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        emitInput () {
            this.$emit('input', {
                from_email: this.from_email,
                received_from: this.received_from,
                destination: this.destination,
                use_regex: this.use_regex
            })
        }
    }
}
</script>
