<!-- Login.vue

  ** Autheur : Matthieu Fournier **

  Description :
    Cette vue est la page de login. 

  Fonctionnalités :
    Permet a l'utilisateur d'accéder au formulaire de login

  TODO : 
    NONE

 -->
 

<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png">
    <LoginForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'login',
  components: {
    LoginForm
  },
  created : function() {
    console.log("login created");
  }
};





</script>
