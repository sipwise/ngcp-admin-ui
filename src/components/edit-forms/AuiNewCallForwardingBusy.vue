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
                                v-model="formData.cfb[index].enabled"
                                :label="$t('Enabled')"
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
                                            v-model="formData.cfb[index].destinationset_id"
                                            dense
                                            :label="$t('Destination')"
                                            :options="filteredDestinationSet"
                                            map-options
                                            emit-value
                                            :disable="loading"
                                            :error="v$.$error && v$.formData.cfb.$each.$response.$errors[index].destinationset_id.length > 0"
                                            :error-message="$errMsg(v$.formData.cfb.$each.$response.$errors[index].destinationset_id)"
                                        />
                                    </aui-base-form-field>
                                    <aui-base-form-field
                                        v-if="formData.cfb[index].destinationset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="formData.cfb[index].destinationset"
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
                                        v-if="formData.cfb[index].destinationset_id === 'none' && formData.cfb[index].destinations && formData.cfb[index].destinations.length > 0"
                                    >
                                        <q-item
                                            v-for="(destination, destinationIndex) in formData.cfb[index].destinations"
                                            :key="destinationIndex"
                                            class="green-border"
                                        >
                                            <q-item-section>
                                                <q-select
                                                    v-model="formData.cfb[index].destinations[destinationIndex].destination"
                                                    dense
                                                    :label="$t('Destination Type')"
                                                    :options="destinationSet"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-input
                                                    v-if="formData.cfb[index].destinations[destinationIndex].destination === 'uri'"
                                                    v-model="formData.cfb[index].destinations[destinationIndex].simple_destination"
                                                    clearable
                                                    dense
                                                    :error="v$.$error && v$.formData.cfb.$each.$response.$errors[index].destinations.length > 0"
                                                    :error-message="$errMsg(v$.formData.cfb.$each.$response.$errors[index].destinations)"
                                                    :disable="loading"
                                                    :label="$t('URI/Number')"
                                                    @keyup.enter="submit"
                                                />
                                                <q-select
                                                    v-if="formData.cfb[index].destinations[destinationIndex].destination === 'sip:custom-hours@app.local'"
                                                    v-model="formData.cfb[index].destinations[destinationIndex].announcement_id"
                                                    dense
                                                    :error="false"
                                                    :label="$t('Custom announcement')"
                                                    :options="annoucementId"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                />
                                                <q-input
                                                    v-model="formData.cfb[index].destinations[destinationIndex].priority"
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
                                        v-if="formData.cfb[index].destinationset_id === 'none'"
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
                                                :disable="loading || formData.cfb[index].destinations.length > 10"
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
                                        v-model="formData.cfb[index].timeset_id"
                                        dense
                                        :label="$t('Time')"
                                        :options="filteredTimeSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                        :error="false"
                                    />
                                    <aui-base-form-field
                                        v-if="formData.cfb[index].timeset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="formData.cfb[index].timeset"
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
                                        v-if="formData.cfb[index].timeset_id === 'none' && formData.cfb[index].times && formData.cfb[index].times.length > 0"
                                    >
                                        <q-item
                                            v-for="(time, id) in formData.cfb[index].times"
                                            :key="id"
                                            class="green-border"
                                        >
                                            <q-item-section>
                                                <q-select
                                                    v-model="formData.cfb[index].times[id].startYear"
                                                    dense
                                                    :label="$t('Year')"
                                                    :options="yearValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="formData.cfb[index].times[id].endYear"
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
                                                    v-model="formData.cfb[index].times[id].startMonth"
                                                    dense
                                                    :label="$t('Month')"
                                                    :options="monthValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="formData.cfb[index].times[id].endMonth"
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
                                                    v-model="formData.cfb[index].times[id].startDay"
                                                    dense
                                                    :label="$t('Day')"
                                                    :options="dayValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="formData.cfb[index].times[id].endDay"
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
                                                    v-model="formData.cfb[index].times[id].startWDay"
                                                    dense
                                                    :label="$t('Weekday')"
                                                    :options="weekdayValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="formData.cfb[index].times[id].endWDay"
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
                                                    v-model="formData.cfb[index].times[id].startHour"
                                                    dense
                                                    :label="$t('Hour')"
                                                    :options="hourValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="formData.cfb[index].times[id].endHour"
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
                                                    v-model="formData.cfb[index].times[id].startMinute"
                                                    dense
                                                    :label="$t('Minute')"
                                                    :options="minuteValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="formData.cfb[index].times[id].endMinute"
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
                                        v-if="formData.cfb[index].timeset_id === 'none'"
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
                                                :disable="loading || formData.cfb[index].times.length > 10"
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
                                        v-model="formData.cfb[index].sourceset_id"
                                        dense
                                        :label="$t('Source')"
                                        :options="filteredSourceSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                        :error="false"
                                    />
                                    <aui-base-form-field
                                        v-if="formData.cfb[index].sourceset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="formData.cfb[index].sourceset"
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
                                        v-if="formData.cfb[index].sourceset_id === 'none'"
                                        v-model="formData.cfb[index].mode_sourceset"
                                        dense
                                        :error="false"
                                        :label="$t('Mode')"
                                        :options="modeSourceSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                    />
                                    <q-toggle
                                        v-if="formData.cfb[index].sourceset_id === 'none'"
                                        v-model="formData.cfb[index].is_regex_sourceset"
                                        :label="$t('is regex')"
                                        :disable="loading"
                                    />
                                    <template
                                        v-if="formData.cfb[index].sourceset_id === 'none' && formData.cfb[index].sources.length > 0 && formData.cfb[index].sources"
                                    >
                                        <q-item
                                            v-for="(source, sourceid) in formData.cfb[index].sources"
                                            :key="sourceid"
                                            class="green-border"
                                        >
                                            <q-item-section>
                                                <q-input
                                                    v-model="formData.cfb[index].sources[sourceid].source"
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
                                        v-if="formData.cfb[index].sourceset_id === 'none'"
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
                                                :disable="loading || formData.cfb[index].sources.length > 10"
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
                                        v-model="formData.cfb[index].bnumberset_id"
                                        dense
                                        :label="$t('B-Number')"
                                        :options="filteredBNumberSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                        :error="false"
                                    />
                                    <aui-base-form-field
                                        v-if="formData.cfb[index].bnumberset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="formData.cfb[index].bnumberset"
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
                                        v-if="formData.cfb[index].bnumberset_id === 'none'"
                                        v-model="formData.cfb[index].mode_bnumberset"
                                        dense
                                        :error="false"
                                        :label="$t('Mode')"
                                        :options="modeSourceSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                    />
                                    <q-toggle
                                        v-if="formData.cfb[index].bnumberset_id === 'none'"
                                        v-model="formData.cfb[index].is_regex_bnumberset"
                                        :label="$t('is regex')"
                                        :disable="loading"
                                    />
                                    <template
                                        v-if="formData.cfb[index].bnumberset_id === 'none' && formData.cfb[index].bnumbers.length > 0 && formData.cfb[index].bnumbers"
                                    >
                                        <q-item
                                            v-for="(number, numberid) in formData.cfb[index].bnumbers"
                                            :key="numberid"
                                            class="green-border"
                                        >
                                            <q-item-section>
                                                <q-input
                                                    v-model="formData.cfb[index].bnumbers[numberid].bnumber"
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
                                        v-if="formData.cfb[index].bnumberset_id === 'none'"
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
                                                :disable="loading || formData.cfb[index].bnumbers.length > 10"
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
import {
    mapGetters
} from 'vuex'
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
            'filteredDestinationSet',
            'filteredTimeSet',
            'modeSourceSet',
            'filteredSourceSet',
            'annoucementId',
            'filteredBNumberSet',
            'filteredmappings',
            'yearValue',
            'monthValue',
            'dayValue',
            'weekdayValue',
            'hourValue',
            'minuteValue'
        ]),
        destinationSet () {
            const destinations = [
                { label: 'Voicemail', value: 'sip:vmu380542000008@voicebox.local' },
                { label: 'Conference', value: 'sip:conf=380542000008@conference.local' },
                { label: 'Fax2Mail', value: 'sip:fax=380542000008@fax2mail.local' },
                { label: 'Calling Card', value: 'sip:callingcard@app.local' },
                { label: 'Call Through', value: 'sip:callthrough@app.local' },
                { label: 'Custom Announcement', value: 'sip:custom-hours@app.local' },
                { label: 'Local Subscriber', value: 'sip:localuser@app.local' },
                { label: 'Manager Secretary', value: 'sip:380542000008@managersecretary.local' },
                { label: 'URI/Number', value: 'uri' }
            ]
            return destinations
        },
        getInitialData () {
            const newcfb = []
            if (this.initialFormData && this.initialFormData.cfb.length > 0) {
                for (let list = 0; list < this.initialFormData.cfb.length; list++) {
                    newcfb.push({
                        destinationset_id: this.initialFormData.cfb[list].destinationset_id,
                        destinationset: null,
                        destinations: [{
                            destination: 'uri',
                            announcement_id: null,
                            simple_destination: '',
                            priority: 1
                        }],
                        bnumberset_id: this.initialFormData.cfb[list].bnumberset_id,
                        bnumberset: null,
                        mode_bnumberset: 'whitelist',
                        is_regex_bnumberset: false,
                        bnumbers: [
                            {
                                bnumber: ''
                            }
                        ],
                        enabled: this.initialFormData.cfb[list].enabled,
                        timeset_id: this.initialFormData.cfb[list].timeset_id,
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
                        sourceset_id: this.initialFormData.cfb[list].sourceset_id,
                        sourceset: null,
                        mode_sourceset: 'whitelist',
                        is_regex_sourceset: false,
                        sources: [
                            {
                                source: ''
                            }
                        ],
                        bnumber: {
                            name: this.initialFormData.cfb[list].bnumberset,
                            mode: 'whitelist',
                            is_regex: false
                        }
                    })
                }
                return {
                    cfb: newcfb,
                    cfu: this.initialFormData.cfu,
                    cfna: this.initialFormData.cfna,
                    cfo: this.initialFormData.cfo,
                    cfr: this.initialFormData.cfr,
                    cfs: this.initialFormData.cfs,
                    cft: this.initialFormData.cft,
                    cft_ringtimeout: null,
                    subscriber_id: this.subscriberId
                }
            } else {
                return {
                    cfu: this.initialFormData?.cfu,
                    cfna: this.initialFormData?.cfna,
                    cfo: this.initialFormData?.cfo,
                    cfr: this.initialFormData?.cfr,
                    cfs: this.initialFormData?.cfs,
                    cft: this.initialFormData?.cft,
                    cft_ringtimeout: null,
                    cfb: [
                        {
                            destinationset_id: null,
                            destinationset: null,
                            destinations: [{
                                destination: 'uri',
                                announcement_id: null,
                                simple_destination: '',
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
                    ],
                    subscriber_id: this.subscriberId
                }
            }
        }
    },
    async mounted () {
        await this.loadDestinationSet(this.subscriberId)
        await this.loadTimeSet(this.subscriberId)
        await this.loadSourceSet(this.subscriberId)
        await this.loadBNumberSet(this.subscriberId)
    },
    methods: {
        ...mapWaitingActions('subscribers', {
            loadDestinationSet: WAIT_PAGE,
            loadTimeSet: WAIT_PAGE,
            loadSourceSet: WAIT_PAGE,
            loadBNumberSet: WAIT_PAGE
        }),
        addCFB () {
            this.formData.cfb.push({
                destinationset_id: null,
                destinationset: null,
                destinations: [{
                    destination: 'uri',
                    announcement_id: null,
                    simple_destination: '',
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
            })
        },
        deleteBNumbers (index, id) {
            this.formData.cfb[index].bnumbers.splice(id, 1)
        },
        addDestinations (index) {
            this.formData.cfb[index].destinations.push({
                destination: 'uri',
                announcement_id: null,
                simple_destination: '',
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
        checkDestinations () {
            if (this.formData.cfb.some(cfb => cfb.destinationset_id !== null) && this.formData.cfb.some(cfb => cfb.destinationset_id !== 'none')) {
                const data = this.prepareSubmitData(this.normalizeSubmitData(this.getSubmitData()))
                this.$emit('submit', data, {
                    ...this.additionalSubmitData()
                })
            }
        },
        checksimpleDestination () {
            if (this.formData.cfb.some(cfb => cfb.destinations.some(dest => dest.destination === 'uri')) && this.formData.cfb.some(cfb => cfb.destinations.some(dest => dest.simple_destination !== null))) {
                const data = this.prepareSubmitData(this.normalizeSubmitData(this.getSubmitData()))
                this.$emit('submit', data, {
                    ...this.additionalSubmitData()
                })
            }
        },
        submit () {
            this.v$.$touch()
            if (this.hasInvalidData) {
                this.checkAndExpandSections()
                this.checkDestinations()
                this.checksimpleDestination()
            }
            if (!this.hasInvalidData) {
                const data = this.prepareSubmitData(this.normalizeSubmitData(this.getSubmitData()))
                this.$emit('submit', data, {
                    ...this.additionalSubmitData()
                })
            } else {
                console.log('Validation errors, review required fields')
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
