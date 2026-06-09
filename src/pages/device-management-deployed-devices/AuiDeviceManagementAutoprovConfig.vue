<template>
    <aui-base-page
        class="aui-device-autoprov-config-page column no-wrap"
        :loading="loading"
        @refresh="fetchConfig"
    >
        <div class="q-pa-md">
            <q-card>
                <q-card-section class="row items-center justify-between">
                    <div class="text-h6">
                        {{ $t('Autoprov Config') }}: {{ identifier }}
                    </div>
                    <q-btn
                        :disable="!xmlContent"
                        icon="content_copy"
                        flat
                        :label="$t('Copy')"
                        @click="handleCopyToClipboard"
                    />
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <pre
                        v-if="xmlContent"
                        class="autoprov-xml language-xml no-margin rounded-borders overflow-auto"
                    >
                        <code
                            class="language-xml"
                            v-html="highlightedXmlContent"
                        />
                    </pre>
                    <div v-else class="text-subtitle2 text-center q-pa-md">
                        {{ $t('No autoprov config available') }}
                    </div>
                </q-card-section>
            </q-card>
        </div>
      </aui-base-page>
</template>

<script>
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import { copyToClipboard } from 'quasar'
import AuiBasePage from 'pages/AuiBasePage'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'

export default {
    name: 'AuiDeviceManagementAutoprovConfig',
    components: {
        AuiBasePage
    },
    data () {
        return {
            xmlContent: null,
        }
    },
    computed: {
        identifier () {
            return this.$route.params.identifier
        },
        highlightedXmlContent() {
            if (!this.xmlContent) {
                return
            }

            return Prism.highlight(this.xmlContent, Prism.languages.xml, 'xml')
        },
    },
    watch: {
        '$route.params.identifier': {
            async handler() {
                this.xmlContent = null
                await this.fetchConfig()
            },
            immediate: true,
        }
    },
    async mounted () {
        await this.fetchConfig()
    },
    methods: {
        ...mapWaitingActions('deviceManagement', {
            getDeviceAutoprovConfigContent: WAIT_PAGE
        }),
        async fetchConfig() {
            const xmlContentResponse = await this.getDeviceAutoprovConfigContent(this.identifier)
            this.xmlContent = xmlContentResponse || null
        },
        handleCopyToClipboard() {
            copyToClipboard(this.xmlContent)
                .then(() => {
                    showGlobalSuccessMessage(this.$t('Copied to clipboard'))
                })
        },
    }
}
</script>

<style scoped>
.autoprov-xml {
    max-height: 70vh;
    white-space: pre-wrap;
    word-break: break-all;
}

.autoprov-xml code {
    white-space: inherit;
    word-break: inherit;
}
</style>
