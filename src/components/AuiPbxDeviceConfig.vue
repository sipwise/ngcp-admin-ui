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
                class="button"
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
                v-model="activeKey.subscriber_id"
                dense
                :label="$t('Subscriber')"
                data-cy="pbx-device-subscriber"
                :customer-id="customerContext.id"
                @change="updateConfig"
            />
            <q-select
                v-model="activeKey.type"
                :options="getTypes(activeKey.types)"
                dense
                data-cy="pbx-device-linemode"
                @change="updateConfig"
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
            activeKey: null
        }
    },
    watch: {
        // Watch for changes in the 'linerange' prop
        linerange: {
            handler (newVal) {
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
                            linerange: range.name // name of the range it belongs to
                        }
                    })
                })
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
    methods: {
        toggleForm (index) {
            const clickedKey = this.keys[index]
            this.activeKey = this.activeKey === clickedKey ? null : clickedKey
        },
        closeForm () {
            this.activeKey = null
        },
        getTypes (types) {
            return Object.entries(types)
                .filter(([_, isEnabled]) => isEnabled)
                .map(([type]) => type)
        },
        updateConfig () {
            const lines = this.keys
                .filter((key) => key.subscriber_id)
                .map((key) => ({
                    type: key.type,
                    key_num: key.key_num,
                    subscriber_id: key.subscriber_id,
                    linerange: key.linerange
                }))
            this.$emit('update-config', lines)
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
    background-color: green;
    color: white;
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
