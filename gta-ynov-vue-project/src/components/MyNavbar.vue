<template>
  <div id="MyNavbar">
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav v-if="isNotLogin">
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <div>
            <b-form-select size="sm" v-model="lang" :options="langs"/>
          </div>

          <b-nav-form >
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right v-if="isNotLogin">
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
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
      isNotLogin : function (){
        return this.$router.currentRoute.name != 'login'
      } 
    }
  };
</script>



<style scoped>


</style>
