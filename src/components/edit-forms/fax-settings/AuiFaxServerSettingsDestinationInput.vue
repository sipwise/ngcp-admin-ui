<template>
    <q-list
        dense
    >
        <aui-base-form-field
            required
        >
            <q-input
                v-model="destination"
                dense
                :error="false"
                :label="$t('Destination Email')"
                data-cy="destination-email"
                :disable="loading"
                @input="emitInput"
            />
        </aui-base-form-field>
        <aui-base-form-field>
            <q-select
                v-model="filetype"
                dense
                :error="false"
                :label="$t('File Type')"
                data-cy="destination-filetype"
                :options="fileTypeOptions"
                map-options
                emit-value
                :disable="loading"
                @input="emitInput"
            />
        </aui-base-form-field>
        <aui-base-form-field>
            <q-toggle
                v-model="incoming"
                :error="false"
                :label="$t('Deliver Incoming Faxes')"
                data-cy="destination-deliver-incoming"
                :disable="loading"
                @input="emitInput"
            />
        </aui-base-form-field>
        <aui-base-form-field>
            <q-toggle
                v-model="outgoing"
                :error="false"
                :label="$t('Deliver Outgoing Faxes')"
                data-cy="destination-deliver-outgoing"
                :disable="loading"
                @input="emitInput"
            />
        </aui-base-form-field>
        <aui-base-form-field>
            <q-toggle
                v-model="status"
                :error="false"
                :label="$t('Receive Reports')"
                data-cy="destination-receive-reports"
                :disable="loading"
                @input="emitInput"
            />
        </aui-base-form-field>
    </q-list>
</template>
<script>
import AuiBaseFormField from 'components/AuiBaseFormField'
export default {
    name: 'AuiFaxServerSettingsDestinationInput',
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
                    destination: '',
                    filetype: null,
                    outgoing: false,
                    incoming: false,
                    status: false
                }
            }
        }
    },
    data () {
        return {
            destination: '',
            filetype: null,
            outgoing: false,
            incoming: false,
            status: false
        }
    },
    computed: {
        fileTypeOptions () {
            return [
                {
                    value: 'TIFF',
                    label: this.$t('TIFF')
                },
                {
                    value: 'PS',
                    label: this.$t('PS')
                },
                {
                    value: 'PDF',
                    label: this.$t('PDF')
                },
                {
                    value: 'PDF24',
                    label: this.$t('PDF24')
                }
            ]
        }
    },
    watch: {
        value: {
            handler (data) {
                this.destination = data.destination
                this.filetype = data.filetype
                this.outgoing = data.outgoing
                this.incoming = data.incoming
                this.status = data.status
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        emitInput () {
            this.$emit('input', {
                destination: this.destination,
                filetype: this.filetype,
                outgoing: this.outgoing,
                incoming: this.incoming,
                status: this.status
            })
        }
    }
}
</script>
