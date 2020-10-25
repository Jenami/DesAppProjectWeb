
<template>
    <nav class="indigo darken-4" role="navigation">
        <div class="nav-wrapper ">
            <ul class=" left hide-on-med-and-down">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/about">Localidades</router-link></li>
                <li><router-link to="/projects">Proyectos</router-link></li>
                <li><router-link to="/profile">Perfil</router-link></li>
            </ul>
     
            <ul class=" right hide-on-med-and-down">
                <li><a href="#">Login</a></li>
                <li><a @click="changeLang('es')">ES</a></li>
                <li><a @click="changeLang('en')">EN</a></li>
            </ul>

            <ul id="nav-mobile" class=" sidenav">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/about">Localidades</router-link></li>
                <li><router-link to="/projects">Proyectos</router-link></li>
                <li><router-link to="/profile">Perfil</router-link></li>
                
                <div class="divider"></div>
                
                <li><a href="#">Login</a></li>
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
    methods:{
        changeLang(locale){ 
            console.log('locale:'+locale)
            if (this.$i18n.locale !== locale) {
                this.$i18n.locale = locale;
            }
        }
    }
}
</script>

<style>

</style>