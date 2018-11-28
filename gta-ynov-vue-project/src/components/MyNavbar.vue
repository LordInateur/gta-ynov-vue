<!-- MyNavbar.vue

  ** Autheur : Matthieu Fournier **

  Description :
    Ce composant est la barre de navigation de l'application

  Fonctionnalités :
    Permet de naviger entre les différentes page de l'application
    Masque les liens vers les fonctionnalités dont l'utilisateur n'a pas le rôle requis

  TODO : 
    Trouver quoi faire avec le champ de recherche
    Enlever les champs par defaut non utiliser
    Faire fonctionner le choix du language 

 -->
 

<template>
  <div id="MyNavbar">
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <router-link to="/"><b-navbar-brand >NavBar</b-navbar-brand></router-link>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav v-if="this.$root.isLoggin">
          <b-nav-item href="#" v-on:click="resetData()" v-if="isAdmin()">Reset Data</b-nav-item>
          <b-nav-item href="#" to="/planning" v-if="this.$root.isLoggin">Planning</b-nav-item>
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
              <em>{{this.$root.getLoggedUser().pseudo}}</em>
            </template>
            <b-dropdown-item to="/profil" >Profile</b-dropdown-item>
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
      isLogin : function(){
        return this.$root.isLogged();
      } 
    },
    created : function(){
      this.$root.isLoggin = this.$root.isLogged()
    },
    methods : {
      logout : function (){
        console.log("user logout")
        this.$root.logout()
        this.$root.isLoggin = false
        this.$router.push('login')
      },
      resetData : function (){
        this.$root.resetData()
        alert("Data have been reseted")
        this.$router.push('login')
      },
      isAdmin : function(){
        return this.$root.isAdmin(this.$root.getLoggedUser())
      }
    },
    props : {}
  };
</script>



<style scoped>


</style>
