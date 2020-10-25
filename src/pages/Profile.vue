<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-10 offset-md-1">
        <h4>{{ user.firstName }} {{ user.lastName }}</h4>
        <p>E-mail: {{ user.mail }}</p>
        <p>Puntos: {{ user.points }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data(){
    return {
      user: this.$store.state.user
    }
  }
};
</script>