import yaml from 'js-yaml'

// Static templates come from config.yml and can't be edited or deleted.
// Only templates saved in the database have a creation date.
// (reseller_id can't be used: the API hides it from reseller admins.)
export function isStaticTemplate (template) {
    return !template?.create_timestamp
}

// Prepares a template id for use in an API URL.
// Example: "ACME #1/my template" -> "ACME%20%231/my%20template"
// The "/" is kept because the API expects "<reseller>/<template name>".
export function toApiTemplateId (id) {
    return String(id).split('/').map(encodeURIComponent).join('/')
}

// Converts the YAML text from the editor into an object for the API.
// Dates like 2024-01-01 are kept as plain text.
export function parseTemplateYaml (text) {
    return yaml.load(text, { schema: yaml.CORE_SCHEMA })
}

// Converts the template object from the API into YAML text for the editor.
// Long lines are not wrapped, so code snippets stay on one line.
export function dumpTemplateYaml (template) {
    return yaml.dump(template, { lineWidth: -1 })
}
