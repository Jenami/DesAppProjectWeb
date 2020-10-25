<template>
  <div>
  <div class="col s12 m4">
    <div class="card blue-grey ">
      <div class="card-content white-text">
          <span class="card-title"><b>{{project.name}}</b></span>
          <ul>
            <li>Nombre: {{project.name}}</li>
            <li>Porcentaje: {{project.minClosingPercentage}}</li>
            <li>Fecha de inicio: {{project.startDate}}</li>
            <li>Fecha de cierre:{{project.endDate}}</li>
          </ul>
      </div>
      <div class="card-action white">
        <button class="btn-large waves-effect blue white-text 
                waves-light lighten-1" @click="toggleModal" >Donar</button>
      </div>
    </div>
  </div>
  <template class="modal" v-if="showModal">
    <div class="modal-mask">

      <div class="modal-wrapper card-content white-text">
        <div class="modal-container card blue-grey lighten-">
          <div class="card-title modal-header">
            <slot name="header">
              Realizar donacion
            </slot>
          </div>
          <div class="modal-body">
            <div class="row">
              <slot class='input-field'>
                Cantidad a donar:
                <input type="decimal" 
                       id="amountToDonate" 
                       class="validate" 
                       v-model="amountToDonate">
                <br/>
                Agrega un comentario:
                <input type="text" 
                       id="comment" 
                       class="validate" 
                       v-model="comment">
                
              </slot>
            </div>
          </div>
          <div>
              <slot name="footer">
                  <button class="btn-large waves-effect blue white-text waves-light lighten-1 " @click="doDonation" >Aceptar</button>
                  <button class="btn-large waves-effect blue white-text waves-light lighten-1" @click="toggleModal" >Cerrar</button>
              </slot>
          </div>
        </div>
      </div>
    </div>
  </template>
</div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'ProjectCard',
  props: ['project'],
  data(){
    return {
      showModal: false,
      amountToDonate: 0,
      comment: ""
    }
  },
  methods:{
    toggleModal(){
      this.showModal = !this.showModal;
    },
    doDonation(){
      const userId = this.$store.state.user.id;
      const projectId = this.project.id;
      const dateActual = new Date();

      let newDonation = {
        amount: null,
        donationDate: null,
        comment: null
      };
      
      newDonation.amount = this.amountToDonate;
      newDonation.donationDate = dateActual.getFullYear() + "-" + 
                                 (dateActual.getMonth()+1) + "-" + 
                                 dateActual.getDate();
      newDonation.comment = this.comment;

      const requestParamsDonate = {
        params: {
          userId,
          projectId
        }
      }

      axios.post('https://desapp-back-master.herokuapp.com/api/donate', newDonation, requestParamsDonate)
      .then(response => this.$store.state.user = response.data)
      .catch(e => console.log('error:'+e));
      
    }
  }
}
</script>

<style lang="css" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 350px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.footer-elem {
  padding: 0px 0px;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
  text-align: center;
  font-weight: 13;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>