<template>
    <q-item>
        <q-item-section>
            <q-item-label
                caption
            >
                {{ label }}
            </q-item-label>
            <q-item-label
                v-for="(number, index) in value"
                :key="index"
            >
                {{ formatPhoneNumber(number) }}
                <q-icon
                    v-if="number.is_devid"
                    class="q-ml-xs"
                    color="default"
                    name="phone"
                    size="xs"
                />
            </q-item-label>
            <q-item-label
                v-if="!value || (value && value.length === 0)"
            >
                {{ $t('N/A') }}
            </q-item-label>
        </q-item-section>
    </q-item>
</template>

<script>
import { formatPhoneNumber } from 'src/filters/resource'
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: Array,
            required: true
        }
    },
    methods: {
        formatPhoneNumber (...args) {
            return formatPhoneNumber(...args)
        }
    }
}
</script>
