/*  

Data Manager

*/

let roles = ['USER', 'TEAM_LEADER', 'DIRECTEUR_DES_RESSOURCES_HUMAINES', 'ADMIN']
let demandesStatus = ['EN_COURS', 'ACCEPTE', 'REFUSE']

let demandes = [{
    id: 'xxxxxxxxx',
    value : '1',
    text : 'Congé payé',
    jourPayer : true,
    status : 'EN_COURS',
    date : '2018-01-01'
  }, {
    id: 'xxxxxxxxx',
    value : '2',
    text : 'Récupération',
    jourPayer : true,
    status : 'EN_COURS',
    date : '2018-01-01'
  }, {
    id: 'xxxxxxxxx',
    value : '3',
    text : 'Aménagment d\'horaire',
    jourPayer : true,
    status : 'EN_COURS',
    date : '2018-01-01'
  }, {
    id: 'xxxxxxxxx',
    value : '4',
    text : 'Absence',
    jourPayer : false,
    status : 'EN_COURS',
    date : '2018-01-01'
  }
]

let copy = obj => JSON.parse(JSON.stringify(obj))
let getData = ()=> JSON.parse(localStorage.getItem('data'))
let setData = a => localStorage.setItem('data', JSON.stringify(a))
let to2digit = a => (""+a).length < 2 ?  "0" + a : "" + a;
let backFormatDate = date => date.getFullYear() + '-' + to2digit(date.getMonth()+1) + '-' + to2digit(date.getDate());
let checkData = ()=> {
  if (getData() == null){
    setData({
      users : [{
        id : 0,
        password : "admin",
        pseudo : "Admin",
        firstName : "Matthieu",
        lastName : "Fournier",
        ddn : "1996-06-10",
        tel : "00 11 22 33 44",
        addresse : {
          cp : "44200",
          ville : "Nantes",
          rue : "XX rue de la rue",
          complement : "12em etage"
        },
        mail : "admin@domain.com",
        roles : ['USER', 'TEAM_LEADER', 'DIRECTEUR_DES_RESSOURCES_HUMAINES', 'ADMIN'],
        teams : ['Team 1'],
        contrats : [{
          id : 0,
          titre : "Contrat test pour user",
          dateDebut : "2018-11-08",
          dateFin : "2018-11-16",
          nbHeureSemaine : 35,
          horaire : [
            [["09h30", "12h00"], ["13h30","18h00"]],
            [["09h30", "12h00"], ["13h30","18h00"]],
            [["09h30", "12h00"], ["13h30","18h00"]],
            [["09h30", "12h00"], ["13h30","18h00"]],
            [["09h30", "12h00"], ["13h30","18h00"]],
            [],
            []],
          demandes : []
        },{
          id : 1,
          titre : "Contrat 2",
          dateDebut : "2018-11-19",
          dateFin : "2019-11-30",
          nbHeureSemaine : 35,
          horaire : [
            [["08h30", "12h00"], ["13h30","17h00"]],
            [["08h30", "12h00"], ["13h30","17h00"]],
            [["08h30", "12h00"], ["13h30","17h00"]],
            [["08h30", "12h00"], ["13h30","17h00"]],
            [["08h30", "12h00"], ["13h30","17h00"]],
            [],
            []],
          demandes : [
          {
            id: 'xxxx01xxx',
            value : '1',
            text : 'Congé payé',
            jourPayer : true,
            status : 'ACCEPTE',
            date : '2018-11-12'
          }]
        }]
      },{
        id : 1,
        password : "user",
        pseudo : "BenjaminBarsseur",
        firstName : "Benjamin",
        lastName : "Brasseur",
        ddn : "1996-06-10",
        tel : "00 11 22 33 44",
        addresse : {
          cp : "44200",
          ville : "Nantes",
          rue : "XX rue de la rue",
          complement : "12em etage"
        },
        mail : "user@domain.com",
        roles : ['USER'],
        teams : ['Team 1'],
        contrats : [{
          id : 2,
          titre : "Contrat 2",
          nbHeureSemaine : 35,
          horaire : [
            [["09h30", "12h00"], ["13h30","18h00"]],
            [["09h30", "12h00"], ["13h30","18h00"]],
            [["09h30", "12h00"], ["13h30","18h00"]],
            [["09h30", "12h00"], ["13h30","18h00"]],
            [["09h30", "12h00"], ["13h30","18h00"]],
            [],
            []],
          dateDebut : "2018-11-08",
          dateFin : "2018-11-16",
          demandes : [
          {
            id: 'xxx02xxxx',
            value : '1',
            text : 'Congé payé',
            jourPayer : true,
            status : 'ACCEPTE',
            date : '2018-11-12'
          },{
            id: 'xxx03xxxx',
            value : '2',
            text : 'Récupération',
            jourPayer : true,
            status : 'ACCEPTE',
            date : '2018-11-13'
          },{
            id: 'xxx04xxxx',
            value : '3',
            text : 'Aménagment d\'horaire',
            jourPayer : true,
            status : 'ACCEPTE',
            date : '2018-11-14'
          },{
            id: 'xxx05xxxx',
            value : '4',
            text : 'Absence',
            jourPayer : false,
            status : 'ACCEPTE',
            date : '2018-11-15'
          }]
        },{
          id : 5456465,
          titre : "Contrat 2",
          dateDebut : "2018-11-19",
          dateFin : "2019-11-30",
          nbHeureSemaine : 35,
          horaire : [
            [["08h30", "12h00"], ["13h30","17h00"]],
            [["08h30", "12h00"], ["13h30","17h00"]],
            [["08h30", "12h00"], ["13h30","17h00"]],
            [["08h30", "12h00"], ["13h30","17h00"]],
            [["08h30", "12h00"], ["13h30","17h00"]],
            [],
            []],
          demandes : [
          {
            id: 'xxxx08xxx',
            value : '1',
            text : 'Congé payé',
            jourPayer : true,
            status : 'ACCEPTE',
            date : '2018-11-12'
          }]
        }]
      }]
    })
  }
}

