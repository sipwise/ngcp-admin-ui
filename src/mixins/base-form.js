import _ from 'lodash'

export default {
    props: {
        initialFormData: {
            type: Object,
            default: undefined
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            formData: {}
        }
    },
    computed: {
        hasUnsavedData () {
            const initialData = this.getInitialData
            const currentData = this.getCurrentData
            return !_.isEqual(initialData, currentData) || this.hasAdditionalUnsavedData()
        },
        hasInvalidData () {
            return this.$v.$invalid
        },
        getInitialData () {
            if (this.initialFormData) {
                return this.initialFormData
            } else {
                return this.getDefaultData
            }
        },
        getDefaultData () {
            return {}
        },
        getCurrentData () {
            return this.formData
        },
        hasEntityData () {
            return !!this.initialFormData?.id
        },
        aclEntity () {
            return null
        },
        aclOperation () {
            if (this.hasEntityData) {
                return 'update'
            } else {
                return 'create'
            }
        }
    },
    validations () {
        const validations = this.getValidations()
        const finalValidations = {
            formData: {}
        }
        if (this.aclEntity) {
            Object.keys(validations).forEach((field) => {
                if (this.aclField(field)) {
                    finalValidations.formData[field] = validations[field]
                }
            })
        } else {
            finalValidations.formData = validations
        }
        return finalValidations
    },
    watch: {
        initialFormData: {
            handler () {
                this.setCurrentData(this.getInitialData)
            },
            deep: true,
            immediate: true
        },
        hasUnsavedData (hasUnsavedData) {
            this.$emit('has-unsaved-data', hasUnsavedData)
        },
        hasInvalidData (hasInvalidData) {
            this.$emit('has-invalid-data', hasInvalidData)
        }
    },
    methods: {
        hasAdditionalUnsavedData () {
            return false
        },
        getSubmitData () {
            return this.cloneCurrentData()
        },
        aclField (field) {
            const aclHas = this.$aclColumn(this.aclOperation, this.aclEntity, field)
            if (this.hasEntityData) {
                return aclHas || this.$aclColumn(this.aclOperation, this.aclEntity, field, this.initialFormData, this.user)
            } else {
                return aclHas
            }
        },
        getValidations () {
            return {}
        },
        hasFieldError (field) {
            return !!this.$v.formData[field] && this.$v.formData[field].$error
        },
        getFieldError (field) {
            if (this.$v.formData[field]) {
                return this.$errMsg(this.$v.formData[field])
            }
        },
        validateField (field) {
            if (this.$v.formData[field]) {
                this.$v.formData[field].$touch()
            }
        },
        cloneCurrentData () {
            return _.cloneDeep(this.getCurrentData)
        },
        setCurrentData (newFormData) {
            const initialData = this.getInitialData
            const formData = {}
            Object.keys(initialData).forEach((key) => {
                if (newFormData?.[key] instanceof File) {
                    formData[key] = newFormData?.[key]
                } else {
                    formData[key] = _.cloneDeep(newFormData?.[key])
                }
            })
            this.formData = formData
        },
        normalizeSubmitData (data) {
            const submitData = data
            if (this.initialFormData?.id) {
                submitData.id = this.initialFormData?.id
            }
            if (this.aclEntity) {
                Object.keys(submitData).forEach((field) => {
                    if (!this.aclField(field)) {
                        delete submitData[field]
                    }
                })
            }
            return submitData
        },
        prepareSubmitData (data) {
            return data
        },
        additionalSubmitData () {
            return {}
        },
        postReset () {},
        reset () {
            this.setCurrentData(this.getInitialData)
            this.$v.$reset()
            this.postReset()
        },
        submit () {
            this.$v.$touch()
            if (!this.hasInvalidData || (this.hasEntityData && this.hasUnsavedData && !this.hasInvalidData)) {
                const data = this.prepareSubmitData(this.normalizeSubmitData(this.getSubmitData()))
                this.$emit('submit', data, {
                    ...this.additionalSubmitData()
                })
            }
        }
    }
}
