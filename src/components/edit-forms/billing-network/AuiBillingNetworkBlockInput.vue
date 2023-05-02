<template>
    <div
        class="row q-col-gutter-sm no-wrap"
    >
        <div
            class="col-grow"
        >
            <q-input
                :model-value="ip"
                :dense="$attrs.dense"
                :clearable="$attrs.clearable"
                :label="$t('Ip')"
                class="aui-required"
                data-cy="billingnetworks-ip"
                :disable="$attrs.loading"
                :error="errorIp"
                :error-message="errorMessageIp"
                @update:model-value="$emit('update:ip', $event)"
            >
                <q-tooltip>
                    {{ $t('(Base) IP Address') }}
                </q-tooltip>
            </q-input>
        </div>
        <div
            class="col-auto self-center text-h6"
        >
            /
        </div>
        <div
            class="col-4"
        >
            <q-input
                :model-value="mask"
                :dense="$attrs.dense"
                :clearable="$attrs.clearable"
                :label="$t('Subnet prefix length')"
                data-cy="billingnetworks-mask"
                :disable="$attrs.loading"
                :error="errorMask"
                :error-message="errorMessageMask"
                @update:model-value="$emit('update:mask', $event)"
            >
                <q-tooltip>
                    {{ $t('Optional Subnet Prefix Length') }}
                </q-tooltip>
            </q-input>
        </div>
        <div
            class="col-auto self-center"
        >
            <slot
                name="append"
            />
        </div>
        <slot
            name="after"
        />
    </div>
</template>

<script>
export default {
    props: {
        ip: {
            type: String,
            default: undefined
        },
        mask: {
            type: [String, Number],
            default: undefined
        },
        errorIp: {
            type: Boolean,
            default: false
        },
        errorMessageIp: {
            type: String,
            default: undefined
        },
        errorMask: {
            type: Boolean,
            default: false
        },
        errorMessageMask: {
            type: String,
            default: undefined
        }
    },
    emits: ['update:ip', 'update:mask']
}
</script>
