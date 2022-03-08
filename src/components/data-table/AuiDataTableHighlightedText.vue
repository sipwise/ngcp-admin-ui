<template>
    <span>
        <text-highlight
            v-if="highlighted"
            :queries="[searchTerm]"
        >
            {{ highlightedText }}
        </text-highlight>
        <template
            v-else
        >
            {{ highlightedText }}
        </template>
    </span>
</template>

<script>
export default {
    name: 'AuiDataTableHighlightedText',
    props: {
        highlighted: {
            type: Boolean,
            default: false
        },
        highlightedText: {
            type: [Number, String],
            default: undefined
        },
        searchTerm: {
            type: String,
            default: undefined
        }
    }
}
</script>
