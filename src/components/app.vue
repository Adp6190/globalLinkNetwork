<template>
  <f7-app v-bind="f7params">
    <!-- Left panel with cover effect when hidden -->
    <f7-panel left cover :visible-breakpoint="960" v-if="user">
      <f7-view>
        <f7-page>
          <f7-navbar title="Welcome"></f7-navbar>
          <f7-block-title>{{ user.name }} </f7-block-title>
          <f7-block-title v-if="user.company">{{ user.company.name }}</f7-block-title>
          <f7-list>
            <f7-list-item
              link="/"
              title="Home"
              panel-close
              view=".view-main"
            ></f7-list-item>
            <f7-list-item
              link="/agenda"
              title="Agenda"
              panel-close
              view=".view-main"
            ></f7-list-item>
            <f7-list-item
              link="/companies"
              title="Companies"
              panel-close
              view=".view-main"
            ></f7-list-item>
            <f7-list-item
              link="/one-on-one"
              title="One-On-One Meetings"
              panel-close
              view=".view-main"
            ></f7-list-item>
            <f7-list-item
              panel-close
              view=".view-main"
              link="/notes"
              title="Notes"
            ></f7-list-item>
            <f7-list-item
              panel-close
              view=".view-main"
              link="/survey"
              title="Survey"
            ></f7-list-item>
            <f7-list-item
              panel-close
              view=".view-main"
              link="/presenter"
              title="Presenters"
            ></f7-list-item>
            <f7-list-item
              panel-close
              view=".view-main"
              link="/sponsors"
              title="Sponsors"
            ></f7-list-item>
          </f7-list>
          <f7-block-title></f7-block-title>
          <f7-list>
            <f7-list-item> Logout </f7-list-item>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-panel>

    <!-- Your main view, should have "view-main" class -->
    <f7-view main class="safe-areas" url="/"></f7-view>

    <f7-login-screen id="my-login-screen" v-model:opened="isOpen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <form @submit.prevent="alertLoginData">
            <div class="error-message" v-if="showError">
              Authentication failed
            </div>
            <f7-list>
              <f7-list-input
                type="text"
                name="username"
                placeholder="Your email"
                v-model:value="username"
              ></f7-list-input>
              <f7-list-input
                type="password"
                name="password"
                placeholder="Your password"
                v-model:value="password"
              ></f7-list-input>
            </f7-list>
            <f7-button title="Sign In" type="submit">Submit</f7-button>
          </form>
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </f7-app>
</template>
<script>
import { ref, onMounted, watch } from "vue";
import { f7, f7ready } from "framework7-vue";
import { getDevice } from "framework7/lite-bundle";
import cordovaApp from "../js/cordova-app.js";
import { useStore } from "vuex";
import routes from "../js/routes.js";

export default {
  setup() {
    const user = ref(null);

    const store = useStore();
    user.value = store.getters.user;
    watch(
      () => store.getters.user,
      function (v) {
        user.value = v;
      }
    );

    const device = getDevice();
    // Framework7 Parameters
    const f7params = {
      name: "Dubai 2020", // App name
      theme: "auto", // Automatic theme detection

      id: "io.framework7.myapp", // App bundle ID
      // App store
      store: store,
      // App routes
      routes: routes,

      // Input settings
      input: {
        scrollIntoViewOnFocus: device.cordova && !device.electron,
        scrollIntoViewCentered: device.cordova && !device.electron,
      },
      // Cordova Statusbar settings
      statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
      },
    };
    let isOpen = ref(false);
    if (!store.getters.isLoggedIn) {
      isOpen.value = true;
    }
    // Login screen data
    const username = ref("");
    const password = ref("");
    let showError = ref(false);
    const alertLoginData = () => {
      store
        .dispatch("login", { email: username.value, password: password.value })
        .then((res) => {
          isOpen.value = false;
        })
        .catch((e) => {
          showError.value = true;
        });
    };

    const changeView = (e, v) => {
      console.log(e, v);
      f7.views.main.router.navigate(v);
    };

    onMounted(() => {
      f7ready(() => {
        // Init cordova APIs (see cordova-app.js)
        if (device.cordova) {
          cordovaApp.init(f7);
        }

        // Call F7 APIs here
      });
    });

    return {
      isOpen,
      showError,
      f7params,
      username,
      password,
      alertLoginData,
      user,
      changeView,
    };
  },
  methods: {},
};
</script>
