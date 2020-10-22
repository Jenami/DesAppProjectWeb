<template>
  <div id="firstPage">
    <div id="principal">
      <div class="container" >
        <br><br>
        <h2 class="header center white-text">Proyecto Plan Conectar</h2>
        <div class="row center">
          <h5 class="header col s12 light white-text">Conectividad desde cualquier punto del pais.</h5>
        </div>
        <div class="row center">
          <router-link class="btn-large waves-effect blue white-text waves-light lighten-1" to="/about">Localidades</router-link>
        </div>
        <br><br>
      </div>
    </div>
    

    <div class="container">
      <ul class="collapsible" v-for="p in projectsAll" :key="p.id">
          <li>
            <div class="collapsible-header"><i class="material-icons">web</i>{{p.name}}</div>
            <div class="collapsible-body">
              <ol>
                <li>{{p.name}}</li>
                
                <li>{{p.startDate}}</li>
                
                <li>{{p.endDate}}</li>
              </ol>
            </div>
          </li>
      </ul>
    </div>

      Projects Ending:
      {{projectsEnding}}
      <br/>
      Projects Not Ending:
      {{projectsNotEnding}}
      <br/>

      Cities:
      {{cities}}
  
    <br/>
    <div class="container">
      <div class="row center">
        
          <button class="btn-large waves-effect blue white-text waves-light lighten-1" @click="goHome" >Button test home</button>
    
          <button class="btn-large waves-effect blue white-text waves-light lighten-1" @click="goAbout" >Button test other page</button>
        
      </div>
    </div>

    <div class="container">
      <div class="section">
        <div class="row">
          <div class="col s12 center">
            <h3><i class="mdi-content-send brown-text"></i></h3>
            <h4>Test i18n</h4>
            <p>{{ $t("message.hello") }}</p>
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
  components:{ 
  },
  data(){
    return {
      cities: null,
      projectsEnding: [],
      projectsNotEnding: [],
      projectsAll: []
    }
  },
  mounted () {
    console.log('Mounted FirstPage');
    axios
      .get('https://desapp-back-master.herokuapp.com/api/cities')
      .then(response => this.cities = response.data)
      .catch(e => console.log('error:'+e));
    
    
    axios.get('https://desapp-back-master.herokuapp.com/api/projects')
      .then(response => {
        this.projectsAll = response.data;
        response.data.forEach(
          element => {
            console.log('elem:'+element);
            let dateString = element.endDate;
            let dateParts = dateString.split('-');
            let year = dateParts[0];
            let month = dateParts[1];
            let day = dateParts[2];
            let dateProject = new Date(year, month-1, day);
            let dateActual = new Date();
            if(dateProject.month == dateActual.month){
              this.projectsEnding.push(element);
              console.log('Actual');
            } else{
              console.log('Not actual');
              this.projectsNotEnding.push(element);
            }
          });
      })
      .catch(e => console.log('error:'+e));
  },
  updated(){
    $(document).ready(function(){
        $('.collapsible').collapsible();
      });
  },
  methods:{
    goHome() {
      this.$router.push('/');
    },
    goAbout() {
      this.$router.push('/about');
    },
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
