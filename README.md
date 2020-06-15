# NGCP Admin Web Interface (ngcp-admin-ui)

The goal of this project is to replace the [administration interface](https://github.com/sipwise/ngcp-panel) of the [Sipwise VoIP Platform](https://www.sipwise.com) by using a modern web technology stack.
We are using [Vue.js](https://vuejs.org/v2/guide "What is Vue.js?") as core technology and the [Quasar Framework](https://quasar.dev/introduction-to-quasar "What is Quasar?") as UI- and Component-Framework that builds on top of Vue.js.
In addition to the UI components, Quasar ships an entire ecosystem that allows deploying to multiple targets like Electron, SPA, PWA etc.

## Concepts and libraries
Quasar can be configured and used in various ways in particular in terms of state management and other additions like i18n, linting, etc.

To communicate with the REST-API, we are using [axios](https://github.com/axios/axios) as main http (ajax) library.

To cover initernationalization we are using the recommended npm package [vue-i18n](https://github.com/kazupon/vue-i18n).

## Getting started
To run, test and contribute to the new administration interface go through the following steps.

### Install Sipwise VoIP Platform
First install an instance of the [Sipwise VoIP Platform](https://www.sipwise.org/products/spce/quickinstall "Installation Guide") to be able to access the REST-API. Check the according [documentation](https://www.sipwise.org/products/spce/documentation/) for more information.

### Configure Sipwise VoIP Platform
Enable CORS headers to be able to access the REST-API from the SPA on your local machine.

    ngcpcfg set /etc/ngcp-config/config.yml www_admin.http_csc.csc_dev=yes

### Install Node.js and NPM
We are using Debian as foundation of our System.
For Debian Buster you need to install node.js 10.20.1 and npm 5.8.0 on your local machine

### Clone repository
Clone the repository to your local machine

    git clone git@github.com:sipwise/ngcp-admin-ui.git

### Install dependencies

    npm install

### Configure application
Before the web interface can access the REST-API, we need to configure the base URLs.
Create a new application configuration file "app.js" under "/src/config" and set
the following properties.

```javascript
export default {
	ngcpPanelUrl: 'https://ip-or-host-of-your-installation:1443',
	ngcpApiUrl: 'https://ip-or-host-of-your-installation:1443/api'
}
```

### Run in development mode

    npm run dev
