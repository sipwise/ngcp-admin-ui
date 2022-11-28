<template>
    <q-input
        v-model.trim="color"
        dense
        clearable
        :label="label"
        :error="$v.color.$error"
        :error-message="$t('Please add a valid color (hex, hexa, rgb or rgba)')"
        @input="emitInput"
        @clear="deleteColor"
    >
        <template v-slot:prepend>
            <div
                v-if="color && colorPreview.length > 0"
                class="aui-color-picker-preview"
                :style="colorPreview"
            />
        </template>
        <template v-slot:append>
            <q-icon
                name="colorize"
                class="cursor-pointer"
                data-cy="color-picker"
            >
                <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                >
                    <q-color
                        v-model="color"
                        format-model="rgba"
                        @change="emitInput"
                    />
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script>
import { isColor } from 'src/validators/common'
export default {
    name: 'AuiColorPicker',
    props: {
        value: {
            type: String,
            default: null
        },
        label: {
            type: String,
            default: null
        }
    },
    data () {
        return {
            color: null
        }
    },
    validations: {
        color: {
            isColor
        }
    },
    computed: {
        colorPreview () {
            return isColor(this.color) ? 'background:' + this.color : ''
        }
    },
    watch: {
        value: {
            handler (val) {
                if (!this.$v.$invalid) {
                    this.color = val
                }
            },
            immediate: true
        },
        '$v.$invalid' (newValue) {
            if (newValue === true) {
                this.$emit('input', null)
            }
        }
    },
    methods: {
        deleteColor () {
            this.color = null
            this.emitInput()
        },
        emitInput () {
            this.$v.$touch()
            if (this.color === '') {
                this.color = null
            }
            if (!this.$v.$invalid) {
                this.$emit('input', this.color)
            }
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.aui-color-picker-preview
    width: 20px
    height: 20px
</style>
