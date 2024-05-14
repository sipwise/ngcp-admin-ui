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
        <aui-base-form-field
            class="resizeField"
            required
        >
            <q-input
                v-model.trim="formData.cft_ringtimeout"
                clearable
                dense
                :disable="loading"
                :label="$t('After ring timeout')"
                :error="hasFieldError('cft_ringtimeout')"
                :error-message="getFieldError('cft_ringtimeout')"
                @keyup.enter="submit"
            />
        </aui-base-form-field>
        <div
            v-if="formData.cft && formData.cft.length > 0"
            class="flex-container"
        >
            <div
                v-for="(cft, index) in formData.cft"
                :key="index"
            >
                <div class="list-container">
                    <q-list
                        class="rounded-borders"
                    >
                        <aui-base-form-field>
                            <q-toggle
                                v-model="formData.cft[index].enabled"
                                :label="$t('Enabled')"
                                :disable="loading"
                            />
                        </aui-base-form-field>
                        <aui-base-form-field>
                            <q-toggle
                                v-model="formData.cft[index].use_redirection"
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
                                            v-model="formData.cft[index].destinationset_id"
                                            dense
                                            :label="$t('Destination')"
                                            :options="filteredDestinationSet"
                                            map-options
                                            emit-value
                                            :disable="loading"
                                            :error="v$.$error && v$.formData.cft.$each.$response.$errors[index].destinationset_id.length > 0"
                                            :error-message="$errMsg(v$.formData.cft.$each.$response.$errors[index].destinationset_id)"
                                        />
                                    </aui-base-form-field>
                                    <aui-base-form-field
                                        v-if="formData.cft[index].destinationset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="formData.cft[index].destinationset"
                                            clearable
                                            dense
                                            :disable="loading"
                                            :label="$t('Name')"
                                            :error="v$.$error && v$.formData.cft.$each.$response.$errors[index].destinationset.length > 0"
                                            :error-message="$errMsg(v$.formData.cft.$each.$response.$errors[index].destinationset)"
                                            @keyup.enter="submit"
                                        />
                                    </aui-base-form-field>
                                    <br>
                                    <template
                                        v-if="formData.cft[index].destinationset_id === 'none' && formData.cft[index].destinations && formData.cft[index].destinations.length > 0"
                                    >
                                        <q-item
                                            v-for="(destination, destinationIndex) in formData.cft[index].destinations"
                                            :key="destinationIndex"
                                            class="green-border"
                                        >
                                            <q-item-section>
                                                <q-select
                                                    v-model="formData.cft[index].destinations[destinationIndex].destination"
                                                    dense
                                                    :label="$t('Destination Type')"
                                                    :options="destinationSet"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-input
                                                    v-if="formData.cft[index].destinations[destinationIndex].destination === 'uri'"
                                                    v-model="formData.cft[index].destinations[destinationIndex].simple_destination"
                                                    clearable
                                                    dense
                                                    :error="v$.$error && v$.formData.cft.$each.$response.$errors[index].destinations.length > 0"
                                                    :error-message="$errMsg(v$.formData.cft.$each.$response.$errors[index].destinations)"
                                                    :disable="loading"
                                                    :label="$t('URI/Number')"
                                                    @keyup.enter="submit"
                                                />
                                                <q-select
                                                    v-if="formData.cft[index].destinations[destinationIndex].destination === 'sip:custom-hours@app.local'"
                                                    v-model="formData.cft[index].destinations[destinationIndex].announcement_id"
                                                    dense
                                                    :error="false"
                                                    :label="$t('Custom announcement')"
                                                    :options="annoucementId"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                />
                                                <q-input
                                                    v-model="formData.cft[index].destinations[destinationIndex].timeout"
                                                    clearable
                                                    dense
                                                    :disable="loading"
                                                    :label="$t('for(seconds)')"
                                                    :error="false"
                                                    @keyup.enter="submit"
                                                />
                                                <q-input
                                                    v-model="formData.cft[index].destinations[destinationIndex].priority"
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
                                        v-if="formData.cft[index].destinationset_id === 'none'"
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
                                                :disable="loading || formData.cft[index].destinations.length > 10"
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
                                        v-model="formData.cft[index].timeset_id"
                                        dense
                                        :label="$t('Time')"
                                        :options="filteredTimeSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                        :error="false"
                                    />
                                    <aui-base-form-field
                                        v-if="formData.cft[index].timeset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="formData.cft[index].timeset"
                                            clearable
                                            dense
                                            :disable="loading"
                                            :label="$t('Name')"
                                            :error="v$.$error && v$.formData.cft.$each.$response.$errors[index].timeset.length > 0"
                                            :error-message="$errMsg(v$.formData.cft.$each.$response.$errors[index].timeset)"
                                            @keyup.enter="submit"
                                        />
                                    </aui-base-form-field>
                                    <br>
                                    <template
                                        v-if="formData.cft[index].timeset_id === 'none' && formData.cft[index].times && formData.cft[index].times.length > 0"
                                    >
                                        <q-item
                                            v-for="(time, id) in formData.cft[index].times"
                                            :key="id"
                                            class="green-border"
                                        >
                                            <q-item-section>
                                                <q-select
                                                    v-model="formData.cft[index].times[id].startYear"
                                                    dense
                                                    :label="$t('Year')"
                                                    :options="yearValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="formData.cft[index].times[id].endYear"
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
                                                    v-model="formData.cft[index].times[id].startMonth"
                                                    dense
                                                    :label="$t('Month')"
                                                    :options="monthValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="formData.cft[index].times[id].endMonth"
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
                                                    v-model="formData.cft[index].times[id].startDay"
                                                    dense
                                                    :label="$t('Day')"
                                                    :options="dayValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="formData.cft[index].times[id].endDay"
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
                                                    v-model="formData.cft[index].times[id].startWDay"
                                                    dense
                                                    :label="$t('Weekday')"
                                                    :options="weekdayValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="formData.cft[index].times[id].endWDay"
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
                                                    v-model="formData.cft[index].times[id].startHour"
                                                    dense
                                                    :label="$t('Hour')"
                                                    :options="hourValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="formData.cft[index].times[id].endHour"
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
                                                    v-model="formData.cft[index].times[id].startMinute"
                                                    dense
                                                    :label="$t('Minute')"
                                                    :options="minuteValue"
                                                    map-options
                                                    emit-value
                                                    :disable="loading"
                                                    :error="false"
                                                />
                                                <q-select
                                                    v-model="formData.cft[index].times[id].endMinute"
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
                                        v-if="formData.cft[index].timeset_id === 'none'"
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
                                                :disable="loading || formData.cft[index].times.length > 10"
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
                                        v-model="formData.cft[index].sourceset_id"
                                        dense
                                        :label="$t('Source')"
                                        :options="filteredSourceSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                        :error="false"
                                    />
                                    <aui-base-form-field
                                        v-if="formData.cft[index].sourceset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="formData.cft[index].sourceset"
                                            clearable
                                            dense
                                            :disable="loading"
                                            :label="$t('Name')"
                                            :error="v$.$error && v$.formData.cft.$each.$response.$errors[index].sourceset.length > 0"
                                            :error-message="$errMsg(v$.formData.cft.$each.$response.$errors[index].sourceset)"
                                            @keyup.enter="submit"
                                        />
                                    </aui-base-form-field>
                                    <br>
                                    <q-select
                                        v-if="formData.cft[index].sourceset_id === 'none'"
                                        v-model="formData.cft[index].mode_sourceset"
                                        dense
                                        :error="false"
                                        :label="$t('Mode')"
                                        :options="modeSourceSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                    />
                                    <q-toggle
                                        v-if="formData.cft[index].sourceset_id === 'none'"
                                        v-model="formData.cft[index].is_regex_sourceset"
                                        :label="$t('is regex')"
                                        :disable="loading"
                                    />
                                    <template
                                        v-if="formData.cft[index].sourceset_id === 'none' && formData.cft[index].sources.length > 0 && formData.cft[index].sources"
                                    >
                                        <q-item
                                            v-for="(source, sourceid) in formData.cft[index].sources"
                                            :key="sourceid"
                                            class="green-border"
                                        >
                                            <q-item-section>
                                                <q-input
                                                    v-model="formData.cft[index].sources[sourceid].source"
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
                                        v-if="formData.cft[index].sourceset_id === 'none'"
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
                                                :disable="loading || formData.cft[index].sources.length > 10"
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
                                        v-model="formData.cft[index].bnumberset_id"
                                        dense
                                        :label="$t('B-Number')"
                                        :options="filteredBNumberSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                        :error="false"
                                    />
                                    <aui-base-form-field
                                        v-if="formData.cft[index].bnumberset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="formData.cft[index].bnumberset"
                                            clearable
                                            dense
                                            :disable="loading"
                                            :label="$t('Name')"
                                            :error="v$.$error && v$.formData.cft.$each.$response.$errors[index].bnumberset.length > 0"
                                            :error-message="$errMsg(v$.formData.cft.$each.$response.$errors[index].bnumberset)"
                                            @keyup.enter="submit"
                                        />
                                    </aui-base-form-field>
                                    <q-select
                                        v-if="formData.cft[index].bnumberset_id === 'none'"
                                        v-model="formData.cft[index].mode_bnumberset"
                                        dense
                                        :error="false"
                                        :label="$t('Mode')"
                                        :options="modeSourceSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                    />
                                    <q-toggle
                                        v-if="formData.cft[index].bnumberset_id === 'none'"
                                        v-model="formData.cft[index].is_regex_bnumberset"
                                        :label="$t('is regex')"
                                        :disable="loading"
                                    />
                                    <template
                                        v-if="formData.cft[index].bnumberset_id === 'none' && formData.cft[index].bnumbers.length > 0 && formData.cft[index].bnumbers"
                                    >
                                        <q-item
                                            v-for="(number, numberid) in formData.cft[index].bnumbers"
                                            :key="numberid"
                                            class="green-border"
                                        >
                                            <q-item-section>
                                                <q-input
                                                    v-model="formData.cft[index].bnumbers[numberid].bnumber"
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
                                        v-if="formData.cft[index].bnumberset_id === 'none'"
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
                                                :disable="loading || formData.cft[index].bnumbers.length > 10"
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
                                @click="deleteCFT(index)"
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
                @click="addCFT"
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
    name: 'AuiNewCallForwardingTimeout',
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
            },
            cft: [{
                destinations: []
            }
            ]
        }
    },
    validations () {
        return {
            formData: {
                cft: {
                    $each: helpers.forEach({
                        destinationset_id: {
                            required
                        },
                        destinationset: {
                            required: requiredIf(function () {
                                return this.formData.cft.some(cft => cft.destinationset_id === 'none')
                            })
                        },
                        timeset: {
                            required: requiredIf(function () {
                                return this.formData.cft.some(cft => cft.timeset_id === 'none')
                            })
                        },
                        sourceset: {
                            required: requiredIf(function () {
                                return this.formData.cft.some(cft => cft.sourceset_id === 'none')
                            })
                        },
                        bnumberset: {
                            required: requiredIf(function () {
                                return this.formData.cft.some(cft => cft.bnumberset_id === 'none')
                            })
                        },
                        destinations: {
                            $each: helpers.forEach({
                                simple_destination: {
                                    required: requiredIf(function () {
                                        return this.formData.cft.some(cft => cft.destinations.some(dest => dest.destination === 'uri'))
                                    })
                                }
                            })
                        }
                    })
                },
                cft_ringtimeout: {
                    required
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
            const newcft = []
            if (this.initialFormData && this.initialFormData.cft.length > 0) {
                for (let list = 0; list < this.initialFormData.cft.length; list++) {
                    newcft.push({
                        destinationset_id: this.initialFormData.cft[list].destinationset_id,
                        destinationset: null,
                        destinations: [{
                            destination: 'uri',
                            announcement_id: null,
                            simple_destination: '',
                            timeout: '300',
                            priority: 1
                        }],
                        bnumberset_id: this.initialFormData.cft[list].bnumberset_id,
                        bnumberset: null,
                        mode_bnumberset: 'whitelist',
                        is_regex_bnumberset: false,
                        bnumbers: [
                            {
                                bnumber: ''
                            }
                        ],
                        enabled: this.initialFormData.cft[list].enabled,
                        use_redirection: this.initialFormData.cft[list].use_redirection,
                        timeset_id: this.initialFormData.cft[list].timeset_id,
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
                        sourceset_id: this.initialFormData.cft[list].sourceset_id,
                        sourceset: null,
                        mode_sourceset: 'whitelist',
                        is_regex_sourceset: false,
                        sources: [
                            {
                                source: ''
                            }
                        ],
                        bnumber: {
                            name: this.initialFormData.cft[list].bnumberset,
                            mode: 'whitelist',
                            is_regex: false
                        }
                    })
                }
                return {
                    cft: newcft,
                    cfu: this.initialFormData.cfu,
                    cfna: this.initialFormData.cfna,
                    cfo: this.initialFormData.cfo,
                    cfr: this.initialFormData.cfr,
                    cfs: this.initialFormData.cfs,
                    cfb: this.initialFormData.cfb,
                    cft_ringtimeout: this.initialFormData.cft_ringtimeout,
                    subscriber_id: this.subscriberId
                }
            } else {
                return {
                    cfu: this.initialFormData?.cfu,
                    cfna: this.initialFormData?.cfna,
                    cfo: this.initialFormData?.cfo,
                    cfr: this.initialFormData?.cfr,
                    cfs: this.initialFormData?.cfs,
                    cfb: this.initialFormData?.cfb,
                    cft_ringtimeout: 15,
                    cft: [
                        {
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
        addCFT () {
            this.formData.cft.push({
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
            })
        },
        deleteBNumbers (index, id) {
            this.formData.cft[index].bnumbers.splice(id, 1)
        },
        addDestinations (index) {
            this.formData.cft[index].destinations.push({
                destination: '',
                announcement_id: null,
                simple_destination: '',
                timeout: '300',
                priority: 1
            })
        },
        deleteDestinations (index, destinationIndex) {
            this.formData.cft[index].destinations.splice(destinationIndex, 1)
        },
        addTimes (index) {
            this.formData.cft[index].times.push({
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
            this.formData.cft[index].times.splice(id, 1)
        },
        addSources (index) {
            this.formData.cft[index].sources.push({
                source: ''
            })
        },
        deleteSources (index, sourceId) {
            this.formData.cft[index].sources.splice(sourceId, 1)
        },
        addBNumbers (index) {
            this.formData.cft[index].bnumbers.push({
                bnumber: ''
            })
        },
        deleteCFT (index) {
            this.formData.cft.splice(index, 1)
        },
        checkAndExpandSections () {
            if (this.formData.cft.some(cft => cft.destinationset_id === null)) {
                this.expandedSections.destinationSet = true
            }
        },
        checkDestinations () {
            if (this.formData.cft.some(cft => cft.destinationset_id !== null) && this.formData.cft.some(cft => cft.destinationset_id !== 'none')) {
                const data = this.prepareSubmitData(this.normalizeSubmitData(this.getSubmitData()))
                this.$emit('submit', data, {
                    ...this.additionalSubmitData()
                })
            }
        },
        checksimpleDestination () {
            if (this.formData.cft.some(cft => cft.destinations.some(dest => dest.destination === 'uri')) && this.formData.cft.some(cft => cft.destinations.some(dest => dest.simple_destination !== null))) {
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
.resizeField {
    width: 50%
}
</style>
