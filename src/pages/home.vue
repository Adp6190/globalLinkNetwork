<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <nav-bar-large />

    <f7-block strong> app sponsor </f7-block>
    <f7-row>
      <f7-col>
        <f7-link href="/agenda"> Agenda </f7-link>
      </f7-col>
      <f7-col>
        <f7-link href="/whatsapp"> Whatsapp </f7-link>
      </f7-col>
    </f7-row>
    <f7-row>
      <f7-col>
        <f7-link href="/companies"> Companies </f7-link>
      </f7-col>
      <f7-col>
        <f7-link href="/one-on-one"> 1-on-1 </f7-link>
      </f7-col>
    </f7-row>
    <f7-row>
      <f7-col>
        <f7-link href="/notes"> Notes </f7-link>
      </f7-col>
      <f7-col>
        <f7-link href="/survey"> Survey </f7-link>
      </f7-col>
    </f7-row>
    <f7-row>
      <f7-col>
        <f7-link href="/presenter"> Presenter </f7-link>
      </f7-col>
      <f7-col>
        <f7-link href="/sponsors"> Sponsors </f7-link>
      </f7-col>
    </f7-row>

    

    
  </f7-page>
</template>
<script>
import NavBarLarge from "../components/global/NavBarLarge.vue";
export default {
  components: {
    NavBarLarge,
  },
};
</script>
