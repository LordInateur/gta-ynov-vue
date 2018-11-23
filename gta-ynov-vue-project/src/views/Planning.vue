<template>
  <div class="planning">
    <div id="planningContainer" class="row main">
      <div class="col-xl-4" v-if="canEditName">
        <SearchUser v-on:loadUser="loadUser"/>
      </div>
      <div v-bind:class="{'col-xl-8': canEditName, 'container': !canEditName}">
        
        <h1>Planning</h1>
        <div  id="PlanningComponentFromPlanning">
          <PlanningComponent v-bind:user="user" v-on:loadUser="loadUser" />
        </div>
        


      </div> 
    </div>
    <div class="container">
      <hr>
      <h2>Demande en cours : </h2>
      <div class="row title">
        <div class="col-sm-2">User</div>
        <div class="col-sm-2">Status</div>
        <div class="col-sm-2">Date</div>
        <div class="col-sm">Description</div>
        <div class="col-sm-1" v-if="canAccept">Accep.</div>
        <div class="col-sm-1" v-if="canAccept">Refu.</div>
      </div>
      <div class="row" v-for="demande in demandesList">
        <div class="col-sm-2 border-top">{{demande.user}}</div>
        <div class="col-sm-2 border-top">{{demande.status}}</div>
        <div class="col-sm-2 border-top">{{demande.date}}</div>
        <div class="col-sm text-left border-top">{{demande.text}}</div>
        <div class="col-sm-1 border-top" v-if="canAccept && demande.status == 'EN_COURS'"><input type="button" name="" value="Accep." v-on:click="acceptDemande(demande.userId, demande.contractId, demande.id)"></div>
        <div class="col-sm-1 border-top" v-if="canAccept && demande.status == 'EN_COURS'"><input type="button" name="" value="Refu." v-on:click="refusDemande(demande.userId, demande.contractId, demande.id)"></div>
      </div>
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchUser from '@/components/SearchUser.vue'
import PlanningComponent from '@/components/PlanningComponent.vue'

export default {
  name: 'planning',
  components: {
    SearchUser,
    PlanningComponent
  },
  created : function() {
    this.user = this.$root.getLoggedUser()
    this.canEditName = this.$root.isDRH(this.user) ||  this.$root.isAdmin(this.user)
    this.demandesList = this.$root.getCurrentContract(this.user).demandes
  },
  data : function(){
    return {
      canEditName : false,
      user : {},
      demandesList : []
    }
  },
  methods : {
    loadUser : function(user){
      //alert("loadUser")
      this.user = user
    },
    acceptDemande : function(userId, contractId, demandeId){
      this.$root.acceptDemande(userId, contractId, demandeId)
      this.refreshDemandeList()
    },
    refusDemande : function(userId, contractId, demandeId){
      this.$root.refusDemande(userId, contractId, demandeId)
      this.refreshDemandeList()
    },
    refreshDemandeList : function (){
      let loggedUser = this.$root.getLoggedUser()
      let tmpDemandes = this.$root.getCurrentContract(loggedUser).demandes.map(d=>
        {
          d.user = "Moi"
          d.userId = loggedUser.id
          d.contractId = this.$root.getCurrentContract(loggedUser).id
          return d
        })
      this.demandesList = tmpDemandes.concat(this.$root.getYourTeamsDemandes(loggedUser.teams, loggedUser.id))
            .sort().reverse()
    }
  },
  computed : {
    canAccept : function(){
      return this.$root.isAdmin(this.$root.getLoggedUser()) 
          || this.$root.isDRH(this.$root.getLoggedUser()) 
          || this.$root.isTL(this.$root.getLoggedUser())
    }
  },
  watch : {
    user : function (newUser){
      this.refreshDemandeList()
    }
  }
};
</script>

<style scoped>

.row.title {
  font-weight: bold;
}

.planning {
  margin-top: 1em;
}

#planningContainer {
  margin: 0px;
}

@media (max-width: 576px) {

  #PlanningComponentFromPlanning {
    overflow-x: scroll;
    overflow-y: hidden;
    padding-bottom: 5px;
  }

}

</style>