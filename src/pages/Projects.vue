<template>
  <div id="backg">
    <div class="container">
      <div class="section">
        <div class="row">
          <ProjectCard v-for="p in projectsAll" :key="p.id" v-bind:project=p>
          </ProjectCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script>

import ProjectCard from '.././components/ProjectCard.vue';

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
  mounted(){
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