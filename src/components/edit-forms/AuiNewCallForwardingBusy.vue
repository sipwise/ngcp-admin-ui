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
            v-if="formData?.cfb && formData.cfb?.length > 0"
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
                                data-cy="aui-cfbusy-enable"
                                :disable="loading"
                            />
                        </aui-base-form-field>
                        <aui-base-form-field>
                            <q-toggle
                                v-model="cfb.use_redirection"
                                :label="$t('Use redirection')"
                                data-cy="aui-cfbusy-redirect"
                                :disable="loading"
                            />
                        </aui-base-form-field>
                        <q-expansion-item
                            v-model="expandedSections.destinationSet"
                            switch-toggle-side
                            expand-separator
                            label="DestinationSet"
                            data-cy="aui-cfbusy-destinationset"
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
                                            data-cy="aui-cfbusy-destinationset-destination"
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
                                            data-cy="aui-cfbusy-destination-name"
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
                                                    data-cy="aui-cfbusy-destination-type"
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
                                                    data-cy="aui-cfbusy-destination-number"
                                                    @keyup.enter="submit"
                                                />
                                                <q-select
                                                    v-if="destinationItem.destination === 'sip:custom-hours@app.local'"
                                                    v-model="destinationItem.announcement_id"
                                                    dense
                                                    :error="false"
                                                    :label="$t('Custom announcement')"
                                                    data-cy="aui-cfbusy-destination-custom-announcement"
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
                                                    data-cy="aui-cfbusy-destination-duration"
                                                    :error="false"
                                                    @keyup.enter="submit"
                                                />
                                                <q-input
                                                    v-model="destinationItem.priority"
                                                    clearable
                                                    dense
                                                    :disable="loading"
                                                    :label="$t('Priority')"
                                                    data-cy="aui-cfbusy-destination-priority"
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
                                                    data-cy="aui-cfbusy-destination-delete"
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
                                                data-cy="aui-cfbusy-destination-add"
                                                color="primary"
                                                icon="add"
                                                size="sm"
                                                unelevated
                                                outline
                                                :disable="loading || cfb.destinations?.length > 10"
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
                            data-cy="aui-cfbusy-timeset"
                        >
                            <q-card>
                                <q-card-section>
                                    <q-select
                                        v-model="cfb.timeset_id"
                                        dense
                                        :label="$t('Time')"
                                        data-cy="aui-cfbusy-timeset-time"
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
                                            data-cy="aui-cfbusy-timeset-name"
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
                                                    data-cy="aui-cfbusy-timeset-year"
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
                                                    data-cy="aui-cfbusy-timeset-year-through"
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
                                                    data-cy="aui-cfbusy-timeset-month"
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
                                                    data-cy="aui-cfbusy-timeset-month-through"
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
                                                    data-cy="aui-cfbusy-timeset-day"
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
                                                    data-cy="aui-cfbusy-timeset-day-through"
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
                                                    data-cy="aui-cfbusy-timeset-weekday"
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
                                                    data-cy="aui-cfbusy-timeset-weekday-through"
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
                                                    data-cy="aui-cfbusy-timeset-hour"
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
                                                    data-cy="aui-cfbusy-timeset-hour-through"
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
                                                    data-cy="aui-cfbusy-timeset-minute"
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
                                                    data-cy="aui-cfbusy-timeset-minute-through"
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
                                                    data-cy="aui-cfbusy-timeset-delete"
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
                                                data-cy="aui-cfbusy-timeset-add-period"
                                                color="primary"
                                                icon="add"
                                                size="sm"
                                                unelevated
                                                outline
                                                :disable="loading || cfb.times?.length > 10"
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
                            data-cy="aui-cfbusy-sourceset"
                        >
                            <q-card>
                                <q-card-section>
                                    <q-select
                                        v-model="cfb.sourceset_id"
                                        dense
                                        :label="$t('Source')"
                                        data-cy="aui-cfbusy-sourceset-source"
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
                                            data-cy="aui-cfbusy-source-name"
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
                                        data-cy="aui-cfbusy-sourceset-mode"
                                        :options="modeSourceSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                    />
                                    <q-toggle
                                        v-if="cfb.sourceset_id === 'none'"
                                        v-model="cfb.is_regex_sourceset"
                                        :label="$t('is regex')"
                                        data-cy="aui-cfbusy-sourceset-isregex"
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
                                                    data-cy="aui-cfbusy-source"
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
                                                    data-cy="aui-cfbusy-source-delete"
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
                                                data-cy="aui-cfbusy-source-add"
                                                color="primary"
                                                icon="add"
                                                size="sm"
                                                unelevated
                                                outline
                                                :disable="loading || cfb.sources?.length > 10"
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
                            data-cy="aui-cfbusy-bnumberset"
                        >
                            <q-card>
                                <q-card-section>
                                    <q-select
                                        v-model="cfb.bnumberset_id"
                                        dense
                                        :label="$t('B-Number')"
                                        data-cy="aui-cfbusy-bnumber"
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
                                            data-cy="aui-cfbusy-bnumber-name"
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
                                        data-cy="aui-cfbusy-bnumberset-mode"
                                        :options="modeSourceSet"
                                        map-options
                                        emit-value
                                        :disable="loading"
                                    />
                                    <q-toggle
                                        v-if="cfb.bnumberset_id === 'none'"
                                        v-model="cfb.is_regex_bnumberset"
                                        :label="$t('is regex')"
                                        data-cy="aui-cfbusy-bnumberset-isregex"
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
                                                    data-cy="aui-cfbusy-bnumberset-bnumber"
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
                                                    data-cy="aui-cfbusy-bnumberset-bnumber-delete"
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
                                                data-cy="aui-cfbusy-bnumberset-add-bnumber"
                                                color="primary"
                                                icon="add"
                                                size="sm"
                                                unelevated
                                                outline
                                                :disable="loading || cfb.bnumbers?.length > 10"
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
                                data-cy="aui-cfbusy-delete"
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
                data-cy="aui-cfbusy-addnew-set"
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
                                return this.formData?.cfb.some(cfb => cfb.destinationset_id === 'none')
                            })
                        },
                        timeset: {
                            required: requiredIf(function () {
                                return this.formData?.cfb.some(cfb => cfb.timeset_id === 'none')
                            })
                        },
                        sourceset: {
                            required: requiredIf(function () {
                                return this.formData?.cfb.some(cfb => cfb.sourceset_id === 'none')
                            })
                        },
                        bnumberset: {
                            required: requiredIf(function () {
                                return this.formData?.cfb.some(cfb => cfb.bnumberset_id === 'none')
                            })
                        },
                        destinations: {
                            $each: helpers.forEach({
                                simple_destination: {
                                    required: requiredIf(function () {
                                        return this.formData?.cfb.some(cfb => cfb.destinations.some(dest => dest.destination === 'uri'))
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
            const newCfb = this.initialFormData?.cfb?.map((item) => {
                return {
                    ...this.getDefaultCfb,
                    destinationset_id: item.destinationset_id,
                    bnumberset_id: item.bnumberset_id,
                    enabled: item.enabled,
                    use_redirection: item.use_redirection,
                    timeset_id: item.timeset_id,
                    sourceset_id: item.sourceset_id,
                    bnumber: {
                        name: item.bnumberset,
                        mode: 'whitelist',
                        is_regex: false
                    }
                }
            })

            return {
                cfu: this.initialFormData?.cfu || [],
                cfna: this.initialFormData?.cfna || [],
                cfo: this.initialFormData?.cfo || [],
                cfr: this.initialFormData?.cfr || [],
                cfs: this.initialFormData?.cfs || [],
                cft: this.initialFormData?.cft || [],
                cft_ringtimeout: null,
                cfb: newCfb?.length === 0 ? [this.getDefaultCfb] : newCfb,
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
            this.formData?.cfb.push(this.getDefaultCfb)
        },
        deleteBNumbers (index, id) {
            this.formData?.cfb[index].bnumbers.splice(id, 1)
        },
        addDestinations (index) {
            this.formData?.cfb[index].destinations.push({
                destination: 'uri',
                announcement_id: null,
                simple_destination: '',
                timeout: '300',
                priority: 1
            })
        },
        deleteDestinations (index, destinationIndex) {
            this.formData?.cfb[index].destinations.splice(destinationIndex, 1)
        },
        addTimes (index) {
            this.formData?.cfb[index].times.push({
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
            this.formData?.cfb[index].times.splice(id, 1)
        },
        addSources (index) {
            this.formData?.cfb[index].sources.push({
                source: ''
            })
        },
        deleteSources (index, sourceId) {
            this.formData?.cfb[index].sources.splice(sourceId, 1)
        },
        addBNumbers (index) {
            this.formData?.cfb[index].bnumbers.push({
                bnumber: ''
            })
        },
        deleteCFB (index) {
            this.formData?.cfb.splice(index, 1)
        },
        checkAndExpandSections () {
            if (this.formData?.cfb?.some(cfb => cfb.destinationset_id === null)) {
                this.expandedSections.destinationSet = true
            }
        },
        submit () {
            this.v$.$touch()
            if (this.hasInvalidData) {
                this.expandedSections.destinationSet = true

                // this is true when it has not been picked a destination
                if (this.formData?.cfb.some(cfb => cfb.destinationset_id === null)) {
                    return
                }

                // this is true when we selected a Destination from the list
                if (this.formData?.cfb.some(cfb => cfb.destinationset_id !== 'none')) {
                    return this.$emit('submit', this.getSubmitData())
                }

                // this is to temporarily overcome an issue with the simple_destination validations (each + requiredIf)
                const uriDestinations = this.formData?.cfb.some(set => set.destinations.some((dest) => dest.destination === 'uri'))
                const uriFieldIsNotEmpty = this.formData?.cfb.some(cfb => cfb.destinations.some(dest => dest.simple_destination !== null || dest.simple_destination !== ''))
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
