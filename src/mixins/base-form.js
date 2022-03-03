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
            return !_.isEqual(initialData, currentData)
        },
        hasInvalidData () {
            return this.$v.$invalid
        },
        getInitialData () {
            return this.initialFormData
        },
        getCurrentData () {
            return this.formData
        },
        getSubmitData () {
            return this.cloneCurrentData()
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
    created () {
        this.setCurrentData(this.getInitialData)
    },
    watch: {
        initialFormData (data) {
            this.setCurrentData(this.getInitialData)
        }
    },
    methods: {
        aclField (field) {
            return !!this.aclEntity && this.$aclColumn(this.aclOperation, this.aclEntity, field)
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
                formData[key] = _.cloneDeep(newFormData?.[key])
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
        reset () {
            this.setCurrentData(this.getInitialData)
            this.$v.$reset()
        },
        submit () {
            this.$v.$touch()
            if (!this.hasInvalidData || (this.hasEntityData && this.hasUnsavedData && !this.hasInvalidData)) {
                this.$emit('submit', this.prepareSubmitData(this.normalizeSubmitData(this.getSubmitData)))
            }
        }
    }
}
