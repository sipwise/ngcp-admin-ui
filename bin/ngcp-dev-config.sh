#!/bin/bash

cd /
CSC_DEV=$(ngcpcfg get www_admin.http_csc.csc_dev)
UI_ENABLE=$(ngcpcfg get www_admin.http_admin.ui_enable)
DEV_ENABLE=$(ngcpcfg get www_admin.http_admin.dev_enable)
HAS_CONFIG=0
if [ "$CSC_DEV" == "no" ]
then
	ngcpcfg set /etc/ngcp-config/config.yml www_admin.http_csc.csc_dev=yes
	HAS_CONFIG=1
fi
if [ "$UI_ENABLE" == "no" ]
then
	ngcpcfg set /etc/ngcp-config/config.yml www_admin.http_admin.ui_enable=yes
	HAS_CONFIG=1
fi
if [ "$DEV_ENABLE" == "no" ]

then
	ngcpcfg set /etc/ngcp-config/config.yml www_admin.http_admin.dev_enable=yes
	HAS_CONFIG=1
fi
if [ "$HAS_CONFIG" -eq 1 ]
then
	ngcpcfg apply 'ngcp-admin-ui development config'
fi
