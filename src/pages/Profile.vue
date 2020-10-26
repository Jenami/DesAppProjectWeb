<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-10 offset-md-1">
        <h4>{{ user.firstName }} {{ user.lastName }}</h4>
        <p>E-mail: {{ user.mail }}</p>
        <p>Puntos: {{ user.points }}</p>
      </div>
    </div>
    <div class="col s12 m6 ">
      <h5 class="card-panel">Donaciones </h5>
      <ul class="collapsible" v-for="d in user.donationsMade" :key="d.id">
        <li>
          <div class="collapsible-header"><i class="material-icons">web</i>{{d.donationDate}}</div>
          <div class="collapsible-body white">
            <ul>
              <li>Cantidad:{{d.amount}}</li>
              <li>Commentario:{{d.comment}}</li>
              <li>Fecha:{{d.donationDate}}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script>

  import axios from 'axios';
  
  export default {
    name: "Profile",
    data(){
      return {
        user: null
      }
    },
    created(){
      user: this.$store.state.user === null ? this.loadData() : this.$store.state.user;
    },
    mounted(){
      $('.collapsible').collapsible();
    },
    updated(){
      $('.collapsible').collapsible();
    },
    methods:{
      loadData(){
        axios.get('https://desapp-back-master.herokuapp.com/api/users')
             .then(response => {
               this.user = response.data[0];
               this.$store.state.user = this.user;  
             })
             .catch(e => console.log('error:'+e));
      }
    }
  };
</script>