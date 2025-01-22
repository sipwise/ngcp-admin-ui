<template>
    <q-btn
        icon="language"
        data-cy="aui-selection-language"
        :color="iconColor"
        flat
        dense
        round
    >
        <q-menu>
            <q-item
                v-close-popup
            >
                <q-item-section
                    class="text-weight-medium"
                >
                    {{ languageLabel }}
                </q-item-section>
            </q-item>
            <q-separator />
            <q-item
                v-for="(language, index) in options"
                :key="index"
                v-close-popup
                clickable
                @click="changeLanguage(language.value)"
            >
                <q-item-section>{{ language.label }}</q-item-section>
            </q-item>
        </q-menu>
    </q-btn>
</template>

<script>
import _ from 'lodash'
import { i18n } from 'boot/i18n'
import { setLanguage } from 'src/i18n'
import { mapActions } from 'vuex'
export default {
    name: 'AuiSelectionLanguage',
    props: {
        iconColor: {
            type: String,
            default: 'primary'
        }
    },
    computed: {
        languageLabel () {
            const lang = _.first(this.options.filter(item => item.value === i18n.global.locale))
            return this.$t('Language') + ' (' + lang.label + ')'
        },
        options () {
            return [
                {
                    value: 'en-US',
                    label: this.$t('English', {}, { locale: 'en-US' })
                },
                {
                    value: 'de',
                    label: this.$t('German', {}, { locale: 'de' })
                },
                {
                    value: 'es',
                    label: this.$t('Spanish', {}, { locale: 'es' })
                },
                {
                    value: 'fr',
                    label: this.$t('French', {}, { locale: 'fr' })
                },
                {
                    value: 'it',
                    label: this.$t('Italian', {}, { locale: 'it' })
                }
            ]
        }
    },
    methods: {
        ...mapActions('user', [
            'updateFavPages'
        ]),
        async changeLanguage (lang) {
            await setLanguage(lang)
            this.updateFavPages()
        }
    }
}
</script>
