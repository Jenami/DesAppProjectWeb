<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-10 offset-md-1">
        <h4>{{ user.firstName }} {{ user.lastName }}</h4>
        <p>E-mail: {{ user.mail }}</p>
        <p>{{$t("message.points")}}: {{ user.points }}</p>
      </div>
    </div>
    <div class="col s12 m6 ">
      <h5 class="card-panel">{{$tc("message.donation",2)}} </h5>
      <ul class="collapsible" v-for="d in user.donationsMade" :key="d.id">
        <li>
          <div class="collapsible-header"><i class="material-icons">web</i>{{d.donationDate}}</div>
          <div class="collapsible-body white">
            <ul>
              <li>{{$t("message.amount")}}: ${{d.amount}}</li>
              <li>{{$t("message.comment")}}: {{d.comment}}</li>
              <li>{{$t("message.date")}}: {{d.donationDate}}</li>
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
        user: this.$store.state.user
      }
    },
    mounted(){
      $('.collapsible').collapsible();
    },
    updated(){
      $('.collapsible').collapsible();
    }
  };
</script>