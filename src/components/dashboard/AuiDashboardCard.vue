<template>
    <q-card
        bordered
        class="aui-dashboard-card column no-wrap"
    >
        <q-card-section>
            <div class="text-h6 text-center">
                {{ title }}
            </div>
        </q-card-section>

        <q-separator
            inset
        />

        <q-card-section
            class="aui-card-counter-section"
        >
            <div
                v-if="!loading"
                class="text-center"
            >
                <slot name="counter">
                    <div
                        class="text-h2"
                        :class="customizeValueClass(count)"
                    >
                        {{ replaceNullValue(count) }}
                    </div>
                </slot>
            </div>
            <div
                class="text-h2 text-center"
            >
                <q-spinner
                    v-if="loading"
                    color="primary"
                />
            </div>
            <div
                v-if="!loading"
                class="text-center"
            >
                {{ countTitle }}
            </div>
        </q-card-section>

        <q-separator
            inset
        />

        <q-card-section
            class="aui-card-list q-py-sm"
        >
            <q-list
                v-for="(item, index) in itemsList"
                :key="index"
            >
                <q-item
                    dense
                    :class="{ 'q-pl-none': item.clickable }"
                >
                    <q-item-section
                        avatar
                    >
                        <div v-if="!item.icon">
                            &nbsp;
                        </div>
                        <q-icon
                            v-if="item.icon && !item.clickable"
                            :color="item.icon.color"
                            :name="item.icon.name"
                        />
                        <q-btn
                            v-if="item.icon && item.clickable"
                            flat
                            :color="item.icon.color"
                            :icon="item.icon.name"
                            @click="item.action()"
                        />
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>{{ item.title }}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <q-item-label
                            side
                            class="text-weight-bold text-dark"
                            :class="[ customizeValueClass(item.value), item.valueClass ]"
                        >
                            {{ replaceNullValue(item.value) }}
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator
                    v-if="index !== itemsList.length-1"
                    spaced
                />
            </q-list>
            <div
                v-if="!loading && itemsList.length === 0"
                class="text-center"
            >
                {{ error ? $t('Data loading error') : '' }}
            </div>
            <div
                class="text-center"
            >
                <q-spinner
                    v-if="loading && itemsList.length === 0"
                    color="primary"
                />
            </div>
        </q-card-section>

        <q-separator
            inset
        />

        <q-card-section
            class="text-center"
        >
            <q-btn
                color="primary"
                unelevated
                flat
                :label="buttonTitle"
                :to="buttonRouteTo"
            />
        </q-card-section>
    </q-card>
</template>

<script>
export default {
    name: 'AuiDashboardCard',
    props: {
        title: {
            type: String,
            default: ''
        },
        count: {
            type: Number,
            default: null
        },
        countTitle: {
            type: String,
            default: ''
        },
        buttonTitle: {
            type: String,
            default: ''
        },
        buttonRouteTo: {
            type: [Object, String],
            required: true
        },
        itemsList: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        isNoValue (value) {
            return value === undefined || value === null
        },
        replaceNullValue (value) {
            return this.isNoValue(value) ? this.$t('n/a') : value
        },
        customizeValueClass (value) {
            return {
                'aui-value-error': this.error && this.isNoValue(value)
            }
        }
    }

}
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
@import 'src/css/quasar.variables'

.aui-dashboard-card
    margin: 10px
    width: 20%
    height: max-content
    min-width: 284px

    :deep(.aui-value-error)
        color: $negative !important

    :deep(.aui-card-counter-section)
        min-height: 120px

    :deep(.aui-card-list)
        min-height: 146px
</style>
