<template>
    <aui-base-form
        layout="6"
        dense-list
    >
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <template #col-1>
            <aui-base-form-field>
                <q-select
                    v-model="formData.language"
                    class="q-pb-md"
                    :options="languageSoundSets"
                    :label="$t('Language')"
                    data-cy="soundsets-language"
                    :error="false"
                    dense
                    :disable="loading"
                />
            </aui-base-form-field>
        </template>
        <aui-base-form-field>
            <q-toggle
                v-model="formData.loopplay"
                class="q-pb-md"
                :label="$t('Play in Loop')"
                data-cy="soundsets-loopplay"
                :disable="loading"
            />
        </aui-base-form-field>
        <aui-base-form-field>
            <q-toggle
                v-model="formData.replace_existing"
                class="q-pb-md"
                :label="$t('Replace existing')"
                data-cy="soundsets-replace_existing"
                :disable="loading"
            />
        </aui-base-form-field>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import { mapGetters } from 'vuex'

export default {
    name: 'AuiSoundSetsDefaultFilesForm',
    components: { AuiBaseForm, AuiBaseFormField },
    mixins: [baseFormMixin],
    data () {
        return {
            v$: useValidate()
        }
    },
    computed: {
        ...mapGetters('soundSets', [
            'languageSoundSets'
        ]),
        getDefaultData () {
            return {
                language: null,
                loopplay: false,
                replace_existing: false
            }
        }
    }

}
</script>
