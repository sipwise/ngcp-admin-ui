<template>
    <aui-select-lazy
        :label="label"
        clearable
        :store-generator-name="storeGeneratorName"
        :store-action-params="{
            subscriber_id: subscriberId
        }"
        :load-initially="false"
        :initial-option="initialOption"
        v-bind="$attrs"
    >
        <template
            v-for="(_, slotName) of $slots"
            #[slotName]="scope"
        >
            <slot
                :name="slotName"
                v-bind="scope"
            />
        </template>
        <template
            #after
        >
            <q-btn
                size="sm"
                color="primary"
                unelevated
                outline
                icon="add"
                :label="$t('Add')"
                data-cy="aui-create-button"
                @click="openDialog('create')"
            />
            <q-btn
                v-if="itemId"
                class="q-mr-sm"
                icon="edit"
                color="primary"
                size="sm"
                :label="$t('Edit')"
                data-cy="aui-edit-button"
                unelevated
                @click="openDialog('edit')"
            />
        </template>
    </aui-select-lazy>
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
import NegativeConfirmationDialog from 'src/components/dialog/NegativeConfirmationDialog'
export default {
    name: 'AuiSelectCallForwardParams',
    components: { AuiSelectLazy },
    props: {
        subscriberId: {
            type: Number,
            default: null
        },
        type: {
            type: String,
            default: null
        },
        itemId: {
            type: Number,
            default: null
        },
        initialOption: {
            type: Object,
            default: null
        },
        hasUnsavedData: {
            type: Boolean,
            default: false
        }
        // Note we are not using 'createButtons' param to
        // insert the buttons because the layout
        // doesn't match the requirements
    },
    computed: {
        storeGeneratorName () {
            const getters = {
                destination: 'selectLazy/destinationSets',
                time: 'selectLazy/timeSets',
                source: 'selectLazy/sourceSets',
                bNumber: 'selectLazy/bNumberSets'
            }
            return getters[this.type]
        }
    },
    methods: {
        createRoute () {
            const routes = {
                destination: { name: 'subscriberDetailsCallForwardingDestinationSetCreation' },
                time: { name: 'subscriberDetailsCallForwardingTimeSetCreation' },
                source: { name: 'subscriberDetailsCallForwardingSourceSetCreation' },
                bNumber: { name: 'subscriberDetailsCallForwardingBNumberSetCreation' }
            }
            return routes[this.type]
        },
        editRoute () {
            const routes = {
                destination: {
                    name: 'subscriberDetailsCallForwardingDestinationSetEdit',
                    params: {
                        destinationsetId: this.itemId,
                        id: this.subscriberId
                    }
                },
                time: {
                    name: 'subscriberDetailsCallForwardingTimeSetEdit',
                    params: {
                        timesetId: this.itemId,
                        id: this.subscriberId
                    }
                },
                source: {
                    name: 'subscriberDetailsCallForwardingSourceSetEdit',
                    params: {
                        sourcesetId: this.itemId,
                        id: this.subscriberId
                    }
                },
                bNumber: {
                    name: 'subscriberDetailsCallForwardingBNumberSetEdit',
                    params: {
                        bnumbersetId: this.itemId,
                        id: this.subscriberId
                    }
                }
            }
            return routes[this.type]
        },
        async goToCreate () {
            const toPath = this.$router.resolve({
                name: this.createRoute().name
            }).path

            await this.$auiGoToNextForm({
                fromPath: this.$route.path,
                toPath
            })
        },
        async goToEdit () {
            const toPath = this.$router.resolve({
                name: this.editRoute().name,
                params: this.editRoute().params
            }).path

            await this.$auiGoToNextForm({
                fromPath: this.$route.path,
                toPath
            })
        },
        openDialog (action) {
            if (this.hasUnsavedData) {
                return this.$q.dialog({
                    component: NegativeConfirmationDialog,
                    componentProps: {
                        title: 'Have you saved your progress?',
                        icon: 'delete_forever',
                        text: 'If you proceed any unsaved progress will be lost. Do you want to continue?',
                        buttonIcon: 'delete_forever',
                        buttonLabel: this.$t('Continue')
                    }
                }).onOk(() => {
                    return this.redirectTo(action)
                })
            }

            return this.redirectTo(action)
        },
        redirectTo (action) {
            if (action === 'create') {
                return this.goToCreate()
            }

            return this.goToEdit()
        }
    }
}
</script>
