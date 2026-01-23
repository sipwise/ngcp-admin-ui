<template>
    <div class="q-pa-xl">
        <aui-base-form
            @submit="onSubmit"
        >
            <q-stepper
                ref="stepper"
                v-model="step"
                color="primary"
                animated
            >
                <q-step
                    :name="1"
                    :title="$t('Select the direction for your Header Rule')"
                    icon="settings"
                    :done="step > 1"
                >
                    Placeholder
                </q-step>
                <q-step
                    :name="2"
                    :title="$t('Create your Conditions')"
                    icon="create_new_folder"
                    :done="step > 2"
                >
                    Placeholder
                </q-step>
                <q-step
                    :name="3"
                    :title="$t('Add your Actions')"
                    icon="add_comment"
                    :done="step > 3"
                >
                    Placeholder
                </q-step>
                <template #navigation>
                    <q-stepper-navigation class="row items-center full-width">
                        <q-btn
                            color="primary"
                            :label="step === 3 ? $t('Finish') : $t('Continue')"
                            @click="onNext(step)"
                        />
                        <q-btn
                            v-if="step > 1"
                            flat
                            color="primary"
                            :label="$t('Back')"
                            class="q-ml-sm"
                            @click="onPrevious"
                        />
                        <q-space />
                        <q-btn
                            v-if="step > 0"
                            flat
                            color="primary"
                            :label="$t('Exit')"
                            @click="onExit"
                        />
                    </q-stepper-navigation>
                </template>
            </q-stepper>
        </aui-base-form>
    </div>
</template>

<script>

import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'

export default {
    name: 'AuiHeaderManipulationsWizard',
    components: { AuiBaseForm },
    mixins: [baseFormMixin],
    emits: ['submit'],
    data () {
        return {
            step: 1
        }
    },
    methods: {
        onSubmit () {
            return this.$emit('submit')
        },
        onNext (step) {
            if (step === 3) {
                this.onExit()
            }
            this.$refs.stepper.next()
        },
        onPrevious () {
            this.$refs.stepper.previous()
        },
        onExit () {
            const parentRouteName = this.$route?.meta?.parentPath?.split('.')?.[0]
            if (parentRouteName) {
                this.$router.push({ name: parentRouteName })
                return
            }
            this.$router.back()
        }
    }
}
</script>

<style scoped>
:deep(.q-stepper__tab .q-icon) {
    font-size: 15px;
    transform: translateX(-2px);
}
</style>
