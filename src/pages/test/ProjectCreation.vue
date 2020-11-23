<template>
    <div class="container">
        <br/>
        <div class="row">
            

                <div id="register">
                    <h3>Ciudad para proyecto</h3>
                    <slot class='input-field'>
                        <b>Nombre de la ciudad:</b>
                        <input type="text" 
                                id="nombreCiudad" 
                                class="validate" 
                                v-model="nombreCiudad">
                        <br/>
                        <br/>
                        <b>Poblacion:</b>
                        <input type="number" 
                                id="poblacion" 
                                class="validate" 
                                v-model="poblacion">
                        <br/>
                        <br/>
                        <b>Provincia:</b>
                        <input type="text" 
                                id="provincia" 
                                class="validate" 
                                v-model="provincia">
                        <br/>
                        <br/>
                        <b>Conectividad:</b>
                        <input type="text" 
                                id="conectividad" 
                                class="validate" 
                                v-model="conectividad">
                        <br/>
                     
                    </slot>
                    <br/>
                    <div class="footer center">
                        <button style="margin-right: 50px" class="btn-large waves-effect blue white-text waves-light lighten-1 " 
                                @click="createCity">{{$t("message.accept")}}</button>
                        
                        <br/>
                    </div>
                    <br/>
                    <h3>Datos del proyecto</h3>
                    <slot class='input-field'>
                        <b>Nombre :</b>
                        <input type="text" 
                                id="pName" 
                                class="validate" 
                                required = "true"
                                v-model="pName">
                        <br/>
                        <br/>
                        <b>Fecha inicio:</b>
                        <input type="date" 
                                id="pStartDate" 
                                class="validate" 
                                required = "true"
                                v-model="pStartDate">
                        <br/>
                        <br/>
                        <b>Fecha fin:</b>
                        <input type="date" 
                                id="pEndDate" 
                                class="validate" 
                                required = "true"
                                v-model="pEndDate">
                        <br/>
                        <br/>
                        <b>Procentaje minimo:</b>
                        <input type="text" 
                                id="porcentaje" 
                                class="validate" 
                                v-model="porcentaje">
                        <br/>
                        <br/>
                        <b>Ciudad:</b>
                        <v-select :options="citiesAll" v-model="selected"></v-select>
                        <br/>
                     
                       
                    </slot>
                    <div class="footer center">
                        <button style="margin-right: 50px" class="btn-large waves-effect blue white-text waves-light lighten-1 " 
                                @click="createProject">{{$t("message.accept")}}</button>
                        
                        <br/>
                    </div>
                </div>
        </div>
        
    </div>
</template>

<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script>
    import axios from 'axios';

export default {

  name: 'ProjectCreation',
  data(){
    return {
        nombreCiudad : '',
        poblacion : '',
        provincia : '',
        conectividad: '',

        pName: '',
        pStartDate: '',
        pEndDate: '',
        porcentaje: '',

        selected: '',

        city: null,
        citiesAll: [],
        citiesMap : {},

        projectsAll : null 
    }
  },
  mounted(){
      this.projectsAll = this.$store.state.projects 
      console.log('all on mounted:'+ this.$store.state.projects)
  },
    created(){
        console.log('all:'+ this.$store.state.projects)
            axios.get('https://desapp-back-master.herokuapp.com/api/cities/projectless')
                .then(response => {
                    console.table(response.data)
                    console.log('cities:'+response.data)
                    var i;

                    for (i = 0; i < response.data.length; i++) {
                        var dato = response.data[i].name + " - " + response.data[i].province;
                        this.citiesMap[dato] = response.data[i].id
                    }
                    this.citiesAll = Object.keys(this.citiesMap)
                    
                    //para select con objetos
                    //this.citiesAll = response.data

                    console.log('citiesAll:'+ this.citiesAll)
                })
                .catch(e => {
                    this.$toasted.show('error cities', {
                        icon: {
                            name: 'close'
                        },
                        type: 'error',
                        duration: 3000,
                    });
                    console.log('error:'+e)});
        },
    methods:{
        createCity(){
            const userId = "2"//$this.store.state.user.id;
            let cityData = {
                connectivityStatus: this.conectividad, name: this.nombreCiudad, 
                population: this.poblacion, province: this.provincia 
            };
            const params = {
                params: {
                    userId
                }
            }
            axios.post('https://desapp-back-master.herokuapp.com/api/city', cityData, params)
                .then(function (response) {
                    console.log('city post:'+response.data)
                    //intentando actualizar/refrescar el listado de ciudades sin project
                    //this.$store.state.citiesLess.push(response.data)
                    }.bind(this)
                    )
                .catch(e => {
                    this.$toasted.show('error city', {
                        icon: {
                            name: 'close'
                        },
                        type: 'error',
                        duration: 3000,
                    });
                    console.log('error:'+e)});
        },

        createProject(){
            const userId = "2"//$this.store.state.user.id;
            console.log('userId:'+ userId)

            
            console.log('selected:'+ this.selected)
            const cityId = this.citiesMap[this.selected];
            console.log('cityId:'+ cityId)


            let project = {
                name: this.pName, 
                startDate: this.pStartDate, 
                endDate: this.pEndDate
            };
            const params = {
                params: {
                    userId,
                    cityId
                }
            }
            axios.post('https://desapp-back-master.herokuapp.com/api/project/create', project, params)
                .then(function (response) {
                    console.log('project:'+response.data)

                    //intentando actualizar/refrescar el listado de ciudades sin project
                    //var city = this.$store.state.citiesLessMap.get(citiId)
                    //this.$store.state.citiesLess = newCityList
                    }.bind(this)
                )
                .catch(e => {
                    this.$toasted.show('error login', {
                        icon: {
                            name: 'close'
                        },
                        type: 'error',
                        duration: 3000,
                    });
                    console.log('error:'+e)});
            },
           
    }

}
</script>