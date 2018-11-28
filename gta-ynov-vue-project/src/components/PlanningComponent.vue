<!-- PlanningComposant.vue

  ** Autheur : Matthieu Fournier **

  Description :
    Ce composant est un object planning/clendrier.

  Fonctionnalités :
    Afficher un planning
    Modifier l'affichage d'une zone en fonction d'une condition ( si demande )

  TODO : 
    Pouvoir faire ressortir graphiquemennt les différent type de demande
    Clicker sur une demande permet de la modifier

 -->

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
      <!-- Bouton semaine precedente -->
      <div  class="col-1 align-self-center">
        <input class="switchSemaineBouton" v-on:click="previousWeek()" type="button" name="" value="<X" :disabled="!canClickLeft">
      </div>
      <div class="col-10">
        <!-- Debut calendrié -->
        <div class="row" v-if="selected > -1">
          <div id="myCalendar" class="col" v-for="(day, index) in selectedContract.horaire">

            <div class="cel title" v-on:click="clickCol(index)" v-if="getCelDate(index) != mondayDate"> {{ getCelDate(index) }} </div>
            <input class="title" type="date" v-model="mondayDate" name="" v-if="getCelDate(index) == mondayDate">

            <div class="cel" :class="{'active' : cel.active, 'demande' : cel.demande }" v-for="cel in dayToArray(day, index)" v-on:click="clickCel(cel)">{{cel.horaire}}</div>

          </div>
        </div>
        <div class="row" v-if="selected <= -1">
          <h2> ! - Aucun contrat n'est selectionné / Actif - ! </h2>
        </div>
        <!-- Fin calendrié -->
      </div>
      <!-- Bouton semaine suivante -->
      <div class="col-1 align-self-center">  
        <input class="switchSemaineBouton" v-on:click="nextWeek()" type="button" name="" value="X>" :disabled="!canClickRight"> 
      </div>
    </div>

    <!-- debut modal  -->
    <b-modal ref="myModalRef" hide-footer title="Creation de demande">
      <div class="d-block text-center">
        <h3>Entrer les informations nécessaires : </h3>
        <h4>Contrat selectionné : {{(this.user.contrats.find(c=>c.id == selected) || {titre : 'AUCUN CONTRAT SELECTIONNE'}).titre}}</h4>
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
    this.selected = this.$root.getCurrentContract(this.user).id
    this.user.contrats.sort((a,b)=>a.dateDebut<=b.dateDebut)
    this.mondayDate = this.$root.formatDate(new Date(new Date().getTime() - (new Date().getDay()-1) * 24 * 60 * 60 * 1000 ))
  },
  methods : {
    isDateBetwin(date, before, after){
      let d_date = Number(date.split('h')[0]) * 60 + Number(date.split('h')[1])
      let d_before = Number(before.split('h')[0]) * 60 + Number(before.split('h')[1])
      let d_after = Number(after.split('h')[0]) * 60 + Number(after.split('h')[1])
      return d_before <= d_date && d_date < d_after
    },
    dayToArray : function (day, index){
      // Fonction qui transforme les infos du contrat pour une journée en une liste de demi-heure

      let mm = ["h00", "h30"];
      let dayArray = []

      // On passe chaque demi-heure de 7h à 22h en revu
      for(let hh = 7 ; hh < 22 ; hh ++ ){
        for(let mdh = 0 ; mdh < 2 ; mdh ++){
          // cel : Une zone d'une demi-heure dans le planning
          let cel = {demande : false, active : false, horaire: hh + mm[mdh], day: this.getCelDate(index)}

          // Si la journée est une journée travaillé
          if (day.length > 0){
            // si le jour est censé être travaillé
            if(this.selectedContract.dateDebut <= cel.day && cel.day <= this.selectedContract.dateFin){
              // Si la demieur est censé être travaillé
              if(this.isDateBetwin(cel.horaire, day[0][0], day[0][1]) || this.isDateBetwin(cel.horaire, day[1][0], day[1][1]) ){ 
                // Si il y a une demande pour la journée
                if(this.selectedContract.demandes.find(d=>d.date == cel.day && d.status != 'REFUSE')){
                  cel.demande = true;
                }else {
                  cel.active = true
                }
              }
            }
          }
          dayArray.push(cel)
        }
      }
      
      return dayArray
    },
    updateUser : function(user){
      // Change l'utilisateur affiché sur le tableau
      this.user = user
    },
    getCelDate : function(index){
      return this.$root.formatDate(new Date(new Date(this.mondayDate).getTime() + index * 24 * 60 * 60 * 1000 )) 
    },
    clickCel : function(cel){
      this.selectedCel = cel
      this.demandeFormValue = '-1'
      this.$refs.myModalRef.show()
    },
    clickCol : function(index){
      this.selectedCel = {day : this.getCelDate(index) }
      this.demandeFormValue = '-1'
      this.$refs.myModalRef.show()
    },
    previousWeek : function(){
      this.mondayDate = this.$root.formatDate(new Date(new Date(this.mondayDate).getTime() - 7 * 24 * 60 * 60 * 1000))
    },
    nextWeek : function(){
      this.mondayDate = this.$root.formatDate(new Date(new Date(this.mondayDate).getTime() + 7 * 24 * 60 * 60 * 1000))
    },
    saveDemande : function(){
      this.$root.saveDemande(this.user.id, this.selected, this.demandeForm)
      this.$refs.myModalRef.hide()
      // loadUser : fonction du parent qui change l'utilisateur affiché
      this.$emit('loadUser', this.$root.getUser(this.user.id))
    }
  },
  data : function (){
    return {
      selected : "", // l'identifiant du contrat selectionner dans les radios boutons
      mondayDate : "2018-11-19", // la date du debut de la semaine a afficher dans le planning
      demandeFormValue : '-1', // Pour le formulaire de demande : le type de la demande
      demandeForm : { // Une demande apr defaut
            value : '-1',
            text : 'Undefined',
            jourPayer : false,
            status : 'EN_COURS',
            date : '2018-01-01'
          },
      selectedCel : { // mis a jour lors du click sur une cellule pour garder l'info jusqu'au prochain click
        day : this.$root.formatDate(new Date())
      }
    }
  },
  computed : {
    options : function (){
      // la liste des contrats pour les radios buttons
      return this.user.contrats.map(c=> {return{text : c.titre, value : c.id}})
    },
    selectedContract : function(){
      return this.user.contrats.find(c=>c.id == this.selected) || { horaire:[[],[],[],[],[],[],[]] }
    },
    canClickLeft : function(){
      return new Date(this.selectedContract.dateDebut) < new Date(this.mondayDate)
    },
    canClickRight : function(){
      return new Date(new Date(this.mondayDate).getTime() + 7 * 24 * 60 * 60 * 1000 ) < new Date(this.selectedContract.dateFin)
    }

  },
  watch : {
    user : {
      handler : function (newUser){
        // rafraichit l'utilisateur lors de la creation / validation d'une demande
        this.selected = this.$root.getCurrentContract(this.user).id
      }
    },
    mondayDate : {
      handler : function (newMondayDate){
        // s'assure que la date selectionner est bien un lundi. Sinon prend le lundi précedent
        let newDateDay = new Date(newMondayDate).getDay()
        if( newDateDay != 1 ){
          this.mondayDate = this.$root.formatDate(new Date(new Date(newMondayDate).getTime() - (newDateDay-1) * 24 * 60 * 60 * 1000 ))
        }
      }
    },
    demandeFormValue : {
      handler : function (newDemandeFormValue){
        // Charge les information de la demande lors que l'utilisateur choisie le type de la demande qu'il veut faire
        this.demandeForm = this.$root.getDefaultDemande().find(dmd=>dmd.value == newDemandeFormValue) || { date : ''}
        this.demandeForm.date = this.selectedCel.day
      }
    }
  },
  props: {
    user: Object // l'utilisateur afficher sur le planning
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

.cel.demande {
  background-color: orange
}
.cel.demande:hover {
  background-color: darkorange
}

</style>