export default {
  getData : () => getData(),
  setData : obj => setData(obj),
  resetData : ()=> {
    localStorage.removeItem('data')
    sessionStorage.removeItem('user')
    checkData()
  },
  isLogged : ()=> sessionStorage.getItem('user')!=null,
  isLoggin : false,
  getLoggedUser : ()=> JSON.parse(sessionStorage.getItem('user')),
  logout : ()=> sessionStorage.removeItem('user'),
  login : (login, password)=> {
    checkData()
    let user = getData().users.find(e=>e.mail == login && e.password == password)
    if(user != undefined){
      sessionStorage.setItem('user', JSON.stringify(user))
    }
    return user
  },
  saveUser : uUser => {
    let data = getData()
    let userIndex = data.users.map(function(user) { return user.id }).indexOf(uUser.id);
    data.users[userIndex] = uUser
    setData(data)
    if(JSON.parse(sessionStorage.getItem('user')).id == uUser.id){
      sessionStorage.setItem('user', JSON.stringify(uUser))
    }
  },
  isAdmin : user=>user.roles.indexOf('ADMIN') > -1,
  isDRH : user=>user.roles.indexOf('DIRECTEUR_DES_RESSOURCES_HUMAINES') > -1,
  isTL : user=>user.roles.indexOf('TEAM_LEADER') > -1,
  getRoles : ()=> roles,
  getTeams : ()=> getData().users
                  .reduce((acc, user)=>{acc.push(user.teams);return acc}, [])
                  .reduce((acc, teamName)=>{if(acc.indexOf(teamName == -1)){acc.push(teamName)}; return acc}, []),
  createUser : user => {
    let data = getData()
    user.id = new Date().getTime()
    data.users.push(user)
    setData(data)
  },
  findUser : (firstName, lastName, pseudo, mail)=>{
    let data = getData().users
    let usersfind = { 
      firstName : data.filter(u=>u.firstName.toUpperCase().includes(firstName.toUpperCase())) || [],
      lastName : data.filter(u=>u.lastName.toUpperCase().includes(lastName.toUpperCase())) || [],
      pseudo : data.filter(u=>u.pseudo.toUpperCase().includes(pseudo.toUpperCase())) || [],
      mail : data.filter(u=>u.mail.toUpperCase().includes(mail.toUpperCase())) || []
    }
    return usersfind
  },
  getUser : userId => getData().users.find(u=>u.id == userId),
  formatDate : date => date.getFullYear() + '-' + to2digit(date.getMonth()+1) + '-' + to2digit(date.getDate()),
  getDefaultDemande : () => demandes,
  saveDemande : (userId, contratId, demande) => {
    let data = getData()
    demande.id = new Date().getTime()
    data.users.find(u=>u.id == userId).contrats.find(c=>c.id == contratId).demandes.push(demande)
    sessionStorage.setItem('user', JSON.stringify(data.users.find(u=>u.id == JSON.parse(sessionStorage.getItem('user')).id)))
    setData(data)
  },
  getCurrentContract : function(user) {
    return user.contrats.find(c => c.dateDebut <= backFormatDate(new Date()) && backFormatDate(new Date()) <= c.dateFin ) || {id : -1}
  },
  getYourTeamsDemandes: function(teams, userId){
    return getData().users.map(u=>{
      let userDemandeList = []
      if(u.id != userId){
        // si pas l'utilisateur demandeur
        if(teams.reduce((acc, teamName)=>{if(u.teams.indexOf(teamName) != -1){acc = true}; return acc}, false)){
          // si au moins une des equipe en commun
          let currentContract = (u.contrats.find(c => c.dateDebut <= backFormatDate(new Date()) && backFormatDate(new Date()) <= c.dateFin ) || {demandes : []})
          userDemandeList = currentContract.demandes.filter(d=>true).map(d=>
            {
              d.user = u.pseudo; 
              d.userId = u.id
              d.contractId = currentContract.id
              return d
            })
        }
      }
      return userDemandeList
    }).reduce((acc, demandes)=>acc.concat(demandes))
  },
  acceptDemande : function(userId, contractId, demandeId){
    let data = getData()
    data.users.find(u=>u.id == userId).contrats.find(c=>c.id == contractId).demandes.find(d=>d.id == demandeId).status = 'ACCEPTE'
    setData(data)
  },
  refusDemande : function(userId, contractId, demandeId){
    let data = getData()
    data.users.find(u=>u.id == userId).contrats.find(c=>c.id == contractId).demandes.find(d=>d.id == demandeId).status = 'REFUSE'
    setData(data)
  }
}
