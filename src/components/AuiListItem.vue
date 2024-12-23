<template>
    <div
        :class="itemClasses"
    >
        <div
            class="aui-list-item-head row items-center"
            @click="toggle"
        >
            <div
                v-if="!image"
                class="aui-list-item-head-icon"
            >
                <q-icon
                    :name="icon"
                    size="24px"
                />
            </div>
            <div
                v-if="image"
                class="aui-list-item-head-image"
            >
                <img
                    :src="image"
                >
            </div>
            <div
                class="aui-list-item-head-title col"
            >
                <slot
                    name="title"
                />
            </div>
            <div
                v-if="showMoreMenu"
                class="aui-list-item-head-menu"
            >
                <q-btn
                    icon="more_vert"
                    color="primary"
                    flat
                    dense
                    @click.stop="moreMenu=true"
                />
                <q-menu
                    ref="moreMenu"
                    v-model="moreMenu"
                >
                    <q-list>
                        <slot
                            name="menu"
                        />
                    </q-list>
                </q-menu>
            </div>
            <slot
                name="actions"
                class="aui-list-item-head-menu"
            />
        </div>
        <q-slide-transition>
            <div
                v-if="expanded"
                class="aui-list-item-body"
            >
                <div
                    class="aui-list-item-body-content"
                >
                    <slot
                        name="body"
                    />
                </div>
            </div>
        </q-slide-transition>
        <aui-object-spinner
            v-if="loading"
            :loading="loading"
        />
    </div>
</template>

<script>
import AuiObjectSpinner from 'src/components/AuiObjectSpinner'
export default {
    name: 'AuiListItem',
    components: {
        AuiObjectSpinner
    },
    props: {
        icon: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        },
        expanded: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        odd: {
            type: Boolean,
            default: false
        },
        showMoreMenu: {
            type: Boolean,
            default: true
        }
    },
    emits: ['toggle'],
    data () {
        return {
            moreMenu: false
        }
    },
    computed: {
        itemClasses () {
            const classes = ['aui-list-item', 'transition-generic']
            if (this.expanded) {
                classes.push('aui-list-item-expanded')
            }
            if (this.odd) {
                classes.push('aui-list-item-background')
            }
            return classes
        }
    },
    methods: {
        toggle () {
            this.$emit('toggle', !this.expanded)
        },
        closePopoverMenu () {
            this.moreMenu = false
        }
    }
}
</script>
<style lang="sass" rel="stylesheet/sass">

.aui-list-item-title-value,
.aui-list-item-title-keyword
    margin-right: $flex-gutter-xs
    font-weight: bold
    vertical-align: middle
.aui-list-item.aui-list-item-background
    .aui-list-item-head
        background-color: $item-stripe-color
.aui-list-item
    position: relative
    .aui-list-item-head
        cursor: pointer
        padding: $flex-gutter-sm
        .aui-list-item-head-icon
            padding: 0
            padding-right: $flex-gutter-xs
            padding-left: $flex-gutter-xs
        .aui-list-item-head-image
            width: 32px
            height: 32px
            position: relative
            overflow: hidden
            img
                position: absolute
                width: 100%
        .aui-list-item-head-title
            padding-left: $flex-gutter-sm
            .aui-list-item-title
                font-size: 1rem
                vertical-align: middle
            .aui-list-item-subtitle
                margin-top: 0.2 rem
                font-size: 90%
                vertical-align: middle
        .aui-list-item-head-menu
            .q-btn
                padding: 0
                padding-left: $flex-gutter-xs
                padding-right: $flex-gutter-xs
                .q-btn-inner
                    i
                        margin: 0
    .aui-list-item-body
        background-color: $item-highlight-color
        .aui-list-item-body-content
            padding: $flex-gutter-md
.aui-list-item.aui-list-item-expanded
    .aui-list-item-head
        background-color: $item-highlight-color
        .aui-list-item-head-icon
            color: $primary
        .aui-list-item-head-title
            .aui-list-item-title
                color: $primary
    .aui-list-item-body
        background-color: $item-highlight-color
        .aui-list-item-body-content
            padding: $flex-gutter-md
            padding-top: $flex-gutter-sm
</style>
