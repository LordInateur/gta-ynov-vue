/*  

Data Manager

*/

let roles = ['USER', 'TEAM_LEADER', 'DIRECTEUR_DES_RESSOURCES_HUMAINES', 'ADMIN']
let demandes = {
  CONGE_PAYE : {
    id : 'CONGE_PAYE',
    title : 'Congé payé',
    jourPayer : true,
    dates : [
      '2018-11-12'
    ]
  },
  RECUPERATION : {
    id : 'RECUPERATION',
    title : 'Récupération',
    jourPayer : true,
    dates : [
      '2018-11-13'
    ]
  },
  AMENAGEMENT_HORAIRE : {
    id : 'AMENAGEMENT_HORAIRE',
    title : 'Aménagment d\'horaire',
    jourPayer : true,
    dates : [
      '2018-11-14'
    ]
  }, 
  ABSENCE : {
    id : 'ABSENCE',
    title : 'Absence',
    jourPayer : false,
    dates : [
      '2018-11-15'
    ]
  }
}

let copy = obj => JSON.parse(JSON.stringify(obj))
let getData = ()=> JSON.parse(localStorage.getItem('data'))
let setData = a => localStorage.setItem('data', JSON.stringify(a))

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
        contrats : [{
          id : 0,
          titre : "Contrat test pour user",
          dateDebut : "2018-11-08",
          dateFin : "2018-11-16",
          nbHeureSemaine : 35,
          horaire : [
            [["09:30", "12h00"], ["13h30","18h00"]],
            [["09:30", "12h00"], ["13h30","18h00"]],
            [["09:30", "12h00"], ["13h30","18h00"]],
            [["09:30", "12h00"], ["13h30","18h00"]],
            [["09:30", "12h00"], ["13h30","18h00"]],
            [],
            []],
          demandes : []
        },{
          id : 1,
          titre : "Contrat 2",
          dateDebut : "2018-11-19",
          dateFin : "2018-11-30",
          nbHeureSemaine : 35,
          horaire : [
            [["09:30", "12h00"], ["13h30","18h00"]],
            [["09:30", "12h00"], ["13h30","18h00"]],
            [["09:30", "12h00"], ["13h30","18h00"]],
            [["09:30", "12h00"], ["13h30","18h00"]],
            [["09:30", "12h00"], ["13h30","18h00"]],
            [],
            []],
          demandes : []
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
        contrats : [{
          dateDebut : "2018/11/08",
          dateFin : "2018-11-16",
          demandes : [
          {
            id : 'CONGE_PAYE',
            title : 'Congé payé',
            jourPayer : true,
            dates : [
              '2018-11-12'
            ]
          },{
            id : 'RECUPERATION',
            title : 'Récupération',
            jourPayer : true,
            dates : [
              '2018-11-13'
            ]
          },{
            id : 'AMENAGEMENT_HORAIRE',
            title : 'Aménagment d\'horaire',
            jourPayer : true,
            dates : [
              '2018-11-14'
            ]
          },{
            id : 'ABSENCE',
            title : 'Absence',
            jourPayer : false,
            dates : [
              '2018-11-15'
            ]
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
  getRoles : ()=> roles,
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
  formatDate : date => date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()

}
