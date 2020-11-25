<template>
  <div class="grey lighten-4">
    <div class="container">
      <div class="section">
        <div class="row">
          <div class="col s12 m6 l3">
              {{$t("message.amountPerPage")}}:
                <multiselect  v-model="selected" 
                :options="options" 
                :searchable="false" 
                :close-on-select="true" 
                :show-labels="false" 
                placeholder="Pick a value"></multiselect>
          </div>
        </div>
        
        <div class="row">
          <ProjectCard v-for="p in projects" :key="p.id" v-bind:initialProject=p>
          </ProjectCard>
        </div>

        <div class="section center">
          <div class="row ">
              <div class="col s4 m4 l4">
                  <a class="btn waves-effect blue white-text waves-light" @click='prev()'><i class="material-icons small disabled" >chevron_left</i></a>
              </div>
              <div class="col s4 m4 l4 ">
                  <div class="btn blue text-white">{{page}}</div>
              </div>
              <div class="col s4 m4 l4">
                  <a class="btn waves-effect blue white-text waves-light " @click='next()'><i class="material-icons small">chevron_right</i></a>
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
      projectsAll: this.$store.state.projects,
      page: 1,
      perPage: 6,
      pages: [],	
      projects: [],
      selected: null,
      options:['3','6','9']
    }
  },
  mounted(){
      this.setPages()
        this.paginate(this.projectsAll)
  },
  methods:{
    
		setPages () {
			let numberOfPages = Math.ceil(this.projectsAll.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate (projectsAll) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
            let to = (page * perPage);
            this.projects = projectsAll.slice(from, to);
    },
    prev(){
        if(this.page > 1){
            this.page --;
        }
    },
    next(){
        if(this.page < this.pages.length){
            this.page ++;
        }
    }
        
    },
	watch: {
    page(){
        this.paginate(this.projectsAll)
    },
    
    selected(){
      if(this.selected !== null){
        this.perPage = this.selected
        this.paginate(this.projectsAll)
      }
    }
        
	},
}
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>