import _ from 'lodash'

export function sortObjectByKey (obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key]
        return result
    }, {})
}

export function compareArrayOfObjects (arr1, arr2) {
    return _(arr1).differenceWith(arr2, _.isEqual).isEmpty()
}

export function sortItemsWithLabelAlphabetically (itemsWithLabel) {
    itemsWithLabel.sort((a, b) => {
        if (a.label?.toLowerCase() < b.label?.toLowerCase()) {
            return -1
        }
        if (a.label?.toLowerCase() > b.label?.toLowerCase()) {
            return 1
        }
        return 0
    })
}
