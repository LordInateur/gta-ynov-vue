<template>
  <div class="dashboard">
    <br>
    <h1>Welcome to your dashboard {{user.pseudo}}</h1>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'dashboard',
  components: {
  },
  created : function() {
    console.log("Home created")
    if(!this.$root.isLogged()){
      this.$router.push('login')
    }else{
      this.user = this.$root.getLoggedUser()
    }
  },
  mounted : function () {
  },
  updated : function (){
  },
  data : function(){
    return {
      user : {}
    }
  },
  methods : {

  }
};


</script>
