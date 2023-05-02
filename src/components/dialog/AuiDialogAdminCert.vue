<template>
    <base-dialog
        ref="dialog"
        title-icon="fas fa-file-contract"
        :title="$t('API Certificate management ({name})', { name: admin.login })"
        :loading="$wait.is('aui-administrator-certificate')"
        v-bind="$attrs"
    >
        <template #content>
            <q-list>
                <q-item>
                    <q-item-section>
                        <q-item-label
                            header
                        >
                            {{ $t('Create a new or revoke the API Certificate') }}
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <entity-list-menu-item
                    v-if="!adminCertHasCert"
                    :auto-close="0"
                    color="primary"
                    icon="add"
                    :label="$t('Create Certificate')"
                    data-cy="create-certificate"
                    @click="createAdminCertificate(admin)"
                />
                <entity-list-menu-item
                    v-else
                    :auto-close="0"
                    color="negative"
                    icon="fas fa-minus-circle"
                    :label="$t('Revoke Certificate')"
                    data-cy="revoke-certificate"
                    @click="revokeAdminCertificate(admin)"
                />
                <entity-list-menu-item
                    color="primary"
                    :auto-close="0"
                    icon="fas fa-download"
                    :label="$t('Download CA Certificate')"
                    data-cy="download-certificate"
                    @click="downloadCACertificate(admin)"
                />
            </q-list>
        </template>
    </base-dialog>
</template>

<script>
import BaseDialog from 'components/dialog/BaseDialog'
import EntityListMenuItem from 'components/EntityListMenuItem'
import {
    mapState
} from 'vuex'
import {
    mapWaitingActions
} from 'vue-wait'
export default {
    name: 'AuiDialogAdminCert',
    components: { EntityListMenuItem, BaseDialog },
    props: {
        admin: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState('administrators', [
            'adminCertHasCert'
        ])
    },
    mounted () {
        this.hasAdminCertificate(this.admin)
    },
    methods: {
        ...mapWaitingActions('administrators', {
            createAdminCertificate: 'aui-administrator-certificate',
            revokeAdminCertificate: 'aui-administrator-certificate',
            hasAdminCertificate: 'aui-administrator-certificate',
            downloadCACertificate: 'aui-administrator-certificate'
        }),
        show () {
            this.$refs.dialog.show()
        },
        hide () {
            this.$refs.dialog.hide()
        }
    }
}
</script>
