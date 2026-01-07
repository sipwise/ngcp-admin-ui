<template>
    <div class="display">
        <img
            :src="image"
        >
        <div
            v-for="(key, index) in keys"
            :key="index"
        >
            <div
                :class="['button', {'button-active': isKeyActive(key)}]"
                :style="{ left: `${key.x}px`, top: `${key.y}px` }"
                @click="toggleForm(index)"
            >
                {{ index + 1 }}
            </div>
        </div>
        <div
            v-if="activeKey"
            class="form"
        >
            <aui-select-groups
                v-if="!activeKey.is_custom_number_enabled"
                v-model="activeKey.subscriber_id"
                dense
                :label="$t('Subscriber')"
                data-cy="pbx-device-subscriber"
                :customer-id="customerContext.id"
                :initial-options="Object.values(subscriberOptionsById)"
                @change="updateConfig"
            />
            <q-select
                v-model="activeKey.type"
                :options="getTypes(activeKey.types)"
                dense
                emit-value
                map-options
                data-cy="pbx-device-linemode"
                @update:model-value="handleTypeChange"
            />
            <q-toggle
                v-if="shouldDisplayCustomNumberToggle"
                v-model="activeKey.is_custom_number_enabled"
                :label="$t('Use custom number')"
            />
            <q-input
                v-if="shouldDisplayCustomNumberFields"
                ref="customTargetNumber"
                v-model="activeKey.target_number"
                :disable="shouldDisableCustomNumberFields"
                clearable
                dense
                :rules="[isValidNumber]"
                :label="$t('Number')"
            />
            <q-input
                v-if="shouldDisplayCustomNumberFields"
                ref="customTargetNumberLabel"
                v-model="activeKey.label"
                :disable="shouldDisableCustomNumberFields"
                clearable
                dense
                :rules="[isValidLabel]"
                :label="$t('Label')"
            />
            <q-btn
                v-close-popup
                :label="$t('Close')"
                color="primary"
                flat
                data-cy="pbx-device-close"
                @click="closeForm"
            />
        </div>
        <div
            v-if="activeKey"
            class="overlay"
            @click="closeForm"
        />
    </div>
