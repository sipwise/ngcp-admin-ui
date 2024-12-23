import _ from 'lodash'

export default class ApiExpand {
    constructor () {
        this.expandSet = new Set()
    }

    add (newExpand) {
        if (_.isString(newExpand) && _.trim(newExpand) !== '') {
            const trimmedExpand = _.trim(newExpand)
            const parts = trimmedExpand.split('.')
            parts.pop()
            while (parts.length > 0) {
                this.expandSet.delete(parts.join('.'))
                parts.pop()
            }
            let hasChild = false
            this.expandSet.forEach((expand) => {
                if (expand.startsWith(`${trimmedExpand}.`)) {
                    hasChild = true
                }
            })
            if (!hasChild) {
                this.expandSet.add(trimmedExpand)
            }
        }
    }

    size () {
        return this.expandSet.size
    }

    toString () {
        return Array.from(this.expandSet).join(',')
    }
}
