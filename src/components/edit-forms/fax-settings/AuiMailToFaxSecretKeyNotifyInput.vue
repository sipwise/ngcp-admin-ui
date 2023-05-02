<template>
    <q-list
        dense
    >
        <aui-base-form-field>
            <q-input
                v-model="destination"
                dense
                :error="false"
                :label="$t('Secret Key Renew Notify Email')"
                data-cy="secret-key-notify-email"
                :disable="loading"
                @update:model-value="emitInput"
            >
                <q-tooltip
                    anchor="top middle"
                    self="center middle"
                >
                    {{ $t('Destination email to send the secret key renew notification to') }}
                </q-tooltip>
            </q-input>
        </aui-base-form-field>
    </q-list>
</template>
<script>
import AuiBaseFormField from 'components/AuiBaseFormField'
export default {
    name: 'AuiMailToFaxSecretKeyNotifyInput',
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
                    destination: ''
                }
            }
        }
    },
    emits: ['input'],
    data () {
        return {
            destination: ''
        }
    },
    watch: {
        value: {
            handler (data) {
                this.destination = data.destination
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        emitInput () {
            this.$emit('input', {
                destination: this.destination
            })
        }
    }
}
</script>