</template>
<script>
import AuiSelectGroups from 'components/AuiSelectGroups'
import { apiFetchEntity } from 'src/api/ngcpAPI'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
export default {
    name: 'AuiPbxDeviceConfig',
    components: {
        AuiSelectGroups
    },
    mixins: [customerContextMixin],
    props: {
        image: {
            type: String,
            default: null
        },
        linerange: {
            type: Array,
            default: () => []
        },
        initialLines: {
            type: Array,
            default: () => []
        }
    },
    emits: ['update-config'],
    data () {
        return {
            keys: [],
            activeKey: null,
            subscriberOptionsById: {}
        }
    },
    computed: {
        keyActionTypeLabels () {
            return {
                blf: this.$t('pbxKeyBlf'),
                forward: this.$t('pbxKeyForward'),
                private: this.$t('pbxKeyPrivate'),
                shared: this.$t('pbxKeyShared'),
                speeddial: this.$t('pbxKeySpeedDial'),
                transfer: this.$t('pbxKeyTransfer')
            }
        },
        pbxSubscriberPilot () {
            return this.customerContextSubscribers?.items?.find((subscriber) => subscriber.is_pbx_pilot) || null
        },
        shouldDisplayCustomNumberToggle () {
            return this.activeKey?.type === 'speeddial'
        },
        shouldDisplayCustomNumberFields () {
            return this.activeKey?.is_custom_number_enabled && this.activeKey?.type === 'speeddial'
        },
        shouldDisableCustomNumberFields () {
            return !this.activeKey?.is_custom_number_enabled || this.activeKey?.type !== 'speeddial'
        }
    },
    watch: {
        // Watch for changes in the 'linerange' prop
        linerange: {
            async handler (newVal) {
                // Flatten all key ranges into a single array of key objects
                this.keys = newVal.flatMap((range) => {
                    // Build a map of supported key types for this range
                    const types = {
                        blf: range.can_blf,
                        speeddial: range.can_speeddial,
                        forward: range.can_forward,
                        shared: range.can_shared,
                        private: range.can_private,
                        transfer: range.can_transfer
                    }
                    // Choose the first available type as the default
                    const defaultType = Object.entries(types)
                        .find(([_, isEnabled]) => isEnabled)?.[0] || null
                    // Map each key in the range to a structured key object
                    return range.keys.map((key, keyIndex) => {
                        // Try to find a previously configured line for this key
                        const line = this.initialLines.find(
                            (l) => l.key_num === keyIndex && l.linerange === range.name
                        )
                        // Return a new key object with all necessary properties
                        return {
                            ...key, // original key data
                            key_num: keyIndex, // index of the key in the range
                            subscriber_id: line?.subscriber_id || null, // restore previous subscriber if available
                            type: line?.type || defaultType, // use previous type or default type
                            types, // available types for this key
                            linerange: range.name, // name of the range it belongs to
                            label: line?.label || null, // custom speed dial number label
                            target_number: line?.target_number || null, // custom speed dial number
                            is_custom_number_enabled: !!line?.target_number
                        }
                    })
                })
                await this.loadSubscriberInitialOptions()
            },
            immediate: true
        },
        keys: {
            deep: true,
            handler () {
                // Whenever any part of 'keys' changes, emit the updated config
                this.updateConfig()
            }
        }
    },
    async mounted () {
        await this.fetchCustomerContextSubscribers()
        this.updateConfig()
    },
    methods: {
        handleTypeChange () {
            if (this.activeKey) {
                this.activeKey.is_custom_number_enabled = false
            }
            this.updateConfig()
        },
        async loadSubscriberInitialOptions () {
            const subscriberIds = [...new Set(this.keys.map((key) => key.subscriber_id).filter(Boolean))]
                .filter((id) => !this.subscriberOptionsById[id])
            if (subscriberIds.length === 0) {
                return
            }

            const requests = subscriberIds.map((id) => apiFetchEntity('subscribers', id)
                .then((subscriber) => ({ id, subscriber })))
            const results = await Promise.allSettled(requests)

            results.forEach((result) => {
                if (result.status !== 'fulfilled') {
                    return
                }
                const { id, subscriber } = result.value
                const label = subscriber?.username && subscriber?.display_name
                    ? `${subscriber.username} (${subscriber.display_name})`
                    : subscriber?.username || String(id)
                this.subscriberOptionsById[id] = { label, value: id }
            })
        },
        toggleForm (index) {
            const clickedKey = this.keys[index]
            this.activeKey = this.activeKey === clickedKey ? null : clickedKey
        },
        closeForm () {
            if (!this.activeKey?.is_custom_number_enabled) {
                this.activeKey = null
                return
            }

            const numberOk = this.$refs.customTargetNumber?.validate?.()
            const labelOk = this.$refs.customTargetNumberLabel?.validate?.()
            if (!numberOk || !labelOk) {
                return
            }

            this.activeKey = null
        },
        getTypes (types) {
            return Object.entries(types)
                .filter(([_, isEnabled]) => isEnabled)
                .map(([type]) => {
                    return { label: this.keyActionTypeLabels[type], value: type }
                })
        },
        updateConfig () {
            const lines = this.keys
                .filter((key) => this.isKeyActive(key))
                .map((key) => ({
                    type: key.type,
                    key_num: key.key_num,
                    subscriber_id: !key.is_custom_number_enabled ? key.subscriber_id : this.pbxSubscriberPilot?.id || null,
                    linerange: key.linerange,
                    label: key.is_custom_number_enabled ? key.label : null,
                    target_number: key.is_custom_number_enabled ? key.target_number : null
                }))
            this.$emit('update-config', lines)
        },
        isValidNumber (number) {
            // RegEx for numeric characters and/or *, +, #
            const numericCharactersRegEx = /^[0-9+*#]+$/
            if (number === null || number === '') {
                return this.$t('pbxCustomNumberErrorEmpty')
            } else if (!(numericCharactersRegEx.test(number))) {
                return this.$t('pbxCustomNumberErrorNonNumeric')
            }
        },
        isValidLabel (label) {
            if (label === null || label === '') {
                return this.$t('pbxCustomNumberLabelErrorEmpty')
            }
        },
        isKeyActive (key) {
            if (key?.is_custom_number_enabled) {
                return key.label && key.target_number
            }
            return !!key.subscriber_id
        }
    }
}
</script>
  <style scoped>
  .display {
    position: relative;
    display: inline-block;
  }

  .button {
    position: absolute;
    background-color: var(--q-dark);
    color: var(--q-secondary);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-10px);
    cursor: pointer;
  }
  .button-active {
    background-color: var(--q-primary);
  }
  .form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    z-index: 1001;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 8px;
    min-width: 300px;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1000;
  }
  </style>
