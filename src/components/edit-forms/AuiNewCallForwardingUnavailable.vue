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
            v-if="formData.cfna && formData.cfna.length > 0"
            class="flex-container"
        >
            <div
                v-for="(cfna, index) in formData.cfna"
                :key="index"
            >
                <div class="list-container">
                    <q-list
                        class="rounded-borders"
                    >
                        <aui-base-form-field>
                            <q-toggle
                                v-model="cfna.enabled"
                                :label="$t('Enabled')"
                                data-cy="aui-cfunavailable-enable"
                                :disable="loading"
                            />
                        </aui-base-form-field>
                        <aui-base-form-field>
                            <q-toggle
                                v-model="cfna.use_redirection"
                                :label="$t('Use redirection')"
                                data-cy="aui-cfunavailable-redirect"
                                :disable="loading"
                            />
                        </aui-base-form-field>
                        <q-expansion-item
                            v-model="expandedSections.destinationSet"
                            switch-toggle-side
                            expand-separator
                            label="DestinationSet"
                            data-cy="aui-cfunavailable-destinationset"
                        >
                            <q-card>
                                <q-card-section>
                                    <aui-base-form-field
                                        required
                                    >
                                        <q-select
                                            v-model="cfna.destinationset_id"
                                            dense
                                            :label="$t('Destination')"
                                            data-cy="aui-cfunavailable-destinationset-destination"
                                            :options="destinationSetOptions"
                                            map-options
                                            emit-value
                                            :disable="loading"
                                            :error="v$.$error && v$.formData.cfna.$each.$response.$errors[index].destinationset_id.length > 0"
                                            :error-message="$errMsg(v$.formData.cfna.$each.$response.$errors[index].destinationset_id)"
                                        />
                                    </aui-base-form-field>
                                    <aui-base-form-field
                                        v-if="cfna.destinationset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="cfna.destinationset"
                                            clearable
                                            dense
                                            :disable="loading"
                                            :label="$t('Name')"
                                            data-cy="aui-cfunavailable-destination-name"
                                            :error="v$.$error && v$.formData.cfna.$each.$response.$errors[index].destinationset.length > 0"
                                            :error-message="$errMsg(v$.formData.cfna.$each.$response.$errors[index].destinationset)"
                                            @keyup.enter="submit"
                                        />
                                    </aui-base-form-field>
                                    <br>
                                    <template
                                        v-if="cfna.destinationset_id === 'none' && cfna.destinations && cfna.destinations.length > 0"
                                    >
                                        <q-item
                                            v-for="(destinationItem, destinationIndex) in cfna.destinations"
                                            :key="destinationIndex"
                                            class="green-border"
                                        >
                                            <q-item-section>
                                                <q-select
                                                    v-model="destinationItem.destination"
                                                    dense
                                                    :label="$t('Destination Type')"
                                                    data-cy="aui-cfunavailable-destination-type"
                                                    :options="destinationSet"
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
                                                    :error="v$.$error && v$.formData.cfna.$each.$response.$errors[index].destinations.length > 0"
                                                    :error-message="$errMsg(v$.formData.cfna.$each.$response.$errors[index].destinations)"
                                                    :disable="loading"
                                                    :label="$t('URI/Number')"
                                                    data-cy="aui-cfunavailable-destination-number"
                                                    @keyup.enter="submit"
                                                />
                                                <q-select
                                                    v-if="destinationItem.destination === 'sip:custom-hours@app.local'"
                                                    v-model="destinationItem.announcement_id"
                                                    dense
                                                    :error="false"
                                                    :label="$t('Custom announcement')"
                                                    data-cy="aui-cfunavailable-destination-custom-announcement"
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
                                                    data-cy="aui-cfunavailable-destination-duration"
                                                    :error="false"
                                                    @keyup.enter="submit"
                                                />
                                                <q-input
                                                    v-model="destinationItem.priority"
                                                    clearable
                                                    dense
                                                    :disable="loading"
                                                    :label="$t('Priority')"
                                                    data-cy="aui-cfunavailable-destination-priority"
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
                                                    data-cy="aui-cfunavailable-destination-delete"
                                                    size="sm"
                                                    :disable="loading"
                                                    @click="deleteDestinations(index ,destinationIndex)"
                                                />
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                    <q-item
                                        v-if="cfna.destinationset_id === 'none'"
                                        class="no-padding"
                                    >
                                        <q-item-section
                                            class="aui-list-item-section-button"
                                            side
                                        >
                                            <q-btn
                                                :label="$t('Add another destination')"
                                                data-cy="aui-cfunavailable-destination-add"
                                                color="primary"
                                                icon="add"
                                                size="sm"
                                                unelevated
                                                outline
                                                :disable="loading || cfna.destinations.length > 10"
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
                            data-cy="aui-cfunavailable-timeset"
                        >
                            <q-card>
                                <q-card-section>
                                    <q-select
                                        v-model="cfna.timeset_id"
                                        dense
                                        :label="$t('Time')"
                                        data-cy="aui-cfunavailable-timeset-time"
                                        :options="filteredTimeSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                        :error="false"
                                    />
                                    <aui-base-form-field
                                        v-if="cfna.timeset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="cfna.timeset"
                                            clearable
                                            dense
                                            :disable="loading"
                                            :label="$t('Name')"
                                            data-cy="aui-cfunavailable-timeset-name"
                                            :error="v$.$error && v$.formData.cfna.$each.$response.$errors[index].timeset.length > 0"
                                            :error-message="$errMsg(v$.formData.cfna.$each.$response.$errors[index].timeset)"
                                            @keyup.enter="submit"
                                        />
                                    </aui-base-form-field>
                                    <br>
                                    <template
                                        v-if="cfna.timeset_id === 'none' && cfna.times && cfna.times.length > 0"
                                    >
                                        <q-item
                                            v-for="(time, id) in cfna.times"
                                            :key="id"
                                            class="green-border"
                                        >
                                            <q-item-section>
                                                <q-select
                                                    v-model="time.startYear"
                                                    dense
                                                    :label="$t('Year')"
                                                    data-cy="aui-cfunavailable-timeset-year"
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
                                                    data-cy="aui-cfunavailable-timeset-year-through"
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
                                                    data-cy="aui-cfunavailable-timeset-month"
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
                                                    data-cy="aui-cfunavailable-timeset-month-through"
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
                                                    data-cy="aui-cfunavailable-timeset-day"
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
                                                    data-cy="aui-cfunavailable-timeset-day-through"
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
                                                    data-cy="aui-cfunavailable-timeset-weekday"
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
                                                    data-cy="aui-cfunavailable-timeset-weekday-through"
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
                                                    data-cy="aui-cfunavailable-timeset-hour"
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
                                                    data-cy="aui-cfunavailable-timeset-hour-through"
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
                                                    data-cy="aui-cfunavailable-timeset-minute"
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
                                                    data-cy="aui-cfunavailable-timeset-minute-through"
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
                                                    data-cy="aui-cfunavailable-timeset-delete"
                                                    size="sm"
                                                    :disable="loading"
                                                    @click="deleteTime(index, id)"
                                                />
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                    <q-item
                                        v-if="cfna.timeset_id === 'none'"
                                        class="no-padding"
                                    >
                                        <q-item-section
                                            class="aui-list-item-section-button"
                                            side
                                        >
                                            <q-btn
                                                :label="$t('Add another period')"
                                                data-cy="aui-cfunavailable-timeset-add-period"
                                                color="primary"
                                                icon="add"
                                                size="sm"
                                                unelevated
                                                outline
                                                :disable="loading || cfna.times.length > 10"
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
                            data-cy="aui-cfunavailable-sourceset"
                        >
                            <q-card>
                                <q-card-section>
                                    <q-select
                                        v-model="cfna.sourceset_id"
                                        dense
                                        :label="$t('Source')"
                                        data-cy="aui-cfunavailable-sourceset-source"
                                        :options="filteredSourceSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                        :error="false"
                                    />
                                    <aui-base-form-field
                                        v-if="cfna.sourceset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="cfna.sourceset"
                                            clearable
                                            dense
                                            :disable="loading"
                                            :label="$t('Name')"
                                            data-cy="aui-cfunavailable-source-name"
                                            :error="v$.$error && v$.formData.cfna.$each.$response.$errors[index].sourceset.length > 0"
                                            :error-message="$errMsg(v$.formData.cfna.$each.$response.$errors[index].sourceset)"
                                            @keyup.enter="submit"
                                        />
                                    </aui-base-form-field>
                                    <br>
                                    <q-select
                                        v-if="cfna.sourceset_id === 'none'"
                                        v-model="cfna.mode_sourceset"
                                        dense
                                        :error="false"
                                        :label="$t('Mode')"
                                        data-cy="aui-cfunavailable-sourceset-mode"
                                        :options="modeSourceSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                    />
                                    <q-toggle
                                        v-if="cfna.sourceset_id === 'none'"
                                        v-model="cfna.is_regex_sourceset"
                                        :label="$t('is regex')"
                                        data-cy="aui-cfunavailable-sourceset-isregex"
                                        :disable="loading"
                                    />
                                    <template
                                        v-if="cfna.sourceset_id === 'none' && cfna.sources.length > 0 && cfna.sources"
                                    >
                                        <q-item
                                            v-for="(source, sourceid) in cfna.sources"
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
                                                    data-cy="aui-cfunavailable-source"
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
                                                    data-cy="aui-cfunavailable-source-delete"
                                                    size="sm"
                                                    :disable="loading"
                                                    @click="deleteSources(index, sourceid)"
                                                />
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                    <q-item
                                        v-if="cfna.sourceset_id === 'none'"
                                        class="no-padding"
                                    >
                                        <q-item-section
                                            class="aui-list-item-section-button"
                                            side
                                        >
                                            <q-btn
                                                :label="$t('Add another source')"
                                                data-cy="aui-cfunavailable-source-add"
                                                color="primary"
                                                icon="add"
                                                size="sm"
                                                unelevated
                                                outline
                                                :disable="loading || cfna.sources.length > 10"
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
                            data-cy="aui-cfunavailable-bnumberset"
                        >
                            <q-card>
                                <q-card-section>
                                    <q-select
                                        v-model="cfna.bnumberset_id"
                                        dense
                                        :label="$t('B-Number')"
                                        data-cy="aui-cfunavailable-bnumber"
                                        :options="filteredBNumberSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                        :error="false"
                                    />
                                    <aui-base-form-field
                                        v-if="cfna.bnumberset_id === 'none'"
                                        required
                                    >
                                        <q-input
                                            v-model.trim="cfna.bnumberset"
                                            clearable
                                            dense
                                            :disable="loading"
                                            :label="$t('Name')"
                                            data-cy="aui-cfunavailable-bnumber-name"
                                            :error="v$.$error && v$.formData.cfna.$each.$response.$errors[index].bnumberset.length > 0"
                                            :error-message="$errMsg(v$.formData.cfna.$each.$response.$errors[index].bnumberset)"
                                            @keyup.enter="submit"
                                        />
                                    </aui-base-form-field>
                                    <br>
                                    <q-select
                                        v-if="cfna.bnumberset_id === 'none'"
                                        v-model="cfna.mode_bnumberset"
                                        dense
                                        :error="false"
                                        :label="$t('Mode')"
                                        data-cy="aui-cfunavailable-bnumberset-mode"
                                        :options="modeSourceSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                    />
                                    <q-toggle
                                        v-if="cfna.bnumberset_id === 'none'"
                                        v-model="cfna.is_regex_bnumberset"
                                        :label="$t('is regex')"
                                        data-cy="aui-cfunavailable-bnumberset-isregex"
                                        :disable="loading"
                                    />
                                    <template
                                        v-if="cfna.bnumberset_id === 'none' && cfna.bnumbers.length > 0 && cfna.bnumbers"
                                    >
                                        <q-item
                                            v-for="(number, numberid) in cfna.bnumbers"
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
                                                    data-cy="aui-cfunavailable-bnumberset-bnumber"
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
                                                    data-cy="aui-cfunavailable-bnumberset-bnumber-delete"
                                                    size="sm"
                                                    :disable="loading"
                                                    @click="deleteBNumbers(index, numberid)"
                                                />
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                    <q-item
                                        v-if="cfna.bnumberset_id === 'none'"
                                        class="no-padding"
                                    >
                                        <q-item-section
                                            class="aui-list-item-section-button"
                                            side
                                        >
                                            <q-btn
                                                :label="$t('Add another B-Number')"
                                                data-cy="aui-cfunavailable-bnumberset-add-bnumber"
                                                color="primary"
                                                icon="add"
                                                size="sm"
                                                unelevated
                                                outline
                                                :disable="loading || cfna.bnumbers.length > 10"
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
                                data-cy="aui-cfunavailable-bnumberset-delete"
                                size="sm"
                                :disable="loading"
                                @click="deleteCFNA(index)"
                            />
                        </q-item-section>
                    </q-item>
                </div>
            </div>
            <q-btn
                :label="$t('Add Destination/time/BNumber/Source sets')"
                data-cy="aui-cfunavailable-addnew-set"
                color="primary"
                icon="add"
                size="sm"
                unelevated
                outline
                :disable="loading"
                @click="addCFNA"
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
    name: 'AuiNewCallForwardingUnavailable',
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
                cfna: {
                    $each: helpers.forEach({
                        destinationset_id: {
                            required
                        },
                        destinationset: {
                            required: requiredIf(function () {
                                return this.formData.cfna.some(cfna => cfna.destinationset_id === 'none')
                            })
                        },
                        timeset: {
                            required: requiredIf(function () {
                                return this.formData.cfna.some(cfna => cfna.timeset_id === 'none')
                            })
                        },
                        sourceset: {
                            required: requiredIf(function () {
                                return this.formData.cfna.some(cfna => cfna.sourceset_id === 'none')
                            })
                        },
                        bnumberset: {
                            required: requiredIf(function () {
                                return this.formData.cfna.some(cfna => cfna.bnumberset_id === 'none')
                            })
                        },
                        destinations: {
                            $each: helpers.forEach({
                                simple_destination: {
                                    required: requiredIf(function () {
                                        return this.formData.cfna.some(cfna => cfna.destinations.some(dest => dest.destination === 'uri'))
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
        getDefaultCfna () {
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
            const newCfna = []
            if (this.initialFormData && this.initialFormData.cfna.length > 0) {
                for (let list = 0; list < this.initialFormData.cfna.length; list++) {
                    newCfna.push({
                        ...this.getDefaultCfna,
                        destinationset_id: this.initialFormData.cfna[list].destinationset_id,
                        bnumberset_id: this.initialFormData.cfna[list].bnumberset_id,
                        enabled: this.initialFormData.cfna[list].enabled,
                        use_redirection: this.initialFormData.cfna[list].use_redirection,
                        timeset_id: this.initialFormData.cfna[list].timeset_id,
                        sourceset_id: this.initialFormData.cfna[list].sourceset_id,
                        bnumber: {
                            name: this.initialFormData.cfna[list].bnumberset,
                            mode: 'whitelist',
                            is_regex: false
                        }
                    })
                }
            }

            return {
                cfb: this.initialFormData?.cfb || [],
                cfu: this.initialFormData?.cfu || [],
                cfo: this.initialFormData?.cfo || [],
                cfr: this.initialFormData?.cfr || [],
                cfs: this.initialFormData?.cfs || [],
                cft: this.initialFormData?.cft || [],
                cft_ringtimeout: null,
                cfna: newCfna.length === 0 ? [this.getDefaultCfna] : newCfna,
                subscriber_id: this.subscriberId
            }
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
        addCFNA () {
            this.formData.cfna.push(this.getDefaultCfna)
        },
        deleteBNumbers (index, id) {
            this.formData.cfna[index].bnumbers.splice(id, 1)
        },
        addDestinations (index) {
            this.formData.cfna[index].destinations.push({
                destination: 'uri',
                announcement_id: null,
                simple_destination: '',
                timeout: '300',
                priority: 1
            })
        },
        deleteDestinations (index, destinationIndex) {
            this.formData.cfna[index].destinations.splice(destinationIndex, 1)
        },
        addTimes (index) {
            this.formData.cfna[index].times.push({
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
            this.formData.cfna[index].times.splice(id, 1)
        },
        addSources (index) {
            this.formData.cfna[index].sources.push({
                source: ''
            })
        },
        deleteSources (index, sourceId) {
            this.formData.cfna[index].sources.splice(sourceId, 1)
        },
        addBNumbers (index) {
            this.formData.cfna[index].bnumbers.push({
                bnumber: ''
            })
        },
        deleteCFNA (index) {
            this.formData.cfna.splice(index, 1)
        },
        checkAndExpandSections () {
            if (this.formData.cfna.some(cfna => cfna.destinationset_id === null)) {
                this.expandedSections.destinationSet = true
            }
        },
        checkDestinations () {
            if (this.formData.cfna.some(cfna => cfna.destinationset_id !== null) && this.formData.cfna.some(cfna => cfna.destinationset_id !== 'none')) {
                const data = this.prepareSubmitData(this.normalizeSubmitData(this.getSubmitData()))
                this.$emit('submit', data, {
                    ...this.additionalSubmitData()
                })
            }
        },
        checkSimpleDestination () {
            if (this.formData.cfna.some(cfna => cfna.destinations.some(dest => dest.destination === 'uri')) && this.formData.cfna.some(cfna => cfna.destinations.some(dest => dest.simple_destination !== null))) {
                const data = this.prepareSubmitData(this.normalizeSubmitData(this.getSubmitData()))
                this.$emit('submit', data, {
                    ...this.additionalSubmitData()
                })
            }
        },
        submit () {
            this.v$.$touch()
            if (this.hasInvalidData) {
                this.expandedSections.destinationSet = true

                // this is true when it has not been picked a destination
                if (this.formData.cfna.some(cfna => cfna.destinationset_id === null)) {
                    return
                }

                // this is true when we selected a Destination from the list
                if (this.formData.cfna.some(cfna => cfna.destinationset_id !== 'none')) {
                    return this.$emit('submit', this.getSubmitData())
                }

                // this is to temporarily overcome an issue with the simple_destination validations (each + requiredIf)
                const uriDestinations = this.formData.cfna.some(set => set.destinations.some((dest) => dest.destination === 'uri'))
                const uriFieldIsNotEmpty = this.formData.cfna.some(cfna => cfna.destinations.some(dest => dest.simple_destination !== null || dest.simple_destination !== ''))
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
