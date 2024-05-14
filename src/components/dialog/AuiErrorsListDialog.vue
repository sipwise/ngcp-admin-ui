<template>
    <q-dialog
        ref="dialog"
        class="wide-dialog"
        square
        v-bind="$attrs"
    >
        <q-card
            class="q-dialog-plugin"
        >
            <q-card-section
                :class="'q-pa-sm bg-' + titleColor + ' text-white'"
            >
                <q-item
                    dense
                    class="q-pa-none"
                >
                    <q-item-section
                        side
                    >
                        <q-icon
                            :name="titleIcon"
                            :color="titleTextColor"
                            size="sm"
                        />
                    </q-item-section>
                    <q-item-section
                        no-wrap
                    >
                        <q-item-label
                            class="text-subtitle1"
                        >
                            {{ title }}
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>
            <q-card-section
                class="q-pa-none scroll"
                style="max-height: 50vh"
            >
                <div
                    class="q-pa-lg"
                >
                    <div
                        v-for="([type, errors]) in errorTypeGroups"
                        :key="type"
                    >
                        <div class="text-h6">
                            {{ $t('{type} problems detected', { type: type }) }}
                        </div>
                        <q-separator />
                        <q-list>
                            <!-- eslint-disable-next-line vue/no-v-for-template-key, vue/max-attributes-per-line -->
                            <template v-for="(item, index) in errors" :key="index">
                                <q-item
                                    v-if="item.isNewErrorGroup && type === 'node'"
                                >
                                    <q-item-section>
                                        <q-separator v-if="index > 0" />
                                        <q-item-label
                                            class="q-mt-md"
                                        >
                                            <span class="text-bold">
                                                {{ $t('node {host} is cluster blade {blade}', { host: item.host, blade: item.blade}) }}
                                            </span>
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section avatar>
                                        <q-icon
                                            name="fas fa-angle-double-right"
                                            size="xs"
                                        />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label caption>
                                            <span>{{ $t('Service:') }} </span>
                                            <span class="text-weight-bold">{{ item.service }}</span>
                                        </q-item-label>
                                        <q-item-label>{{ item.error }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-list>
                    </div>
                </div>
            </q-card-section>
            <q-separator />
            <q-card-actions
                align="right"
            >
                <q-btn
                    v-close-popup
                    flat
                    :label="$t('Close')"
                    :color="titleColor"
                    icon="clear"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import _ from 'lodash'
export default {
    name: 'AuiErrorsListDialog',
    props: {
        title: {
            type: String,
            default: ''
        },
        items: {
            type: Object,
            default: () => {}
        },
        titleColor: {
            type: String,
            default: 'negative'
        },
        titleTextColor: {
            type: String,
            default: 'white'
        },
        titleIcon: {
            type: String,
            default: 'warning'
        }
    },
    computed: {
        errorTypeGroups () {
            const res = {}
            Object.entries(this.items || {}).forEach(([type, errors]) => {
                if (type === 'node') {
                    let previousGroupMarker = ''
                    res[type] = (errors || []).map(errorItem => {
                        const groupMarker = errorItem?.host + '|' + errorItem?.blade
                        const newErrorItem = {
                            ...errorItem,
                            isNewErrorGroup: (previousGroupMarker !== groupMarker)
                        }
                        previousGroupMarker = groupMarker
                        return newErrorItem
                    })
                } else {
                    res[type] = _.cloneDeep(errors)
                }
            })
            return Object.entries(res)
        }
    },
    methods: {
        show () {
            this.$refs.dialog.show()
        },
        hide () {
            this.$refs.dialog.hide()
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
.wide-dialog
    .q-dialog-plugin
        width: max-content
        max-width: 70vw
</style>
