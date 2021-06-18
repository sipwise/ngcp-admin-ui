<template>
    <div>
        <q-input
            dense
            :label="label"
            :value="fileName"
            :loading="$attrs.loading"
            :disable="$attrs.loading"
            type="text"
        >
            <template
                v-slot:append
            >
                <q-btn
                    icon="folder"
                    text-color="primary"
                    flat
                    size="sm"
                    unelevated
                    @click="$refs.fileInput.$el.click()"
                />
                <q-btn
                    v-if="initialFileName !== null || selectedFile !== null"
                    class="q-ml-sm"
                    icon="delete"
                    flat
                    color="red"
                    text-color="red"
                    size="sm"
                    unelevated
                    @click="fileSelected"
                />
            </template>
        </q-input>
        <q-input
            v-show="false"
            ref="fileInput"
            type="file"
            :loading="$attrs.loading"
            :disable="$attrs.loading"
            :accept="$attrs.accept"
            @input="fileInput"
        />
    </div>
</template>

<script>
export default {
    name: 'AuiInputFile',
    props: {
        initialFileName: {
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
            selectedFile: null
        }
    },
    computed: {
        fileName () {
            return this.selectedFile?.name || this.initialFileName
        }
    },
    methods: {
        fileInput (fileList) {
            this.selectedFile = fileList[0]
            this.$emit('fileSelected', this.selectedFile)
        },
        fileSelected () {
            this.selectedFile = null
            this.$refs.fileInput.$el.value = null
            this.$emit('fileSelected', null)
        }
    }
}
</script>
