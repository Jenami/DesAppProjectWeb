<template>
  <div id="firstPage">
    <div id="principal">
      <div class="container" >
        <br><br>
        <h2 class="header center white-text">{{$t("message.titleHome")}}</h2>
        <div class="row center">
          <h5 class="header col s12 light white-text">{{$t("message.homePhrase")}}</h5>
        </div>
        <div class="row center">
          <router-link class="btn-large waves-effect blue white-text waves-light lighten-1" to="/projects">
                {{ $t("message.allProjects") }}</router-link>
        </div>
        <br><br>
      </div>
    </div>

    <div v-if="showSpinner" class="container">
      <ColorSpinner />
    </div>

    <div v-if="showLogin" class="container" >
      <RegisterForm />
    </div>

    <div class="grey lighten-3" >
      <div class="container">
        <div class="section">
          <div class="row">
            <div class="col s12 m6 ">
              <h5 class="card-panel"> {{ $tc("message.project", 2) }} </h5>
              <ul class="collapsible" v-for="p in projectsNotEnding" :key="p.id">
                  <li>
                    <div class="collapsible-header"><i class="material-icons">web</i>{{p.name}}</div>
                    <div class="collapsible-body white">
                      <ul>
                        <li>{{$t("message.projectName")}}: {{p.name}}</li>
                        <li>{{$t("message.projectStartDate")}}: {{p.startDate}}</li>
                        <li>{{$t("message.projectEndDate")}}: {{p.endDate}}</li>
                        <li>{{$t("message.projectTotalRaised")}}: ${{p.totalRaised}}</li>
                      </ul>
                    </div>
                </li>
              </ul>
            </div>
            <div class="col s12 m6">
              <h5 class="card-panel">{{ $tc("message.projectClosing", 2) }} </h5>
              <ul class="collapsible" v-for="p in projectsEnding" :key="p.id">
                <li>
                  <div class="collapsible-header"><i class="material-icons">web</i>{{p.name}}</div>
                  <div class="collapsible-body white">
                    <ul>
                      <li>{{ $t("message.projectName") }}: {{p.name}}</li>
                      <li>{{ $t("message.projectStartDate") }}: {{p.startDate}}</li>
                      <li>{{ $t("message.projectEndDate") }}: {{p.endDate}}</li>
                      <li>{{ $t("message.projectTotalRaised") }}: ${{p.totalRaised}}</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script>

import axios from 'axios';
import ColorSpinner from './test/ColorSpinner.vue';

import RegisterForm from './test/RegisterForm.vue';

export default {
  components: { ColorSpinner, RegisterForm },
  name: 'Home',
  data(){
    return {
      showSpinner: false,
      showLogin: false,
      projectsEnding: [],
      projectsNotEnding: [],
      projectsAll: []
    }
  },
  mounted() {
    this.$root.$on('loadAuthUser', () => {
      this.toggleSpinner();
      this.$store.state.authUser = this.$auth.user;
      const userMail = this.$auth.user.email;      
      axios.get('https://desapp-back-master.herokuapp.com/api/user?userMail=' + userMail)
           .then(response => {
              this.$store.state.user = response.data;
              this.toggleSpinner();
              this.redirectUser();
           })
           .catch(e => {
            if(e.response.status === 404){
              
              this.toggleSpinner();
              this.showLogin = true
              
            }
          });
    })

    this.$root.$on('userRegistered', () => {
      console.log('event POST received')
      this.showLogin = false
      this.redirectUser()
    })

    /* TODO BORRAR
    this.$root.$on('test', () => {
      console.log('event TEST received')
      this.showLogin = false
    })*/
    
  },
 
  
  created() {
    axios.get('https://desapp-back-master.herokuapp.com/api/projects')
      .then(response => {
        this.projectsAll = response.data;
        this.$store.state.projects = this.projectsAll;
        response.data.forEach(
          element => {
            let dateString = element.endDate;
            let dateParts = dateString.split('-');
            let year = dateParts[0];
            let month = dateParts[1];
            let day = dateParts[2];
            let dateProject = new Date(year, month-1, day);
            let dateActual = new Date();
            if(dateProject.getMonth() === dateActual.getMonth()){
              this.projectsEnding.push(element);
            } else {
              this.projectsNotEnding.push(element);
            }
          });
      })
      .catch(e => console.log('error:'+e));
  },
  updated(){
        $('.collapsible').collapsible();
  },
  methods:{
    toggleSpinner(){
      this.showSpinner = !this.showSpinner;
    },
    goHome() {
      this.$router.push('/');
    },

    redirectUser(){
      if(this.$store.state.user.profile === 'ADMIN'){
        
        this.$router.push('/creation');
      }
      else{
         this.$router.push('/');
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#principal{
  background-image: url("../assets/horizon3.jpg");
  background-repeat:no-repeat;
}

.modal-mask {
  border-radius: 25px;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  vertical-align: middle;
}

.modal-wrapper {
  display: table-cell;
  margin: 0 auto;
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #FFFF;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  vertical-align: middle;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.preloader-wrapper {
   vertical-align: middle;
   opacity: 1;
}
</style>
