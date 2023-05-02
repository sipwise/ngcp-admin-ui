
import _ from 'lodash'

export default ({ app }) => {
    /*
        If you would like to see all "data-cy" attributes on the page, just run next code in the browser's console

        console.table([...document.querySelectorAll('[data-cy]')].map(el => [el.dataset.cy, el]))
     */

    app.mixin({
        watch: {
            dataCyKey () {
                this.updateDataCyAttribute()
            }
        },
        mounted () {
            this.updateDataCyAttribute()
        },
        methods: {
            updateDataCyAttribute () {
                if (this.$vnode && this.$el && this.$el.setAttribute) {
                    // trying to get the component's attribute "data-cy"
                    const componentDataCyAttr = this.$vnode.componentInstance?.$attrs?.['data-cy']
                    let dataCy = ''
                    if (!componentDataCyAttr) {
                        // Trying to pick a parent wrapper component's name. Like the name of our custom component which contains some "q-..." component
                        const getNestedComponentsNames = ($vnode) => {
                            if (!$vnode) {
                                return []
                            }
                            const name = _.get($vnode, 'componentOptions.Ctor.extendOptions.name', null)
                            const key = ($vnode.key !== undefined && !String($vnode.key).startsWith('__transition')) ? $vnode.key : null

                            const parentData = ($vnode.elm === $vnode?.parent?.elm) ? getNestedComponentsNames($vnode.parent) : []
                            return [[name, key, $vnode], ...parentData]
                        }
                        const componentNames = getNestedComponentsNames(this.$vnode)

                        // let's skip all "transition" root components if it is possible
                        let finalItem
                        while (componentNames.length > 0 && !finalItem) {
                            const currentItem = componentNames.pop()
                            const name = currentItem[0]
                            if (name !== 'transition' || componentNames.length === 0) {
                                finalItem = currentItem
                            }
                        }
                        const [componentName, instanceKey, f$vnode] = finalItem || []

                        // trying to read component's computed property "dataCyKey"
                        const customInstanceKey = f$vnode?.componentInstance?.dataCyKey
                        const dataCyKey = (customInstanceKey !== undefined && customInstanceKey !== null) ? customInstanceKey : instanceKey

                        dataCy = _.kebabCase(componentName) + ((dataCyKey !== null) ? '--' + _.kebabCase(dataCyKey) : '')
                    } else {
                        dataCy = componentDataCyAttr
                    }

                    if (dataCy !== '') {
                        this.$el.setAttribute('data-cy', dataCy)
                    } else if (process.env.DEV) {
                        console.warn('data-cy generation failed due to missing component name', this.$el)
                    }
                }
            }
        }
    })
}
