<template>
  <div id="backg">
    <div class="container">
      <div class="section">
      <div class="row">
        <div class="col s12 m4" v-for="p in projectsAll" :key="p.id">
          <div class="card blue-grey lighten-">
            <div class="card-content white-text">
                <span class="card-title"><b>{{p.name}}</b></span>
           
                <ul>
                  <li>Nombre: {{p.name}}</li>
                    
                    
                    <li>Porcentaje: {{p.minClosingPercentage}}</li>
                    <li>Fecha de inicio: {{p.startDate}}</li>
                    
                    <li>Fecha de cierre:{{p.endDate}}</li>
                </ul>
            </div>
            <div class="card-action white">
              <a class=" blue-text" href="#">Donar</a>
            </div>
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

  name: 'Projects',

  data(){
    return {
      cities: null,
      projectsEnding: [],
      projectsNotEnding: [],
      projectsAll: []
    }
  },
  mounted () {
    axios.get('https://desapp-back-master.herokuapp.com/api/projects')
      .then(response => {
          this.projectsAll = response.data;
        })
      .catch(e => console.log('error:'+e));
  },
  updated(){
        $('.collapsible').collapsible();
  }
}
</script>

<style lang="css" scoped>
#backg{
  background-image: url("../assets/blue-dots.jpg");
  background-repeat:repeat;
  background-size:contain ;
}
</style>