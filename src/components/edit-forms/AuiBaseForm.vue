<template>
    <q-form>
        <div
            v-if="layout"
            class="row"
        >
            <div
                v-for="(column, index) in columns"
                :key="index"
                :class="'col-md-' + column + ' col-xs-12'"
            >
                <q-list
                    :key="'list' + index"
                    :dense="denseList"
                >
                    <slot
                        :name="'col-' + (index + 1)"
                    />
                </q-list>
            </div>
        </div>
        <slot />
    </q-form>
</template>

<script>
export default {
    name: 'AuiBaseForm',
    props: {
        layout: {
            type: String,
            default: null
        },
        denseList: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        columns () {
            return this.layout.split('-')
        }
    }
}
</script>
