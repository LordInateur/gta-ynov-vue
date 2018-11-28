<!-- 
<... Home_old.vue

  ** Autheur : Vue cli **

  Description :
    Page d'acceuil générer par defaut par l'application. Garder a des fin d'exemple

  Fonctionnalités :
    NONE

  TODO : 
    A supprimer

 -->
 

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{ }}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created : function() {
    console.log("Home created")
    if(!this.$root.isLogged()){
      this.$router.push('login')
    }
  },
  mounted : function () {
  },
  updated : function (){
  }
};


</script>
-->