/*  

Data Manager

*/

let profils = ['USER', 'TEAM_LEADER', 'DIRECTEUR_DES_RESSOURCES_HUMAINES']

export default {
  getData : ()=> JSON.parse(localStorage.getItem('data')),
  setData : a => localStorage.setItem('data', JSON.stringify(a)),
  isLogged : ()=> sessionStorage.getItem('user')!= null,
  logout : ()=> sessionStorage.removeItem('user'),
  login : (login, password)=> {
    checkData()
  },
  checkData : ()=>{
    if (getData() == null){
      setData({
        user : [{
          login : "admin", 
          password : "admin",
          roles : ['USER', 'TEAM_LEADER', 'DIRECTEUR_DES_RESSOURCES_HUMAINES' ]
        }]
      })
    }
  }
}
