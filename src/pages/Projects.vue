<template>
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
    $(document).ready(function(){
        $('.collapsible').collapsible();
      });
  }
}
</script>

<style lang="css" scoped>
</style>