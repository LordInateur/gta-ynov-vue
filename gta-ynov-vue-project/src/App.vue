<template>
  <div id="app">
    <!-- debut -->

    <MyNavbar :isNotLogin="isNotLogin()" />

    <!-- fin -->
    <router-view/>
    
  </div>
</template>

<script>
  import MyNavbar from './components/MyNavbar.vue'

  export default {
    name : "app",
    data : function(){
      return {
        userName : "InitName",
        userRight : ""
      }
    },
    methods : {
      isNotLogin : function (){
        return !this.$root.isLogged()
      }
    },
    components : {
      MyNavbar
    }
  };
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
