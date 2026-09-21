<template>
    <div class="aui-call-flow-node-editor">
        <div
            v-for="node in nodes"
            :key="node"
            class="row items-center q-col-gutter-sm q-mb-xs"
        >
            <div class="col-5 aui-call-flow-node-editor-key">
                {{ node }}
            </div>
            <div class="col-7">
                <q-input
                    dense
                    outlined
                    :model-value="aliasesModel[node] || ''"
                    :placeholder="autoLabels[node] || node"
                    @update:model-value="(value) => setAlias(node, value)"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    nodes: { type: Array, default: () => [] },
    autoLabels: { type: Object, default: () => ({}) }
})

const aliasesModel = defineModel('aliases', { type: Object, default: () => ({}) })

const setAlias = (node, value) => {
    const next = { ...aliasesModel.value }
    if (value) {
        next[node] = value
    } else {
        delete next[node]
    }
    aliasesModel.value = next
}
</script>
