<template>
  <div class="dashboard">
    <br>
    <h1>Welcome to your dashboard {{user.pseudo}}</h1>
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="container">
      <div>

        <b-form-group >
          <b-form-radio-group 
                              buttons
                              v-model="selected"
                              :options="options"
                              name="radiosBtnDefault" />
        </b-form-group>
      </div>
      <br>
      <br>
      <div class="row border border-dark border-bottom-0 rounded bold">
        <div class="col-md-7">Titre</div>
        <div class="col-md-1">---</div>
        <div class="col-md-4"> {{ selectedContract.titre }} </div>
      </div>
      <div class="row border border-dark border-bottom-0 rounded">
        <div class="col-md-7">Debut</div>
        <div class="col-md-1">---</div>
        <div class="col-md-4"> {{ selectedContract.dateDebut }} </div>
      </div>
      <div class="row border border-dark border-bottom-0 rounded">
        <div class="col-md-7">Fin</div>
        <div class="col-md-1">---</div>
        <div class="col-md-4"> {{ selectedContract.dateFin }} </div>
      </div>
      <div class="row border border-dark border-bottom-0 rounded">
        <div class="col-md-7">Nombre d'heure par semaine</div>
        <div class="col-md-1">---</div>
        <div class="col-md-4"> {{ selectedContract.nbHeureSemaine }} </div>
      </div>
      <div class="row border border-dark rounded">
        <div class="col-md-7">Nombre de demande exceptionnel</div>
        <div class="col-md-1">---</div>
        <div class="col-md-4"> {{ selectedContract.demandes.length }} </div>
      </div>
    </div>
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
      this.selected = this.getCurrentContract(this.user).id
      this.user.contrats.sort((a,b)=>a.dateDebut<=b.dateDebut)
    }
  },
  mounted : function () {
  },
  updated : function (){
  },
  data : function(){
    return {
      user : {},
      selected : -1
    }
  },
  methods : {
    getCurrentContract : function(user) {
      return user.contrats.find(c => c.dateDebut <= this.$root.formatDate(new Date()) && this.$root.formatDate(new Date()) <= c.dateFin ) || {id : -1}
    }
  },
  computed : {
    options : function (){
      return this.user.contrats.map(c=> {return{text : c.titre, value : c.id}})
    },
    selectedContract : function(){
      return this.user.contrats.find(c=>c.id == this.selected) || {demandes:[]}
    }
  }
};


</script>
