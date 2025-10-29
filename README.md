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
First install an instance of the [Sipwise VoIP Platform](https://www.sipwise.com/doc/mr13.5.1/spce/ce/mr13.5.1/installation_ce/installation_ce.html "Installation Guide") to be able to access the REST-API. Check the according [documentation](https://www.sipwise.com/doc/mr13.5.1/spce/ce/mr13.5.1/about/about.html) for more information.

### Configure Sipwise VoIP Platform
Enable CORS headers to be able to access the REST-API from the application on your local machine.

    ngcpcfg set /etc/ngcp-config/config.yml www_admin.http_admin.ui_enable=yes
    ngcpcfg set /etc/ngcp-config/config.yml www_admin.http_csc.csc_dev=yes
    ngcpcfg apply "enable ngcp-admin-ui dev mode"

### Clone repository
Clone the repository to your local machine

    git clone git@github.com:sipwise/ngcp-admin-ui.git
    cd ngcp-admin-ui.git

Note: the git repository branch must match NGCP (REST API) version,
please checkout the proper branch if necessary:

    git checkout mr8.5.3

### Run Quasar development server locally in Docker

Prerequisites:
* [Install yarn](https://classic.yarnpkg.com/en/docs/install)
* [Install docker](https://docs.docker.com/get-docker)

Run the following command from root folder of git repository:

    yarn run docker-dev <ip-or-fqdn-of-sipwise-voip-platform>

### Run development environment in your system of choice

```shell script
yarn run config <ip-or-fqdn-of-sipwise-voip-platform>
yarn run dev
```
After that, you can open https://localhost:8081/v2/ in your browser to see AUI in action.

Note: this run / dev scenario might experience some issues in redirections to couple pages in the fallback AUI interface. If you have such issue, please use other run scenarios like running in Docker.

### Run Quasar development server within the Sipwise VoIP platform
To get the full developer experience we need to run the development server within the Sipwise VoIP Platform.

    ./bin/ngcp-dev.sh <ip-or-fqdn-of-sipwise-voip-platform>

## Translations
To keep translation files consistent and updated please run **i18n:extract** command before each commit to the GIT repo.

    yarn run i18n:extract

That CLI command will collect all new translation keys from the JS source code, and will place those keys into all translation files in a proper format.

Example of the JS code with translations:

```javascript
const someOptions = {
    label: this.$t('Remove message'),
    message: this.$t('The {email} will be removed. Are you sure?', { email: this.email })
}
```
**Important**: We are trying to avoid usage of the dynamic keys (example below) because it's very difficult to detect and collect automatically.

Example (anti-pattern):
```javascript
function getTranslatedMessage (weatherState) {
    return this.$t('Tooday is ' + weatherState)
}
```
Try to avoid such code and use text messages with substitution variables (like `email` in example above) or if there are only a couple similar messages, you can use a map object to convert some exact state to exact translation message.
But if it's really impossible to do, and you have to use dynamic keys, you should place such keys to the English translation file manually and execute `i18n:extract` which will do all the rest.

For example, for the code above, you would need to place next lines into `en.json`:
```JSON
{
    ...
    "Today is sunny": "",
    "Today is windy": "",
    "Today is cloudy": ""
}
```

**Note**: if you want to see information about missed or possible unused translation keys you could run **i18n:extract-report** command. It will just display detailed report without any modifications in the language files.

Keep in mind that some of "Unused translations" keys might be dynamic translation keys which cannot be detected in source code automatically and were added manually.

    yarn run i18n:extract-report

## Charts
To build charts we use [vue-chartjs](https://vue-chartjs.org/), which is a wrapper for Chart.js in Vue and allows to easily create reuseable chart components.
We picked this library because it allows a good grade of customisation, has a nice amount of charts types  and it's easy to learn.

## Contribution

[Go to contribution guide](./CONTRIBUTION.md)

## Education & Resources
Here you can find some helpful resources about our technology stack.


### Quasar Framework

* [Quasar Framework homepage](https://quasar.dev)
* [Udemy Course by Danny Connell](https://www.udemy.com/course/quasarframework)

### Vue.js

* [Get started with Vue.js](https://vuejs.org/v2/guide)
* [Udemy Course by Maximilian Schwarzmüller](https://www.udemy.com/course/vuejs-2-the-complete-guide)
