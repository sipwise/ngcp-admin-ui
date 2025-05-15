import { i18n } from 'boot/i18n'

const PATCHABLE_FIELDS = ['name', 'reseller_id', 'call_direction']

export function getInvoiceTemplateCategoryOptions () {
    return [
        { value: 'customer', label: i18n.global.t('Customer') },
        { value: 'reseller', label: i18n.global.t('Reseller') },
        { value: 'peer', label: i18n.global.t('Peer') },
        { value: 'did', label: i18n.global.t('DID') }
    ]
}

export function getInvoiceTemplateCallDirectionOptions () {
    return [
        { value: 'in', label: i18n.global.t('Incoming') },
        { value: 'out', label: i18n.global.t('Outgoing') },
        { value: 'in_out', label: i18n.global.t('Incoming and Outgoing') }
    ]
}

export function isResellerRequired (category) {
    return ['customer', 'did'].includes(category)
}

export function toInvoiceTemplateFormData (template) {
    return {
        name: template.name,
        reseller_id: template.reseller_id ?? null,
        type: template.type,
        call_direction: template.call_direction,
        category: template.category
    }
}

export function buildInvoiceTemplatePayload ({
    name, reseller_id: resellerId,
    type, call_direction: callDirection,
    category
}) {
    return {
        name,
        type,
        call_direction: callDirection,
        category,
        ...(isResellerRequired(category) && resellerId
            ? { reseller_id: resellerId }
            : {})
    }
}

export function buildInvoiceTemplatePatch (initial, current) {
    return PATCHABLE_FIELDS
        .filter((field) => (initial[field] ?? null) !== (current[field] ?? null))
        .map((field) => ({ op: 'replace', path: `/${field}`, value: current[field] ?? null }))
}

// SVGEdit serialises quotes in text nodes as `&#x27;` and `&quot;`
// and works only inside [% ... %] directives
export function unescapeInvoiceTemplateDirectives (svgContent) {
    return svgContent.replace(/\[%[\s\S]*?%\]/g, (directive) =>
        directive.replace(/&#x27;/g, '\'').replace(/&quot;/g, '"')
    )
}

const DATE_NOW_KEY = 'date_now()'

/**
 * Flattens the response of `GET .../:id/@vars` into the list of expressions usable in a template,
 * e.g. { customer: { id: 1 } } -> { path: 'customer.id', expression: '[% customer.id %]', example: '1' }
 *
 * Nested objects are walked recursively and their keys joined with dots. Arrays are skipped because
 * the rest-api only accepts plain dotted paths (no indexes) in a `[% ... %]` directive. The special
 * `date_now()` key is kept as it is, as its value is already the expression to use.
 *
 * @param {Object|null} vars response body of the `@vars` endpoint
 * @returns {{ path: string, expression: string, example: string }[]}
 */
export function flattenInvoiceTemplateVars (vars) {
    const entries = []
    const walk = (value, prefix) => {
        Object.entries(value ?? {}).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                return
            }
            if (key === DATE_NOW_KEY) {
                entries.push({ path: key, expression: `[% ${child} %]`, example: child })
            } else if (child !== null && typeof child === 'object') {
                walk(child, `${prefix}${key}.`)
            } else {
                const path = `${prefix}${key}`
                entries.push({ path, expression: `[% ${path} %]`, example: child === null ? '' : String(child) })
            }
        })
    }
    walk(vars, '')
    return entries
}

export function getInvoiceTemplateMarkers (category) {
    const markers = [
        { marker: '<!--@define-background-->', description: i18n.global.t('Starts the background definition, repeated on every page. Closed by the end marker'), categories: [] },
        { marker: '<!--@background-->', description: i18n.global.t('Draws the defined background'), categories: [] },
        { marker: '<!--@zones-->', description: i18n.global.t('Lists the zones with their totals'), categories: [] },
        { marker: '<!--@calls-->', description: i18n.global.t('Lists the calls'), categories: ['customer'] },
        { marker: '<!--@foreach-did-->', description: i18n.global.t('Repeats the enclosed part for every DID subscriber. Closed by the end marker'), categories: ['did'] },
        { marker: '<!--@did-zones-->', description: i18n.global.t('Lists the zones of the current DID subscriber, only inside foreach-did'), categories: ['did'] },
        { marker: '<!--@advance-->', description: i18n.global.t('Moves the following footer below the list'), categories: [] },
        { marker: '<!--@pagebreak-->', description: i18n.global.t('Starts a new page if the following footer does not fit on the page'), categories: [] },
        { marker: '<!--@newpage-->', description: i18n.global.t('Starts a new page'), categories: [] },
        { marker: '<!--@end-->', description: i18n.global.t('Closes define-background or foreach-did'), categories: [] }
    ]
    return markers.filter(({ categories }) => !categories.length || categories.includes(category))
}
