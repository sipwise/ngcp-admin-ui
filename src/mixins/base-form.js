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
        }
    },
    validations () {
        return {
            formData: {}
        }
    },
    created () {
        this.setCurrentData(this.getInitialData)
    },
    watch: {
        initialFormData (data) {
            this.setCurrentData(data)
        }
    },
    methods: {
        cloneCurrentData () {
            return _.cloneDeep(this.getCurrentData)
        },
        setCurrentData (formData) {
            this.formData = _.cloneDeep(formData)
        },
        normalizeSubmitData (data) {
            const submitData = data
            if (this.initialFormData?.id) {
                submitData.id = this.initialFormData?.id
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
            if (!this.hasInvalidData && this.hasUnsavedData) {
                this.$emit('submit', this.prepareSubmitData(this.normalizeSubmitData(this.getSubmitData)))
            }
        }
    }
}
