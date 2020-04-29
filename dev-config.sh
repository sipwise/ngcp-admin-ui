#!/bin/bash

case "$1" in
    *)
    cd /
    ngcpcfg set /etc/ngcp-config/config.yml www_admin.http_csc.csc_dev=yes
    ngcpcfg set /etc/ngcp-config/config.yml www_admin.http_admin.ui_enable=yes
    ngcpcfg apply 'ngcp-admin-ui'
    ;;
esac
