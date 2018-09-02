<template>
  <div></div>
</template>

<script>
  import mbrservice from "../../services/mbrservice.js";
  import login from "../../services/login.js";
  import HttpService from "../../services/http-service.js"
  export default {
    data() {
      return {
         // MemberCode:'763f3cf3eb014ef587ba8ca1a3b3fc14'
        
      }
    },
    created () {
       let code = new HttpService().search('token');
       new login().loginSuccess({"Data":{"Token":code}})
    }
  }
</script>
<style scoped>


</style>