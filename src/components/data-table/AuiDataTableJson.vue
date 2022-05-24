<template>
    <div>
        <vue-json-pretty
            :data="value"
            :path="''"
            :show-line="true"
            :show-length="false"
            :show-double-quotes="false"
            :deep="0"
        />
    </div>
</template>

<script>
import 'vue-json-pretty/lib/styles.css'
export default {
    name: 'AuiDataTableJson',
    props: {
        value: {
            type: Object,
            default: null
        }
    }
}
</script>
