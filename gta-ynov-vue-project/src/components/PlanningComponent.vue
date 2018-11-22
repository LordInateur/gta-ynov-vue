<template>
  <div id="PlanningComponent">
    <div>
      <b-form-group >
        <b-form-radio-group 
                            buttons
                            v-model="selected"
                            :options="options"
                            name="radiosBtnDefault" />
      </b-form-group>
    </div>
    <div class="row">
      <div  class="col-1 align-self-center">
        <input class="switchSemaineBouton" v-on:click="previousWeek()" type="button" name="" value="<">
      </div>
      <div class="col-10">
        <!-- Debut calendrié -->
        <div class="row" v-if="selected > -1">
          <div id="myCalendar" class="col" v-for="(day, index) in selectedContract.horaire">

            <div class="cel title" v-on:click="clickCol(index)" v-if="getCelDate(index) != mondayDate"> {{ getCelDate(index) }} </div>
            <input class="title" type="date" v-model="mondayDate" name="" v-if="getCelDate(index) == mondayDate">

            <div class="cel" :class="{'active' : cel.active }" v-for="cel in dayToArray(day, index)" v-on:click="clickCel(cel)">{{cel.horaire}}</div>

          </div>
        </div>
        <div class="row" v-if="selected <= -1">
          <h2> ! - Aucun contrat n'est selectionné / Actif - ! </h2>
        </div>
        <!-- Fin calendrié -->
      </div>
      <div class="col-1 align-self-center">  
        <input class="switchSemaineBouton" v-on:click="nextWeek()" type="button" name="" value=">"> 
      </div>
    </div>

    <!-- debut modal  -->
    <b-modal ref="myModalRef" hide-footer title="Creation de demande">
      <div class="d-block text-center">
        <h3>Entrer les informations nécessaires : </h3>
        <b-form-select v-model="demandeFormValue" :options="this.$root.getDefaultDemande()" class="mb-3" />

        <div>
          <label>Jour demandé </label><span> - </span><input type="date" class="fadeIn fourth" v-model="demandeForm.date">
        </div>
        
      </div>
      <b-btn class="mt-3" variant="outline-primary" block @click="saveDemande()">Faire la demande</b-btn>
    </b-modal>
    <!-- fin modal  -->
  </div>
</template>


<script>
export default {
  name : "PlanningComponent",
  created : function() {
    console.log("PlanningComponent created")
    this.selected = this.getCurrentContract(this.user).id
    this.user.contrats.sort((a,b)=>a.dateDebut<=b.dateDebut)
    this.mondayDate = this.$root.formatDate(new Date(new Date().getTime() - (new Date().getDay()-1) * 24 * 60 * 60 * 1000 ))
  },
  mounted : function(){

  },
  methods : {
    isDateBetwin(date, before, after){

      let d_date = Number(date.split('h')[0]) * 60 + Number(date.split('h')[1])
      let d_before = Number(before.split('h')[0]) * 60 + Number(before.split('h')[1])
      let d_after = Number(after.split('h')[0]) * 60 + Number(after.split('h')[1])
      return d_before <= d_date && d_date < d_after
    },
    dayToArray : function (day, index){
      // Une journée ne peux pas commencer avant 7h et finir après 22h

      let mm = ["h00", "h30"];
      let dayArray = []

      for(let hh = 7 ; hh < 22 ; hh ++ ){
        for(let mdh = 0 ; mdh < 2 ; mdh ++){
          let cel = {active : false, horaire: hh + mm[mdh], day: this.getCelDate(index)}

          if (day.length > 0){

            if(this.selectedContract.dateDebut <= cel.day && cel.day <= this.selectedContract.dateFin){
              if(this.isDateBetwin(cel.horaire, day[0][0], day[0][1]) || this.isDateBetwin(cel.horaire, day[1][0], day[1][1]) ){
                cel.active = true
              }
            }
          }
          dayArray.push(cel)
        }
      }
      
      return dayArray
    },
    getCurrentContract : function(user) {
      return user.contrats.find(c => c.dateDebut <= this.$root.formatDate(new Date()) && this.$root.formatDate(new Date()) <= c.dateFin ) || {id : -1}
    },
    updateUser : function(user){
      this.user = user
    },
    getCelDate : function(index){
      return this.$root.formatDate(new Date(new Date(this.mondayDate).getTime() + index * 24 * 60 * 60 * 1000 )) 
    },
    clickCel : function(cel){
      this.selectedCel = cel
      this.demandeFormValue = '-1'
      this.$refs.myModalRef.show()
      //alert(cel.day + ' - ' + cel.horaire + ' - ' + cel.active)
    },
    clickCol : function(index){
      this.selectedCel = {day : this.getCelDate(index) }
      this.demandeFormValue = '-1'
      this.$refs.myModalRef.show()
      //alert(this.getCelDate(index))
    },
    previousWeek : function(){
      this.mondayDate = this.$root.formatDate(new Date(new Date(this.mondayDate).getTime() - 7 * 24 * 60 * 60 * 1000))
    },
    nextWeek : function(){
      this.mondayDate = this.$root.formatDate(new Date(new Date(this.mondayDate).getTime() + 7 * 24 * 60 * 60 * 1000))
    },
    saveDemande : function(){
      this.$root.saveDemande(this.user.id, this.selectedContract.id, this.demandeForm)
      this.$refs.myModalRef.hide()
      this.$emit('loadUser', this.$root.getUser(this.user.id))
    }
  },
  data : function (){
    return {
      selected : "",
      mondayDate : "2018-11-19",
      demandeFormValue : '-1',
      demandeForm : {
            value : '-1',
            text : 'Undefined',
            jourPayer : false,
            status : 'EN_COURS',
            date : '2018-01-01'
          },
      selectedCel : {
        day : this.$root.formatDate(new Date())
      }
    }
  },
  computed : {
    options : function (){
      return this.user.contrats.map(c=> {return{text : c.titre, value : c.id}})
    },
    selectedContract : function(){
      return this.user.contrats.find(c=>c.id == this.selected) || { horaire:[[],[],[],[],[],[],[]] }
    },

  },
  watch : {
    user : {
      handler : function (newUser){
        this.selected = this.getCurrentContract(this.user).id
      }
    },
    mondayDate : {
      handler : function (newMondayDate){
        let newDateDay = new Date(newMondayDate).getDay()
        if( newDateDay != 1 ){
          this.mondayDate = this.$root.formatDate(new Date(new Date(newMondayDate).getTime() - (newDateDay-1) * 24 * 60 * 60 * 1000 ))
        }
      }
    },
    demandeFormValue : {
      handler : function (newDemandeFormValue){
        this.demandeForm = this.$root.getDefaultDemande().find(dmd=>dmd.value == newDemandeFormValue) || { date : ''}
        this.demandeForm.date = this.selectedCel.day
      }
    }
  },
  props: {
    user: Object
  }
};



</script>



<style scoped>
#PlanningComponent {
  min-width: 600px;
}

#myCalendar {
  background-color: #DDD;
  padding : 20px;
}

.switchSemaineBouton {
  height: 300px;
  width: 80%;
}

.cel {
  height: 1.1em;
}
.cel:hover{
  background-color: #BBB;
}

.cel.title {
  margin-bottom: 1em;
  font-weight: bold;
}

input.title {
  width: 9em;
}

.cel.active {
  background-color: #AAF
}
.cel.active:hover {
  background-color: #88F
}

</style>
