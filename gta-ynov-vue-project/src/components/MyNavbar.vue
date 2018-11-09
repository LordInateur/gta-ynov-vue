<template>
  <div id="MyNavbar">
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <router-link to="/"><b-navbar-brand >NavBar</b-navbar-brand></router-link>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav v-if="this.$root.isLoggin">
          <b-nav-item href="#" v-on:click="resetData()" v-if="isAdmin()">Reset Data</b-nav-item>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form >
            <b-form-select size="sm" v-model="lang" :options="langs"/>
          </b-nav-form >

          <b-nav-form >
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right v-if="this.$root.isLoggin">
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>{{userName}}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" v-on:click="logout()">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>


<script>
  export default {
    name : "MyNavbar",
    props: {
      msg: String
    },
    data : function(){
      return {
        langs : [{value : 'FR', text : 'FR'},
                {value : 'DE', text : 'DE'},
                {value : 'UK', text : 'UK'},
                {value : 'ES', text : 'ES'}],
        lang : 'FR'
      }
    },
    computed : {
      userName : function(){
        if(this.$root.isLogged()){
          console.log("getLoggedUser : ")
          console.log(this.$root.getLoggedUser())
          return this.$root.getLoggedUser().pseudo
        }else{
          return "User"
        }
      },
      isLogin : function(){
        console.log("NavBar isLogin computed : " + this.$root.isLogged())
        return this.$root.isLogged();
      } 
    },
    created : function(){
      console.log("NavBar created")
      this.$root.isLoggin = this.$root.isLogged()
    },
    mounted : function(){
      console.log("NavBar mounted")
    },
    beforeUpdate : function(){
      console.log("NavBar beforeUpdate")
    },
    updated : function(){
      console.log("NavBar updated")
    },
    beforeRouteUpdate : function(){
      console.log("NavBar beforeRouteUpdate")
    },
    methods : {
      logout : function (){
        console.log("logout")
        this.$root.logout()
        //this.isNotLogin = this.$root.isLogged()
        this.$root.isLoggin = false
        this.$router.push('login')
      },
      resetData : function (){
        this.$root.resetData()
      },
      isAdmin : function(){
        console.log(this.$root.getLoggedUser().roles)
        return this.$root.getLoggedUser().roles.indexOf('ADMIN') > -1
      }
    },
    props : {}
  };
</script>



<style scoped>


</style>
