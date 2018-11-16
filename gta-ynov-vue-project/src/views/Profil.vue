<template>
  <div class="profil">
      <div class="row main">
        <div class="col-xl-4" v-if="canEditName">
          <SearchUser v-on:loadUser="loadUser"/>
        </div>
        <div v-bind:class="{'col-xl-8': canEditName, 'main-login main-center': !canEditName}">
          <div v-bind:class="{'main-login main-center': canEditName}">
          <h1>Profil</h1>
          <h3>{{user.pseudo}} - {{user.firstName}} {{user.lastName}}</h3>
            <form class="" v-on:submit.prevent="doSubmit">
              
              <div class="form-group" v-if="canEditName">
                <label for="name" class="cols-sm-2 control-label">First name</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                    <input type="text" class="form-control" v-model="formUser.firstName" placeholder="Enter your First Name"/>
                  </div>
                </div>
              </div>
              
              <div class="form-group" v-if="canEditName">
                <label for="name" class="cols-sm-2 control-label">Last name</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                    <input type="text" class="form-control" v-model="formUser.lastName" placeholder="Enter your Last Name" />
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label for="name" class="cols-sm-2 control-label">Roles</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                    <v-select id="roles" class="form-control" multiple :options="this.$root.getRoles()" v-model="formUser.roles" :disabled="!canEditName"></v-select>
                  </div>
                  
                </div>
              </div>
              
              <div class="form-group">
                <label for="name" class="cols-sm-2 control-label">Pseudo</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                    <input type="text" class="form-control" v-model="formUser.pseudo"  placeholder="Enter your Pseudo"  autocomplete="username"/>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="email" class="cols-sm-2 control-label">Email</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                    <input type="mail" class="form-control" v-model="formUser.mail"  placeholder="Enter your Email"/>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label for="password" class="cols-sm-2 control-label">Password</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                    <input type="password" class="form-control" v-model="user.password" placeholder="Enter your Password" autocomplete="current-password" />
                  </div>
                  
                </div>
              </div>

              <div class="form-group">
                <label for="username" class="cols-sm-2 control-label">Phone number</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
                    <input type="tel" class="form-control" v-model="formUser.tel"  placeholder="Enter Phone Number"/>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="password" class="cols-sm-2 control-label">Adresse</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="text" class="form-control" v-model="formUser.addresse.ville"  placeholder="Enter your City"/>
                  </div>
                </div>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="text" class="form-control"  v-model="formUser.addresse.cp" placeholder="Enter your Code Postal"/>
                  </div>
                </div>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="text" class="form-control"  v-model="formUser.addresse.rue"  placeholder="Enter your Street"/>
                  </div>
                </div>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="text" class="form-control"  v-model="formUser.addresse.complement" placeholder="Something else ?"/>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="confirm" class="cols-sm-2 control-label">Date de Naissance</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="date" class="form-control"  v-model="formUser.ddn" placeholder="Confirm your Date de Naissance"/>
                  </div>
                </div>
              </div>

              <div class="form-group ">
                <h2><input type="submit" value="Save Personal Data" class="my_button"><span v-if="canCreateUser"> - <input  class="my_button" type="button" value="Create new User" v-on:click="createUser()"></span></h2>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import vSelect from 'vue-select'
import SearchUser from '@/components/SearchUser.vue'
export default {
  name: 'profil',
  components: {
    vSelect,
    SearchUser
  },
  created : function() {
    console.log("profil created");
    this.user = this.$root.getLoggedUser()
    this.formUser = this.$root.getLoggedUser()
    this.canEditName = this.$root.isDRH(this.user) ||  this.$root.isAdmin(this.user)
    this.canCreateUser = this.$root.isDRH(this.user) ||  this.$root.isAdmin(this.user)
    this.isAdmin = this.$root.isAdmin(this.user)
  },
  data : function(){
    return {
      user : {},
      formUser : {},
      canEditName : false,
      canCreateUser : false,
      isAdmin : false
    }
  },
  methods : {
    doSubmit : function (){
      this.$root.saveUser(this.formUser)
      //this.user = this.$root.getLoggedUser()
      alert("Personal Data Saved")
    },
    createUser : function (){
      if(this.formUser.mail != this.formUser.mail){
        this.$root.createUser(this.formUser)
        //this.user = this.$root.getLoggedUser()
        alert("User Created")
      }
    },
    loadUser : function(user){
      this.user = user
      this.formUser = user
    }
  },
  computed : {},
  watch : {}
};
</script>



<style scoped>

.profil {
  width: 100%;
}

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

#roles  {
  padding: 0px !important;
}

.imgLoadUser {
  height: 1em;
}

</style>