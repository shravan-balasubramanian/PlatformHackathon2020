<template>
  <div id="app">
    <Navbar @downloadClicked="downloadAppZip" />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
  computed: {
    ...mapState([
      'newAppConfigs',
    ]),
  },
  methods: {
    generateFile(app) {
      const appZip = new JSZip();
      Object
        .keys(app)
        .forEach((file) => {
          appZip.file(file, app[file]);
        });

      appZip.generateAsync({
        type: 'blob',
      }).then((contentBlob) => {
        const appName = this.newAppConfigs.meta_details.app_name;
        saveAs(contentBlob, `${appName}.zip`);
      });
    },
    async downloadAppZip() {
      // const
      const blueprint = {
        name: 'first-app',
        flows: [
          {
            start: 'a',
            location: 'backend',
            blocks: [
              {
                id: 'a',
                class: 'onBackend',
                edges: {
                  success: 'b',
                  failure: 'b',
                },
                arguments: {
                  event: 'onTicketCreate',
                },
              },
              {
                id: 'b',
                class: 'ifelse',
                edges: {
                  success: 'c',
                  failure: 'c',
                },
                arguments: {
                  op: '==',
                  left: '{{global.result.subject}}',
                  right: 'Car',
                },
              },
              {
                id: 'c',
                class: 'request',
                edges: {},
                arguments: {
                  domain: 'fw-hackathon.myshopify.com',
                  api_key: '9c1cfbe80eaad256d7a2c30f9a99d385',
                  password: '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',
                  item_name: '{{global.result.subject}}',
                  quantity: '2',
                },
                response: 'Call suceeded',
              },
            ],
          },
        ],
      };
      fetch(process.env.VUE_APP_BACKEND, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(blueprint),
        // eslint-disable-next-line
      }).then((res) => res.json()).then(({ result }) => {
        this.generateFile(result);
      })
      // eslint-disable-next-line
      .catch(console.error);
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  margin: 0;
  min-height: 100%;
  padding: 0;
  position: relative;
  width: 100%;
}
</style>
