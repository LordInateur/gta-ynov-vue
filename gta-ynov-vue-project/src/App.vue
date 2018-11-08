<template>
  <div id="app">
    <!-- debut -->

    <MyNavbar/>

    <!-- fin -->
<!--     
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
 -->
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
      //logout : this.$root.logout()
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
