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

    ngcpcfg set /etc/ngcp-config/config.yml www_admin.http_admin.ui_enable=yes
    ngcpcfg set /etc/ngcp-config/config.yml www_admin.http_csc.csc_dev=yes
    ngcpcfg apply "enable ngcp-admin-ui dev mode"

### Clone repository
Clone the repository to your local machine

    git clone git@github.com:sipwise/ngcp-admin-ui.git
    cd ngcp-admin-ui.git

### Run Quasar development server in Docker

Prerequisites:
* [Install yarn](https://classic.yarnpkg.com/en/docs/install)
* [Install docker](https://docs.docker.com/get-docker)

Run the following command from root folder of git repository:

    yarn run docker-dev <ip-or-fqdn-of-sipwise-voip-platform>

## Running the Quasar development server within the Sipwise VoIP platform
To get the full developer experience we need to run the development server within the Sipwise VoIP Platform.

### Run directly
Prerequisites:
* Install NPM
* Configure Sipwise VoIP Platform
* Configure quasar.conf.js

#### Install npm

    apt-get install -y npm

#### Configure Sipwise VoIP Platform
The following configuration enables NGINX to pass HTTP traffic to the Quasar development server and to act as reverse proxy.

    ngcpcfg set /etc/ngcp-config/config.yml www_admin.http_admin.dev_enable=yes
    ngcpcfg apply "enable ngcp-admin-ui dev mode"

#### Configure file quasar.conf.dev.js
Quasar development server becomes a web server that sits behind a reverse proxy.
To ensure the proper delivery of all URLs the following properties must be set:

If file "quasar.conf.dev.js" not exists, create it by using "quasar.conf.dev.template.js" as template.

```javascript
{
    public: '<domain-or-ip>:1443',
    publicPath: '/v2/'
}
```

#### Run Quasar development server
The last step is to run the Quasar development server.

    npm run dev

## Education & Resources
Here you can find some helpful resources about our technology stack.


### Quasar Framework

* [Quasar Framework homepage](https://quasar.dev)
* [Udemy Course by Danny Connell](https://www.udemy.com/course/quasarframework)

### Vue.js

* [Get started with Vue.js](https://vuejs.org/v2/guide)
* [Udemy Course by Maximilian Schwarzmüller](https://www.udemy.com/course/vuejs-2-the-complete-guide)
