<template>
    <aui-base-form
        layout="6"
        dense-list
    >
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <div
            v-if="formData.cfb && formData.cfb.length > 0"
            class="flex-container"
        >
            <div
                v-for="(cfb, index) in formData.cfb"
                :key="index"
            >
                <div class="list-container">
                    <q-list
                        class="rounded-borders"
                    >
                        <aui-base-form-field>
                            <q-toggle
                                v-model="cfb.enabled"
                                :label="$t('Enabled')"
                                :disable="loading"
                            />
                        </aui-base-form-field>
                        <aui-base-form-field>
                            <q-toggle
                                v-model="cfb.use_redirection"
                                :label="$t('Use redirection')"
                                :disable="loading"
                            />
                        </aui-base-form-field>
                        <q-expansion-item
                            v-model="expandedSections.destinationSet"
                            switch-toggle-side
                            expand-separator
                            label="DestinationSet"
                        >
                            <q-card>
                                <q-card-section>
                                    <aui-base-form-field
                                        required
                                    >
                                        <q-select
                                            v-model="cfb.destinationset_id"
                                            dense
                                            :label="$t('Destination')"
                                            :options="destinationSetOptions"
                                            map-options
                                            emit-value
                                            :disable="loading"
                                            :error="v$.$error && v$.formData.cfb.$each.$response.$errors[index].destinationset_id.length > 0"
                                            :error-message="$errMsg(v$.formData.cfb.$each.$response.$errors[index].destinationset_id)"
                                        />
                                    </aui-base-form-field>
                                    <aui-base-form-field
                                        v-if="cfb.destinationset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="cfb.destinationset"
                                            clearable
                                            dense
                                            :disable="loading"
                                            :label="$t('Name')"
                                            :error="v$.$error && v$.formData.cfb.$each.$response.$errors[index].destinationset.length > 0"
                                            :error-message="$errMsg(v$.formData.cfb.$each.$response.$errors[index].destinationset)"
                                            @keyup.enter="submit"
                                        />
                                    </aui-base-form-field>
                                    <br>
                                    <template
                                        v-if="cfb.destinationset_id === 'none' && cfb.destinations && cfb.destinations.length > 0"
                                    >
                                        <q-item
                                            v-for="(destinationItem, destinationIndex) in cfb.destinations"
                                            :key="destinationIndex"
                                            class="green-border"
                                        >
                                            <q-item-section>
                                                <q-select
                                                    v-model="destinationItem.destination"
                                                    dense
                                                    :label="$t('Destination Type')"
                                                    :options="destinationTypeOptions"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-input
                                                    v-if="destinationItem.destination === 'uri'"
                                                    v-model="destinationItem.simple_destination"
                                                    clearable
                                                    dense
                                                    :error="v$.$error && v$.formData.cfb.$each.$response.$errors[index].destinations.length > 0"
                                                    :error-message="$errMsg(v$.formData.cfb.$each.$response.$errors[index].destinations)"
                                                    :disable="loading"
                                                    :label="$t('URI/Number')"
                                                    @keyup.enter="submit"
                                                />
                                                <q-select
                                                    v-if="destinationItem.destination === 'sip:custom-hours@app.local'"
                                                    v-model="destinationItem.announcement_id"
                                                    dense
                                                    :error="false"
                                                    :label="$t('Custom announcement')"
                                                    :options="annoucementId"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                />
                                                <q-input
                                                    v-model="destinationItem.timeout"
                                                    clearable
                                                    dense
                                                    :disable="loading"
                                                    :label="$t('for(seconds)')"
                                                    :error="false"
                                                    @keyup.enter="submit"
                                                />
                                                <q-input
                                                    v-model="destinationItem.priority"
                                                    clearable
                                                    dense
                                                    :disable="loading"
                                                    :label="$t('Priority')"
                                                    :error="false"
                                                    @keyup.enter="submit"
                                                />
                                            </q-item-section>
                                            <q-item-section
                                                side
                                            >
                                                <q-btn
                                                    color="negative"
                                                    unelevated
                                                    dense
                                                    icon="delete"
                                                    size="sm"
                                                    :disable="loading"
                                                    @click="deleteDestinations(index ,destinationIndex)"
                                                />
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                    <q-item
                                        v-if="cfb.destinationset_id === 'none'"
                                        class="no-padding"
                                    >
                                        <q-item-section
                                            class="aui-list-item-section-button"
                                            side
                                        >
                                            <q-btn
                                                :label="$t('Add another destination')"
                                                color="primary"
                                                icon="add"
                                                size="sm"
                                                unelevated
                                                outline
                                                :disable="loading || cfb.destinations.length > 10"
                                                @click="addDestinations(index)"
                                            />
                                        </q-item-section>
                                    </q-item>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                        <q-expansion-item
                            switch-toggle-side
                            expand-separator
                            label="TimeSet"
                        >
                            <q-card>
                                <q-card-section>
                                    <q-select
                                        v-model="cfb.timeset_id"
                                        dense
                                        :label="$t('Time')"
                                        :options="filteredTimeSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                        :error="false"
                                    />
                                    <aui-base-form-field
                                        v-if="cfb.timeset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="cfb.timeset"
                                            clearable
                                            dense
                                            :disable="loading"
                                            :label="$t('Name')"
                                            :error="v$.$error && v$.formData.cfb.$each.$response.$errors[index].timeset.length > 0"
                                            :error-message="$errMsg(v$.formData.cfb.$each.$response.$errors[index].timeset)"
                                            @keyup.enter="submit"
                                        />
                                    </aui-base-form-field>
                                    <br>
                                    <template
                                        v-if="cfb.timeset_id === 'none' && cfb.times && cfb.times.length > 0"
                                    >
                                        <q-item
                                            v-for="(time, id) in cfb.times"
                                            :key="id"
                                            class="green-border"
                                        >
                                            <q-item-section>
                                                <q-select
                                                    v-model="time.startYear"
                                                    dense
                                                    :label="$t('Year')"
                                                    :options="yearValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="time.endYear"
                                                    dense
                                                    :label="$t('Through')"
                                                    :options="yearValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                            </q-item-section>
                                            <q-item-section>
                                                <q-select
                                                    v-model="time.startMonth"
                                                    dense
                                                    :label="$t('Month')"
                                                    :options="monthValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="time.endMonth"
                                                    dense
                                                    :label="$t('Through')"
                                                    :options="monthValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                            </q-item-section>
                                            <q-item-section>
                                                <q-select
                                                    v-model="time.startDay"
                                                    dense
                                                    :label="$t('Day')"
                                                    :options="dayValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="time.endDay"
                                                    dense
                                                    :label="$t('Through')"
                                                    :options="dayValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                            </q-item-section>
                                            <q-item-section>
                                                <q-select
                                                    v-model="time.startWDay"
                                                    dense
                                                    :label="$t('Weekday')"
                                                    :options="weekdayValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="time.endWDay"
                                                    dense
                                                    :label="$t('Through')"
                                                    :options="weekdayValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                            </q-item-section>
                                            <q-item-section>
                                                <q-select
                                                    v-model="time.startHour"
                                                    dense
                                                    :label="$t('Hour')"
                                                    :options="hourValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="time.endHour"
                                                    dense
                                                    :label="$t('Through')"
                                                    :options="hourValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                            </q-item-section>
                                            <q-item-section>
                                                <q-select
                                                    v-model="time.startMinute"
                                                    dense
                                                    :label="$t('Minute')"
                                                    :options="minuteValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="time.endMinute"
                                                    dense
                                                    :label="$t('Through')"
                                                    :options="minuteValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                            </q-item-section>
                                            <q-item-section
                                                side
                                            >
                                                <q-btn
                                                    color="negative"
                                                    unelevated
                                                    dense
                                                    icon="delete"
                                                    size="sm"
                                                    :disable="loading"
                                                    @click="deleteTime(index, id)"
                                                />
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                    <q-item
                                        v-if="cfb.timeset_id === 'none'"
                                        class="no-padding"
                                    >
                                        <q-item-section
                                            class="aui-list-item-section-button"
                                            side
                                        >
                                            <q-btn
                                                :label="$t('Add another period')"
                                                color="primary"
                                                icon="add"
                                                size="sm"
                                                unelevated
                                                outline
                                                :disable="loading || cfb.times.length > 10"
                                                @click="addTimes(index)"
                                            />
                                        </q-item-section>
                                    </q-item>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                        <q-expansion-item
                            switch-toggle-side
                            expand-separator
                            label="SourceSet"
                        >
                            <q-card>
                                <q-card-section>
                                    <q-select
                                        v-model="cfb.sourceset_id"
                                        dense
                                        :label="$t('Source')"
                                        :options="filteredSourceSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                        :error="false"
                                    />
                                    <aui-base-form-field
                                        v-if="cfb.sourceset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="cfb.sourceset"
                                            clearable
                                            dense
                                            :disable="loading"
                                            :label="$t('Name')"
                                            :error="v$.$error && v$.formData.cfb.$each.$response.$errors[index].sourceset.length > 0"
                                            :error-message="$errMsg(v$.formData.cfb.$each.$response.$errors[index].sourceset)"
                                            @keyup.enter="submit"
                                        />
                                    </aui-base-form-field>
                                    <br>
                                    <q-select
                                        v-if="cfb.sourceset_id === 'none'"
                                        v-model="cfb.mode_sourceset"
                                        dense
                                        :error="false"
                                        :label="$t('Mode')"
                                        :options="modeSourceSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                    />
                                    <q-toggle
                                        v-if="cfb.sourceset_id === 'none'"
                                        v-model="cfb.is_regex_sourceset"
                                        :label="$t('is regex')"
                                        :disable="loading"
                                    />
                                    <template
                                        v-if="cfb.sourceset_id === 'none' && cfb.sources.length > 0 && cfb.sources"
                                    >
                                        <q-item
                                            v-for="(source, sourceid) in cfb.sources"
                                            :key="sourceid"
                                            class="green-border"
                                        >
                                            <q-item-section>
                                                <q-input
                                                    v-model="source.source"
                                                    clearable
                                                    dense
                                                    :disable="loading"
                                                    :label="$t('Source')"
                                                    :error="false"
                                                    @keyup.enter="submit"
                                                />
                                            </q-item-section>
                                            <q-item-section
                                                side
                                            >
                                                <q-btn
                                                    color="negative"
                                                    unelevated
                                                    dense
                                                    icon="delete"
                                                    size="sm"
                                                    :disable="loading"
                                                    @click="deleteSources(index, sourceid)"
                                                />
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                    <q-item
                                        v-if="cfb.sourceset_id === 'none'"
                                        class="no-padding"
                                    >
                                        <q-item-section
                                            class="aui-list-item-section-button"
                                            side
                                        >
                                            <q-btn
                                                :label="$t('Add another source')"
                                                color="primary"
                                                icon="add"
                                                size="sm"
                                                unelevated
                                                outline
                                                :disable="loading || cfb.sources.length > 10"
                                                @click="addSources(index)"
                                            />
                                        </q-item-section>
                                    </q-item>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                        <q-expansion-item
                            switch-toggle-side
                            expand-separator
                            label="B-NumberSet"
                        >
                            <q-card>
                                <q-card-section>
                                    <q-select
                                        v-model="cfb.bnumberset_id"
                                        dense
                                        :label="$t('B-Number')"
                                        :options="filteredBNumberSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                        :error="false"
                                    />
                                    <aui-base-form-field
                                        v-if="cfb.bnumberset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="cfb.bnumberset"
                                            clearable
                                            dense
                                            :disable="loading"
                                            :label="$t('Name')"
                                            :error="v$.$error && v$.formData.cfb.$each.$response.$errors[index].bnumberset.length > 0"
                                            :error-message="$errMsg(v$.formData.cfb.$each.$response.$errors[index].bnumberset)"
                                            @keyup.enter="submit"
                                        />
                                    </aui-base-form-field>
                                    <br>
                                    <q-select
                                        v-if="cfb.bnumberset_id === 'none'"
                                        v-model="cfb.mode_bnumberset"
                                        dense
                                        :error="false"
                                        :label="$t('Mode')"
                                        :options="modeSourceSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                    />
                                    <q-toggle
                                        v-if="cfb.bnumberset_id === 'none'"
                                        v-model="cfb.is_regex_bnumberset"
                                        :label="$t('is regex')"
                                        :disable="loading"
                                    />
                                    <template
                                        v-if="cfb.bnumberset_id === 'none' && cfb.bnumbers.length > 0 && cfb.bnumbers"
                                    >
                                        <q-item
                                            v-for="(number, numberid) in cfb.bnumbers"
                                            :key="numberid"
                                            class="green-border"
                                        >
                                            <q-item-section>
                                                <q-input
                                                    v-model="number.bnumber"
                                                    clearable
                                                    dense
                                                    :disable="loading"
                                                    :label="$t('B-Number')"
                                                    :error="false"
                                                    @keyup.enter="submit"
                                                />
                                            </q-item-section>
                                            <q-item-section
                                                side
                                            >
                                                <q-btn
                                                    color="negative"
                                                    unelevated
                                                    dense
                                                    icon="delete"
                                                    size="sm"
                                                    :disable="loading"
                                                    @click="deleteBNumbers(index, numberid)"
                                                />
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                    <q-item
                                        v-if="cfb.bnumberset_id === 'none'"
                                        class="no-padding"
                                    >
                                        <q-item-section
                                            class="aui-list-item-section-button"
                                            side
                                        >
                                            <q-btn
                                                :label="$t('Add another B-Number')"
                                                color="primary"
                                                icon="add"
                                                size="sm"
                                                unelevated
                                                outline
                                                :disable="loading || cfb.bnumbers.length > 10"
                                                @click="addBNumbers(index)"
                                            />
                                        </q-item-section>
                                    </q-item>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                    </q-list>
                    <q-item>
                        <q-item-section
                            side
                        >
                            <q-btn
                                color="negative"
                                unelevated
                                dense
                                icon="delete"
                                size="sm"
                                :disable="loading"
                                @click="deleteCFB(index)"
                            />
                        </q-item-section>
                    </q-item>
                </div>
            </div>
            <q-btn
                :label="$t('Add Destination/time/BNumber/Source sets')"
                color="primary"
                icon="add"
                size="sm"
                unelevated
                outline
                :disable="loading"
                @click="addCFB"
            />
        </div>
    </aui-base-form>
