<template>
  <f7-searchbar
    search-container=".search-list"
    search-in=".item-title,.item-subtitle"
    :disable-button="!theme.aurora"
  ></f7-searchbar>
  <f7-list class="searchbar-not-found">
    <f7-list-item title="Nothing found"></f7-list-item>
  </f7-list>
  <f7-list media-list class="search-list searchbar-found">
    <f7-list-item
      v-for="(n, i) in companies"
      :key="'companies-' + i"
      link="#"
      :title="n.name"
      :subtitle="n.countries"
    >
      <template #media>
        <img :src="getImage(n)" width="80" />
      </template> </f7-list-item
  ></f7-list>
</template>
<script>
import { theme } from 'framework7-vue';
export default {
  data() {
    return {
      companies: [],
      theme,
    };
  },
  methods: {
    getImage(n) {
      if (n.logo) {
        return this.$appConfig.image + n.logo.name.replace("public", "storage");
      } else {
        //
      }
    },
  },
  created() {
    console.log(this.$appConfig);
    this.$axios
      .get("conf-companies/3")
      .then((res) => {
        this.companies = res.data;
      })
      .catch(() => {
        console.log("error in fetching data");
      });
  },
};
</script>
