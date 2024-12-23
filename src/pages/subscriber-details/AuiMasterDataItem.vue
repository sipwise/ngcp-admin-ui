<template>
    <q-item
        :to="to"
    >
        <q-item-section
            v-if="icon"
            side
        >
            <q-icon
                :name="icon"
            />
        </q-item-section>
        <q-item-section>
            <q-item-label
                caption
            >
                {{ label }}
            </q-item-label>
            <q-item-label
                v-if="value !== undefined && value !== null && value !== ''"
                :class="tableClass"
            >
                {{ value }}
            </q-item-label>
            <q-item-label
                v-else
            >
                {{ $t('N/A') }}
            </q-item-label>
        </q-item-section>
    </q-item>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            default: undefined
        },
        value: {
            type: [String, Number],
            default: null
        },
        bold: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'default'
        },
        to: {
            type: Object,
            default: undefined
        }
    },
    computed: {
        tableClass () {
            const classes = []
            if (this.bold) {
                classes.push('text-weight-bold')
            }
            if (this.color) {
                classes.push(`text-${this.color}`)
            }
            return classes
        }
    }
}
</script>
