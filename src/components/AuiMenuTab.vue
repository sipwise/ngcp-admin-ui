<template>
    <div>
        <q-list>
            <q-card>
                <q-tabs
                    v-model="localSelectedTab"
                    class="q-mb-md"
                >
                    <q-tab
                        v-for="(iframe, index) in iframes"
                        :key="index"
                        :name="index"
                        :label="iframe.label"
                        style="margin-right: 20px;"
                    />
                </q-tabs>
                <q-card-section>
                    <div
                        v-for="(iframe, index) in iframes"
                        v-show="localSelectedTab === index"
                        :key="index"
                    >
                        <iframe
                            v-for="(src, srcIndex) in iframe.srcs"
                            :key="srcIndex"
                            :src="typeof src === 'object' ? src.source : src"
                            :width="typeof src === 'object' ? src.width || iframe.width || 730 : iframe.width || 730"
                            :height="typeof src === 'object' ? src.height || iframe.height || 300 : iframe.height || 300"
                            style="margin-right: 20px;"
                            frameborder="0"
                        />
                    </div>
                </q-card-section>
            </q-card>
        </q-list>
    </div>
</template>
<script>

export default {
    name: 'AuiMenuTab',
    props: {
        iframes: {
            type: Array,
            required: true
        },
        selectedTab: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            localSelectedTab: this.selectedTab 
        }
    }
}
</script>
<style lang="sass" rel="stylesheet/sass">
.q-tabs__content--align-center 
    justify-content: left
    margin-left: 20px
    margin-right: 20px
    margin-top: 10px
.q-tabs__content 
    overflow: visible
</style>
