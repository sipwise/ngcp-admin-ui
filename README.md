# Administration User Interface
The main goal of this project is to replace the administration interface [ngcp-panel](https://github.com/sipwise/ngcp-panel) using a modern web technology stack.
The ngcp-panel is written in Perl and is the main web interface, that allows administrators to configure and provision the [Sipwise VoIP Platform](https://www.sipwise.org).
The plan is to decouple the new interface from the backend completely, and to evolve it to a service oriented architecture.
We are using [Vue.js](https://vuejs.org/v2/guide "What is Vue.js?") as core frontend technology and the [Quasar Framework](https://quasar.dev/introduction-to-quasar "What is Quasar?") as UI- and Component-Framework that builds on top of Vue.js.

## Concepts
We are using the [quasar-cli](https://quasar.dev/quasar-cli/installation) as main development tool to get the full developer experience.

List of additional packages:

* State management: [vuex](https://vuex.vuejs.org)
* HTTP client: [axios](https://github.com/axios/axios)
* I18n: [vue-i18n](https://github.com/kazupon/vue-i18n)

## Getting started
To be able to contribute to the new administration interface you need to go through the following steps.

### Install Sipwise VoIP Platform
First install an instance of the [Sipwise VoIP Platform](https://www.sipwise.org/products/spce/quickinstall "Installation Guide") to be able to access the REST-API. Check the according [documentation](https://www.sipwise.org/products/spce/documentation/) for more information.

### Configure Sipwise VoIP Platform
Enable CORS headers to be able to access the REST-API from the application on your local machine.

    ngcpcfg set /etc/ngcp-config/config.yml www_admin.http_csc.csc_dev=yes

### Install Node.js and NPM
The easiest and most convenient way to install the right Node.js and NPM version for your development environment, is to use the [Node.js Version Manager](https://github.com/nvm-sh/nvm).
The Node.js Version Manager allows you to manage more than one Node.js and NPM versions at the same time and enables you to work on projects with differing Node.js versions.

[Install Node.js Version Manager](https://github.com/nvm-sh/nvm#install--update-script)

The version you need to install is v10.21.0 (npm v6.14.4).

    nvm install 10.21.0

Check node and npm version.

    node -v
    # v10.21.0

    npm -v
    # 6.14.4

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

### Run in the application in development mode

    npm run dev

## Education & Resources

Here you can find some helpful resources about our technology stack.

### Quasar Framework

* [Quasar Framework homepage](https://quasar.dev)
* [Udemy Course by Danny Connell](https://www.udemy.com/course/quasarframework)

### Vue.js

* [Get started with Vue.js](https://vuejs.org/v2/guide)
* [Udemy Course by Maximilian Schwarzmüller](https://www.udemy.com/course/vuejs-2-the-complete-guide)
