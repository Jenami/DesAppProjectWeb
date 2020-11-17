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

export default {
  name: 'FirstPage',
  props: [
    'msg'
  ],
  data(){
    return {
      projectsEnding: [],
      projectsNotEnding: [],
      projectsAll: []
    }
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
  
    axios.get('https://desapp-back-master.herokuapp.com/api/users')
      .then(response => this.$store.state.user = response.data[0])
      .catch(e => console.log('error:'+e));
  },
  updated(){
        $('.collapsible').collapsible();
  },
  methods:{
    goHome() {
      this.$router.push('/');
    },
    goAbout() {
      this.$router.push('/about');
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


</style>
