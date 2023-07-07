<template>
  <div>Schedular</div>
</template>
<script>
export default {
  data() {
    return {
      conference: null,
      updating : false,
    };
  },
  methods: {
    updateConf() {
      this.updating = true;
      if (this.conference.days.length) {
        for (let i = 0; i < this.conference.days.length; i++) {
          this.$axios
            .get("user-slots/" + this.$appConfig.conference_id + "/" + this.conference.days[i].id)
            .then((res) => {
              this.updating = false;
              this.conference.days[i].userSlots = res.data;
            });
        }
      }
    },
  },
  created() {
    this.$axios
      .get("conference/" + this.$appConfig.conference_id)
      .then((res) => {
        console.log(res.data);
        for (let i = 0; i < res.data.days.length; i++) {
          res.data.days[i].userSlots = [];
        }
        this.conference = res.data;
      })
      .then(() => {
        this.updateConf();
      });
  },
};
</script>
