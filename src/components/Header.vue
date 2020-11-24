
<template>
    <nav class="indigo darken-4" role="navigation">
        <div class="nav-wrapper ">
            <ul class=" left hide-on-med-and-down">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/projects">{{ $tc("message.project", 2) }}</router-link></li>
                <li v-if="this.$store.state.user !== null"><router-link to="/profile">{{ $t("message.profile") }}</router-link></li>
                <li v-if="this.$store.state.user !== null &&  
                    this.$store.state.user.profile === 'ADMIN'">
                    <router-link to="/creation">{{ $t("message.projectCreation") }}</router-link></li>
           
            </ul>
     
            <ul class=" right hide-on-med-and-down">
                <li v-if="!$auth.loading">
                  <a v-if="!$auth.isAuthenticated" @click="login">{{ $t("message.login") }}</a>
                  <a v-if="$auth.isAuthenticated" @click="logout">{{ $t("message.logout") }}</a>
                </li>
                <li><a @click="changeLang('es')">ES</a></li>
                <li><a @click="changeLang('en')">EN</a></li>
            </ul>

            <ul id="nav-mobile" class=" sidenav">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/projects">{{ $tc("message.project", 2) }}</router-link></li>
                <li v-if="this.$store.state.user !== null"><router-link to="/profile">{{ $tc("message.profile") }}</router-link></li>
                
                <div class="divider"></div>
                <li v-if="!$auth.loading">
                  <a v-if="!$auth.isAuthenticated" @click="login">{{ $t("message.login") }}</a>
                  <a v-if="$auth.isAuthenticated" @click="logout">{{ $t("message.logout") }}</a>
                </li>
                 <li v-if="this.$store.state.user !== null &&  
                    this.$store.state.user.profile === 'ADMIN'">
                    <router-link to="/creation">{{ $t("message.projectCreation") }}</router-link></li>
                <li><a @click="changeLang('es')">ES</a></li>
                <li><a @click="changeLang('en')">EN</a></li>
            </ul>
            <a href="#" data-target="nav-mobile" class="right sidenav-trigger"><i class="material-icons">menu</i></a>
        </div>
    </nav> 
</template>

<script>

export default {
    name: 'Header',
    data(){
        return { langs: ['es', 'en'] }
    },
    updated(){
        if(this.$auth.isAuthenticated && this.$store.state.authUser == null){
            this.$root.$emit('loadAuthUser');
        }
    },
    methods:{
        changeLang(locale){ 
            if (this.$i18n.locale !== locale) {
                this.$i18n.locale = locale;
            }
        },
        login() {
          this.$auth.loginWithRedirect();
        },
        logout() {
          this.$auth.logout({
            returnTo: window.location.origin
          });
        }
    }
}
</script>

<style>

</style>