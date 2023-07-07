<template>
  <f7-page name="company">
    <nav-bar />
    <f7-block-title>Companies</f7-block-title>
    <companies />
  </f7-page>
</template>

<script>
import Companies from "../components/companies/Companies.vue";
import NavBar from "../components/global/NavBar.vue";
export default {
  components: {
    NavBar,
    Companies,
  },
};
</script>
