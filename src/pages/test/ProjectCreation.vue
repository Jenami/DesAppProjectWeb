<template>
    <div class="container">
        <br/>
        <div class="row">
                <div id="register">
                    <h3>{{$t("message.cityForProject")}}</h3>
                    <slot class='input-field'>
                        <b>{{$t("message.projectCityName")}}:</b>
                        <input type="text" 
                                id="nombreCiudad" 
                                class="validate" 
                                v-model="nombreCiudad">
                        <br/>
                        <br/>
                        <b>{{$t("message.projectCityPopulation")}}:</b>
                        <input type="number" 
                                id="poblacion" 
                                class="validate" 
                                v-model="poblacion">
                        <br/>
                        <br/>
                        <b>{{$t("message.projectCityProvince")}}:</b>
                        <input type="text" 
                                id="provincia" 
                                class="validate" 
                                v-model="provincia">
                        <br/>
                        <br/>
                        <b>{{$t("message.projectCityConnectivity")}}:</b>
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
                    <h3>{{$t("message.projectData")}}</h3>
                    <slot class='input-field'>
                        <b>{{$t("message.projectName")}} :</b>
                        <input type="text" 
                                id="pName" 
                                class="validate" 
                                required = "true"
                                v-model="pName">
                        <br/>
                        <br/>
                        <b>{{$t("message.projectStartDate")}}:</b>
                        <input type="date" 
                                id="pStartDate" 
                                class="validate" 
                                required = "true"
                                v-model="pStartDate">
                        <br/>
                        <br/>
                        <b>{{$t("message.projectEndDate")}}:</b>
                        <input type="date" 
                                id="pEndDate" 
                                class="validate" 
                                required = "true"
                                v-model="pEndDate">
                        <br/>
                        <br/>
                        <b>{{$t("message.projectMinPercentage")}}:</b>
                        <input type="text" 
                                id="porcentaje" 
                                class="validate" 
                                v-model="porcentaje">
                        <br/>
                        <br/>
                        <b>{{$tc("message.city", 1)}}:</b>
                        <multiselect :options="citiesAll" v-model="selected"/>
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
  },
    created(){
            axios.get('https://desapp-back-master.herokuapp.com/api/cities/projectless')
                .then(response => {
                    var i;

                    for (i = 0; i < response.data.length; i++) {
                        var dato = response.data[i].name + " - " + response.data[i].province;
                        this.citiesMap[dato] = response.data[i].id
                    }
                    this.citiesAll = Object.keys(this.citiesMap)
                    
                    //para select con objetos
                    //this.citiesAll = response.data

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
            const userId = this.$store.state.user.id 
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
                    this.$toasted.show('City creation succesful', {
                            icon: {
                                name: 'check'
                            },
                            type: 'sucess',
                            duration: 3000,
                        })
                    //para actualizar/refrescar el listado de ciudades sin project
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
            const userId = this.$store.state.user.id 
            
            const cityId = this.citiesMap[this.selected];

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
                    this.$toasted.show('Project creation succesful', {
                            icon: {
                                name: 'check'
                            },
                            type: 'sucess',
                            duration: 3000,
                        })

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