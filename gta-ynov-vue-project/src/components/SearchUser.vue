<!-- SearchUser.vue

  ** Autheur : Matthieu Fournier **

  Description :
    Ce composant est le formulaire de recherche utilisateur.

  Fonctionnalités :
    Permet de trouver un utilisateur par : (pseudo / mail / prenom / nom )

  TODO : 
    Ammeliorer l'affichage des réponses

 -->

<template>
  <div id="SearchUser">
    <div class="main-login main-center">
      <h1> Rechercher </h1>
      <input class="form-control" v-model="recherche" type="text"  placeholder="firstName, lastName, pseudo, mail"/>
      <br>

      <div v-if="rechercheResult.firstName.length > 0">
        <h3>Find by FirstName :</h3>
        <div v-for="fUser in rechercheResult.firstName">{{fUser.firstName}} {{fUser.lastName}} ( {{fUser.mail}} ) <img class="imgLoadUser" v-on:click="loadUser(fUser)" src="https://static.thenounproject.com/png/370577-200.png"></div>
      </div>

      <div v-if="rechercheResult.lastName.length > 0">
        <h3>Find by LastName :</h3>
        <div v-for="fUser in rechercheResult.lastName">{{fUser.firstName}} {{fUser.lastName}} ( {{fUser.mail}} ) <img class="imgLoadUser" v-on:click="loadUser(fUser)" src="https://static.thenounproject.com/png/370577-200.png"></div>
      </div>

      <div v-if="rechercheResult.pseudo.length > 0">
        <h3>Find by Pseudo :</h3>
        <div v-for="fUser in rechercheResult.pseudo">{{fUser.firstName}} {{fUser.lastName}} ( {{fUser.mail}} ) <img class="imgLoadUser" v-on:click="loadUser(fUser)" src="https://static.thenounproject.com/png/370577-200.png"></div>
      </div>

      <div v-if="rechercheResult.mail.length > 0">
        <h3>Find by Mail :</h3>
        <div v-for="fUser in rechercheResult.mail">{{fUser.firstName}} {{fUser.lastName}} ( {{fUser.mail}} ) <img class="imgLoadUser" v-on:click="loadUser(fUser)" src="https://static.thenounproject.com/png/370577-200.png"></div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchUser',
  props: {
  },
  data : function(){
    return {
      recherche : "", // le champ text
      rechercheResult : {
        firstName : [],
        lastName : [],
        pseudo : [],
        mail : []
      }
    }
  },
  methods : {
    loadUser : function(user){
      // envoit au parent l'utilisateur selectionner
      this.$emit('loadUser', user)
    }
  },
  watch : {
    recherche : function (txt){
      // recherche un utilisateur dès que le champ recherche est modifié
      if(txt.length > 0){
        console.log(txt)
        this.rechercheResult = this.$root.findUser(txt, txt, txt, txt )
        console.log(this.rechercheResult)
      } else {
        this.rechercheResult = {
          firstName : [],
          lastName : [],
          pseudo : [],
          mail : []
        }
      }
    }
  }
};
</script>

<style scoped>

.main{
  margin:50px 15px;
}

h1.title { 
  font-size: 50px;
  font-family: 'Passion One', cursive; 
  font-weight: 400; 
}

hr{
  width: 10%;
  color: #fff;
}

.form-group{
  margin-bottom: 15px;
}

label{
  margin-bottom: 15px;
}

input,
input::-webkit-input-placeholder {
    font-size: 11px;
    padding-top: 3px;
}

.main-login{
  background-color: #fff;
    /* shadows and rounded borders */
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);

}
.form-control {
    height: auto!important;
padding: 8px 12px !important;
}
.input-group {
    -webkit-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.21)!important;
    -moz-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.21)!important;
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.21)!important;
}
.my_button {
    border: 1px solid #ccc;
    margin-top: 28px;
    padding: 6px 12px;
    color: #666;
    text-shadow: 0 1px #fff;
    cursor: pointer;
    -moz-border-radius: 3px 3px;
    -webkit-border-radius: 3px 3px;
    border-radius: 3px 3px;
    -moz-box-shadow: 0 1px #fff inset, 0 1px #ddd;
    -webkit-box-shadow: 0 1px #fff inset, 0 1px #ddd;
    box-shadow: 0 1px #fff inset, 0 1px #ddd;
    background: #f5f5f5;
    background: -moz-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f5f5f5), color-stop(100%, #eeeeee));
    background: -webkit-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
    background: -o-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
    background: -ms-linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
    background: linear-gradient(top, #f5f5f5 0%, #eeeeee 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f5f5f5', endColorstr='#eeeeee', GradientType=0);
    font-size: 20px;
}
.main-center{
  margin-top: 30px;
  margin: 0 auto;
  min-width: 40%;
  max-width: 70%;
    padding: 10px 40px;
  background:#009edf;
      color: #FFF;
    text-shadow: none;
  -webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);
-moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);
box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.31);

}
span.input-group-addon i {
    color: #009edf;
    font-size: 17px;
}


.imgLoadUser {
  height: 1em;
}
</style>