</template>
<script>
import { mapGetters } from 'vuex'
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import { WAIT_PAGE } from 'src/constants'
import { mapWaitingActions } from 'vue-wait'
import {
    required,
    helpers,
    requiredIf
} from '@vuelidate/validators'
export default {
    name: 'AuiNewCallForwardingBusy',
    components: { AuiBaseFormField, AuiBaseForm },
    mixins: [baseFormMixin],
    props: {
        initialFormData: {
            type: Object,
            default: null
        },
        subscriberId: {
            type: Number,
            default: null
        },
        primaryNumberObject: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            expandedSections: {
                destinationSet: false
            }
        }
    },
    validations () {
        return {
            formData: {
                cfb: {
                    $each: helpers.forEach({
                        destinationset_id: {
                            required
                        },
                        destinationset: {
                            required: requiredIf(function () {
                                return this.formData.cfb.some(cfb => cfb.destinationset_id === 'none')
                            })
                        },
                        timeset: {
                            required: requiredIf(function () {
                                return this.formData.cfb.some(cfb => cfb.timeset_id === 'none')
                            })
                        },
                        sourceset: {
                            required: requiredIf(function () {
                                return this.formData.cfb.some(cfb => cfb.sourceset_id === 'none')
                            })
                        },
                        bnumberset: {
                            required: requiredIf(function () {
                                return this.formData.cfb.some(cfb => cfb.bnumberset_id === 'none')
                            })
                        },
                        destinations: {
                            $each: helpers.forEach({
                                simple_destination: {
                                    required: requiredIf(function () {
                                        return this.formData.cfb.some(cfb => cfb.destinations.some(dest => dest.destination === 'uri'))
                                    })
                                }
                            })
                        }
                    })
                }
            }
        }
    },
    computed: {
        ...mapGetters('subscribers', [
            'annoucementId',
            'defaultDestinationTypes',
            'filteredBNumberSet',
            'destinationSetOptions',
            'filteredMappings',
            'filteredSourceSet',
            'filteredTimeSet',
            'modeSourceSet',
            'yearValue',
            'monthValue',
            'dayValue',
            'weekdayValue',
            'hourValue',
            'minuteValue'
        ]),
        getDefaultCfb () {
            return {
                destinationset_id: null,
                destinationset: null,
                destinations: [{
                    destination: 'uri',
                    announcement_id: null,
                    simple_destination: '',
                    timeout: '300',
                    priority: 1
                }],
                bnumberset_id: null,
                bnumberset: null,
                mode_bnumberset: 'whitelist',
                is_regex_bnumberset: false,
                bnumbers: [
                    {
                        bnumber: ''
                    }
                ],
                enabled: true,
                use_redirection: false,
                timeset_id: null,
                timeset: null,
                times: [{
                    startYear: '',
                    endYear: '',
                    startMonth: '',
                    endMonth: '',
                    startDay: '',
                    endDay: '',
                    startWDay: '',
                    endWDay: '',
                    startHour: '',
                    endHour: '',
                    startMinute: '',
                    endMinute: ''
                }],
                sourceset_id: null,
                sourceset: null,
                mode_sourceset: 'whitelist',
                is_regex_sourceset: false,
                sources: [
                    {
                        source: ''
                    }
                ]
            }
        },
        getInitialData () {
            const newCfb = []
            if (this.initialFormData?.cfb?.length > 0) {
                for (let item = 0; item < this.initialFormData.cfb.length; item++) {
                    newCfb.push({
                        ...this.getDefaultCfb,
                        destinationset_id: this.initialFormData.cfb[item].destinationset_id,
                        bnumberset_id: this.initialFormData.cfb[item].bnumberset_id,
                        enabled: this.initialFormData.cfb[item].enabled,
                        use_redirection: this.initialFormData.cfb[item].use_redirection,
                        timeset_id: this.initialFormData.cfb[item].timeset_id,
                        sourceset_id: this.initialFormData.cfb[item].sourceset_id,
                        bnumber: {
                            name: this.initialFormData.cfb[item].bnumberset,
                            mode: 'whitelist',
                            is_regex: false
                        }
                    })
                }
            }

            return {
                cfu: this.initialFormData?.cfu || [],
                cfna: this.initialFormData?.cfna || [],
                cfo: this.initialFormData?.cfo || [],
                cfr: this.initialFormData?.cfr || [],
                cfs: this.initialFormData?.cfs || [],
                cft: this.initialFormData?.cft || [],
                cft_ringtimeout: null,
                cfb: newCfb.length === 0 ? [this.getDefaultCfb] : newCfb,
                subscriber_id: this.subscriberId
            }
        },
        destinationTypeOptions () {
            const primaryNumber = `${this.primaryNumberObject.cc}${this.primaryNumberObject.ac}${this.primaryNumberObject.sn}`
            const voicemail = { label: 'Voicemail', value: `sip:vmu${primaryNumber}@voicebox.local` }
            const conference = { label: 'Conference', value: `sip:conf=${primaryNumber}@conference.local` }
            const fax2Mail = { label: 'Fax2Mail', value: `sip:fax=${primaryNumber}@fax2mail.local` }
            const managerSecretary = { label: 'Manager Secretary', value: `sip:${primaryNumber}@managersecretary.local` }

            return [...this.defaultDestinationTypes, voicemail, conference, fax2Mail, managerSecretary]
        }
    },
    mounted () {
        this.loadDestinationSet(this.subscriberId)
        this.loadTimeSet(this.subscriberId)
        this.loadSourceSet(this.subscriberId)
        this.loadBNumberSet(this.subscriberId)
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            loadDestinationSet: WAIT_PAGE,
            loadTimeSet: WAIT_PAGE,
            loadSourceSet: WAIT_PAGE,
            loadBNumberSet: WAIT_PAGE
        }),
        addCFB () {
            this.formData.cfb.push(this.getDefaultCfb)
        },
        deleteBNumbers (index, id) {
            this.formData.cfb[index].bnumbers.splice(id, 1)
        },
        addDestinations (index) {
            this.formData.cfb[index].destinations.push({
                destination: 'uri',
                announcement_id: null,
                simple_destination: '',
                timeout: '300',
                priority: 1
            })
        },
        deleteDestinations (index, destinationIndex) {
            this.formData.cfb[index].destinations.splice(destinationIndex, 1)
        },
        addTimes (index) {
            this.formData.cfb[index].times.push({
                startYear: '',
                endYear: '',
                startMonth: '',
                endMonth: '',
                startDay: '',
                endDay: '',
                startWDay: '',
                endWDay: '',
                startHour: '',
                endHour: '',
                startMinute: '',
                endMinute: ''
            })
        },
        deleteTime (index, id) {
            this.formData.cfb[index].times.splice(id, 1)
        },
        addSources (index) {
            this.formData.cfb[index].sources.push({
                source: ''
            })
        },
        deleteSources (index, sourceId) {
            this.formData.cfb[index].sources.splice(sourceId, 1)
        },
        addBNumbers (index) {
            this.formData.cfb[index].bnumbers.push({
                bnumber: ''
            })
        },
        deleteCFB (index) {
            this.formData.cfb.splice(index, 1)
        },
        checkAndExpandSections () {
            if (this.formData.cfb.some(cfb => cfb.destinationset_id === null)) {
                this.expandedSections.destinationSet = true
            }
        },
        submit () {
            this.v$.$touch()
            if (this.hasInvalidData) {
                this.expandedSections.destinationSet = true

                // this is true when it has not been picked a destination
                if (this.formData.cfb.some(cfb => cfb.destinationset_id === null)) {
                    return
                }

                // this is true when we selected a Destination from the list
                if (this.formData.cfb.some(cfb => cfb.destinationset_id !== 'none')) {
                    return this.$emit('submit', this.getSubmitData())
                }

                // this is to temporarily overcome an issue with the simple_destination validations (each + requiredIf)
                const uriDestinations = this.formData.cfb.some(set => set.destinations.some((dest) => dest.destination === 'uri'))
                const uriFieldIsNotEmpty = this.formData.cfb.some(cfb => cfb.destinations.some(dest => dest.simple_destination !== null || dest.simple_destination !== ''))
                if (uriDestinations && uriFieldIsNotEmpty) {
                    return this.$emit('submit', this.getSubmitData())
                }
            }
            if (!this.hasInvalidData) {
                this.$emit('submit', this.getSubmitData())
            }
        }
    }
}
</script>
<style>
.green-border {
    border: 1px solid green;
    padding: 2%;
    margin: 1%;
    border-radius: 7px;
}
.list-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.q-list {
    flex-grow: 1;
    margin-top: 2%
}
</style>
