<template>
  <f7-page name="company">
    <nav-bar />
    <f7-block-title>One On One Schedular</f7-block-title>
    <schedular />
  </f7-page>
</template>

<script>
import Schedular from "../components/schedular/Schedular.vue";
import NavBar from "../components/global/NavBar.vue";
export default {
  components: {
    NavBar,
    Schedular,
  },
};
</script>