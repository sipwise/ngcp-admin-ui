<template>
    <q-footer
        v-model="footerVisible"
        class="bg-white text-primary"
    >
        <q-toolbar>
            <div
                v-if="platformInfo?.type === 'spce'"
                class="custom-text"
            >
                <span class="material-icons">warning_amber</span>
                {{ "You are currently using the community edition version. " }}
                <a
                    href="https://www.sipwise.com/company/contact/"
                    target="_blank"
                    class="pro-link"
                >Buy the PRO version</a>
                {{ " to remove this banner and get plenty of other amazing features !" }}
                <i class="material-icons">auto_fix_high</i>
            </div>
            <q-toolbar-title />
            <aui-go-to-old-admin-panel />
        </q-toolbar>
    </q-footer>
</template>
<script>
import {
    mapState
} from 'vuex'
import AuiGoToOldAdminPanel from 'components/buttons/AuiGoToOldAdminPanel'
export default {
    name: 'CustomFooter',
    components: { AuiGoToOldAdminPanel },
    data () {
        return {
        }
    },
    computed: {
        ...mapState('layout', [
            'footerVisible'
        ]),
        ...mapState('user', [
            'platformInfo'
        ])
    }
}
</script>
<style>
.q-footer {
    background-color: #f8f9fa;
    color: #495057;
}
.border-top-class {
    border-top: 1px solid #dee2e6;
}
.custom-text {
    font-size: 17px; 
    font-weight: 400; 
    padding: 17px 34px; 
    line-height: 1.5; 
    text-align: center;
    color: #000000;
    font-family: Arial, Helvetica, sans-serif;
}
a {
    color: #225f299e;
    text-decoration: none;
}
.pro-link {
    color: #2aa12e; 
    font-weight: bold;
    text-decoration: underline;
    font-family: Arial, Helvetica, sans-serif;
}
.material-icons {
    font-size: 23px;
    margin-left: 5px;
    vertical-align: middle;
}
</style>
