import { apiDelete, apiPut } from 'src/api/ngcpAPI'
import {
    dumpTemplateYaml, isStaticTemplate, parseTemplateYaml, toApiTemplateId
} from 'src/helpers/batch-provisioning'
import { deleteTemplate, updateTemplate } from 'src/store/batchProvisioningTemplates/actions'
import { isValidTemplateName, isValidYamlMapping } from 'src/validators/common'

jest.mock('src/api/ngcpAPI', () => ({
    apiDelete: jest.fn(),
    apiPost: jest.fn(),
    apiPut: jest.fn()
}))

describe('isStaticTemplate', () => {
    it('treats templates without a creation date as static (config.yml)', () => {
        expect(isStaticTemplate({ name: 'static tpl', reseller_id: null })).toBe(true)
        expect(isStaticTemplate({})).toBe(true)
    })

    it('treats templates with a creation date as database templates', () => {
        expect(isStaticTemplate({ create_timestamp: '2026-09-01 10:00:00', reseller_id: 1 })).toBe(false)
    })

    it('treats a reseller admin\'s templates (no reseller_id in the response) as database templates', () => {
        expect(isStaticTemplate({ create_timestamp: '2026-09-01 10:00:00' })).toBe(false)
    })
})

describe('isValidYamlMapping', () => {
    it('accepts a YAML mapping', () => {
        expect(isValidYamlMapping('fields:\n  - name: cc\n')).toBe(true)
    })

    it('leaves empty input to the required validator', () => {
        expect(isValidYamlMapping('')).toBe(true)
        expect(isValidYamlMapping('   ')).toBe(true)
    })

    it('rejects YAML syntax errors', () => {
        expect(isValidYamlMapping('fields: [unclosed')).toBe(false)
    })

    it('rejects YAML whose top level is not a mapping', () => {
        expect(isValidYamlMapping('foo')).toBe(false)
        expect(isValidYamlMapping('- a\n- b\n')).toBe(false)
        expect(isValidYamlMapping('~')).toBe(false)
    })
})

describe('isValidTemplateName', () => {
    it('accepts letters, digits, spaces and dashes', () => {
        expect(isValidTemplateName('My Template-01')).toBe(true)
    })

    it('leaves empty input to the required validator', () => {
        expect(isValidTemplateName('')).toBe(true)
    })

    it.each(['a/b', 'a\\b', 'a?b', 'a#b', 'a%b', 'a.b', 'a_b', 'tëmplate'])('rejects %s', (value) => {
        expect(isValidTemplateName(value)).toBe(false)
    })
})

describe('toApiTemplateId', () => {
    it('encodes each segment but keeps the reseller/name separator', () => {
        expect(toApiTemplateId('my reseller/tpl #1?')).toBe('my%20reseller/tpl%20%231%3F')
    })

    it('encodes static template ids (no reseller segment)', () => {
        expect(toApiTemplateId('50%')).toBe('50%25')
    })
})

describe('batchProvisioningTemplates actions', () => {
    it('updateTemplate sends the encoded id', async () => {
        await updateTemplate({}, { id: 'default/a#b', payload: {} })
        expect(apiPut).toHaveBeenCalledWith(expect.objectContaining({ resourceId: 'default/a%23b' }))
    })

    it('deleteTemplate sends the encoded id', async () => {
        await deleteTemplate({}, { resourceId: 'default/a?b' })
        expect(apiDelete).toHaveBeenCalledWith(expect.objectContaining({ resourceId: 'default/a%3Fb' }))
    })
})

describe('parseTemplateYaml / dumpTemplateYaml', () => {
    it('keeps date-like values as strings', () => {
        expect(parseTemplateYaml('valid_from: 2024-01-01\n')).toEqual({ valid_from: '2024-01-01' })
    })

    it('keeps long value_code snippets on one line', () => {
        const code = 'function() { return row.cc.concat(row.ac).concat(row.sn).concat(row.something_long); }'
        expect(dumpTemplateYaml({ value_code: code })).toBe(`value_code: ${code}\n`)
    })

    it('round-trips a template structure', () => {
        const template = { fields: [{ name: 'cc', required: 1 }], subscriber: { domain: 'example.org' } }
        expect(parseTemplateYaml(dumpTemplateYaml(template))).toEqual(template)
    })
})
