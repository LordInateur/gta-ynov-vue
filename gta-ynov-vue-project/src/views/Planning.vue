<template>
  <div class="planning">
    <div id="planningContainer" class="row main">
      <div class="col-xl-4" v-if="canEditName">
        <SearchUser v-on:loadUser="loadUser"/>
      </div>
      <div v-bind:class="{'col-xl-8': canEditName, 'container': !canEditName}">
        
        <h1>Planning</h1>
        <div  id="PlanningComponentFromPlanning">
          <PlanningComponent v-bind:user="user" />
        </div>
        


      </div> 
    </div>
    <div class="container">
      <hr>
      <h2>Demande en cours : </h2>
      <div class="row title">
        <div class="col-sm-2">Status</div>
        <div class="col-sm-8">Description</div>
        <div class="col-sm-1">Accep.</div>
        <div class="col-sm-1">Refu.</div>
      </div>
      <div class="row">
        <div class="col-sm-2">En attente</div>
        <div class="col-sm-8">Cougé le 2018-11-22</div>
        <div class="col-sm-1">Accep.</div>
        <div class="col-sm-1">Refu.</div>
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
  },
  data : function(){
    return {
      canEditName : false,
      user : {}
    }
  },
  methods : {
    loadUser : function(user){
      //alert("loadUser")
      this.user = user
      // console.log(user)
    }

  },
  computed : {},
  watch : {}
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