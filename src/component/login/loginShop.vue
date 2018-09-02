<template>
  <div>
    登录中........
  </div>
</template>

<script>
  import login from "../../services/login.js"
  export default {
    // name: 'loginShop',
    data() {
      return {
      }
    },
    props: {

    },
    watch: {
    },
    components: {},
    beforeCreate: function () {

    },
    mounted: function () {
      new login().loginShop();
    },
    methods: { 
    }
  }
</script>

<style scoped>
  div {
    font-size: .16rem;
    padding: .1rem;
  }
</style>