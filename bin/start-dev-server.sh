#!/bin/bash

BASEDIR=$(dirname "$0")

if [ "$2" != "docker" ] && [ "$2" != "ngcp" ]; then
  echo "ERROR: Unknown environment. Aborting." >&2
fi

echo "Install yarn if not available"
apt-get update
apt-get install --assume-yes --no-install-recommends yarnpkg
apt-get clean

echo -n "node --version : " && node --version
echo -n "yarn  --version : " && yarnpkg --version

cd "$BASEDIR/.." || exit 1

QUASAR_CONFIG="quasar.conf.dev.js"
if [ "$2" == "ngcp" ]; then
  cp -f "quasar.conf.dev.ngcp.js" "$QUASAR_CONFIG"
  sed -i "s/{{devServerPublic}}/$1/g" "$QUASAR_CONFIG"
else
  cp -f "quasar.conf.dev.docker.js" "$QUASAR_CONFIG"
fi
echo "Created Quasar development server config $QUASAR_CONFIG"

APP_CONFIG="src/config/app.js"
cp -f "src/config/app.template.js" "$APP_CONFIG"
if [ "$2" == "docker" ]; then
  sed -i "s/{{ngcpPanelUrl}}/https:\/\/$1:1443/g" "$APP_CONFIG"
else
  sed -i "s/{{ngcpPanelUrl}}//g" "$APP_CONFIG"
fi
echo "Created application config $APP_CONFIG"

echo "Remove old node dependencies"
rm -R -f node_modules/

echo "Install node dependencies"
if ! yarnpkg install; then
  echo "ERROR: cannot install all dependencies. Aborting." >&2
  exit 1
fi

echo "Starting Quasar dev environment"
if ! yarnpkg run dev; then
  echo "ERROR: cannot run quasar dev environment. Aborting." >&2
  exit 1
fi
