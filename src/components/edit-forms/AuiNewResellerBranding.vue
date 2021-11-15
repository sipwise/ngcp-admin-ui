<template>
    <q-form>
        <div
            class="row"
        >
            <div
                class="col-md-6 col-xs-12"
            >
                <q-list
                    :disabled="$wait.is('aui-reseller-branding')"
                >
                    <q-item>
                        <aui-image-uploader
                            ref="imageUploader"
                            :label="$t('Logo')"
                            :image="logoPreview"
                            preview-style="min-width: 84px; max-width: 100px; max-height: 60px"
                            @image-added="logoAdded"
                            @image-removed="logoRemoved"
                        />
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-color-picker
                                :value="data.csc_color_primary"
                                :label="$t('Front color')"
                                @input="setPrimaryColor"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-color-picker
                                :value="data.csc_color_secondary"
                                :label="$t('Background color')"
                                @input="setSecondaryColor"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </q-form>
</template>

<script>
import AuiColorPicker from 'components/input/AuiColorPicker'
import { mapWaitingActions } from 'vue-wait'
import _ from 'lodash'
import AuiImageUploader from 'components/input/AuiImageUploader'
export default {
    name: 'AuiNewResellerBranding',
    components: { AuiImageUploader, AuiColorPicker },
    props: {
        resellerId: {
            type: Number,
            default: null
        }
    },
    data () {
        return {
            initialData: {},
            data: {}
        }
    },
    computed: {
        logoPreview () {
            return this.data.logo ? URL.createObjectURL(this.data.logo) : null
        }
    },
    watch: {
        data: {
            handler (value) {
                const hasUnsavedData = !_.isEqual(this.initialData, value)
                this.$parent.$emit('form-has-unsaved-data', hasUnsavedData)
            },
            deep: true
        }
    },
    mounted () {
        this.loadData()
    },
    methods: {
        ...mapWaitingActions('resellers', {
            fetchResellerBranding: 'aui-reseller-branding',
            fetchResellerLogo: 'aui-reseller-branding'
        }),
        async loadData () {
            this.$emit('start-loading')
            try {
                this.initialData = await this.fetchResellerBranding(this.resellerId)
                if (!this.initialData.logo) {
                    this.initialData.logo = await this.fetchResellerLogo(this.resellerId)
                }
            } finally {
                this.reset()
                this.$emit('end-loading')
            }
        },
        logoAdded (logo) {
            this.data.logo = logo
        },
        logoRemoved () {
            this.data.logo = null
        },
        setPrimaryColor (value) {
            this.data.csc_color_primary = value
        },
        setSecondaryColor (value) {
            this.data.csc_color_secondary = value
        },
        async reset () {
            this.data = _.cloneDeep(this.initialData)
            await this.$refs.imageUploader.reset()
            if (this.data.logo && this.data.logo !== '') {
                this.$refs.imageUploader.loadImage(this.data.logo)
            }
            this.$parent.$emit('form-has-unsaved-data', false)
        },
        submit () {
            this.$parent.$emit('form-input', this.data)
        }
    }
}
</script>
