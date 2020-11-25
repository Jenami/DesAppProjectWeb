<template>
  <div>
  <div class="col s12 m6 l4">
    <div class="card blue-grey lighten-2 ">
      <div class="card-content white-text">
          <span class="card-title activator"><b>{{project.name}}</b></span>
          <ul>
            <li>{{$t("message.projectName")}}: {{project.name}}</li>
            <li>{{$t("message.projectMinPercentage")}}: {{project.minClosingPercentage}}%</li>
            <li>{{$t("message.projectStartDate")}}: {{project.startDate}}</li>
            <li>{{$t("message.projectEndDate")}}: {{project.endDate}}</li>
            <li>{{$t("message.projectTotalRaised")}}: ${{project.totalRaised}}</li>
            <li>{{$t("message.projectTotalCost")}}: ${{project.totalCost}}</li>
            <li>{{$t("message.projectRaisedPercentage")}}: {{actualPercentage}}%</li>
            <li>{{$t("message.status")}}: {{projectStatus}}</li>
          </ul>
      </div>
       <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">{{$tc("message.city", 1)}}<i class="material-icons right">close</i></span>
          
          <ul>
              <li>{{$t("message.projectCityName")}}: {{project.city.name}}</li>
              <li>{{$t("message.projectCityProvince")}}: {{project.city.province}}</li>
              <li>{{$t("message.projectCityPopulation")}}: {{project.city.population}}</li>
              <li>{{$t("message.projectCityConnectivity")}}: {{project.city.connectivityStatus}}</li>
          </ul>
          
        </div>
      <div class="card-action white">
        <div v-if="canBeClosedByUser">
          <button class="btn-large waves-effect blue white-text waves-light lighten-1"
                  @click="closeProject">{{$t("message.close")}}</button>
        </div>
        <div v-if="canBeDonatedByUser">
          <a href="#" class="activator green-text">{{$t("message.seeMore")}}<i class="material-icons left">more_vert</i></a>
          <br/><br/>
          
          <div class="center">
          <button class=" btn-large waves-effect blue white-text 
                waves-light lighten-1" @click="toggleModal">{{$t("message.donate")}}</button>
          </div>
          <br/>
          <div class="center">
            <a href="#" class="btn-large waves-effect teal white-text waves-light lighten-1" 
              @click="seeDonations">{{$tc("message.donation", 2)}}</a>
          </div>
          
        </div>
      </div>
    </div>
  </div>
  <template class="modal" v-if="showModal">
    <div class="container">
      <div class="modal-mask">
        <div class="modal-wrapper card-content white-text">
          <div class="modal-container card blue-grey lighten-">
            <div class="card-title modal-header">
              <slot name="header">
                {{$t("message.donateTo")}}: "{{project.name}}"
              </slot>
            </div>
            <div class="modal-body">
              <div class="row">
                <slot class='input-field'>
                  <b>{{$t("message.amountToDonate")}}:</b>
                  <input type="decimal" 
                        id="amountToDonate" 
                        class="validate" 
                        v-model="amountToDonate">
                  <br/>
                  <br/>
                  <b>{{$t("message.addAComment")}}:</b>
                  <input type="text" 
                        id="comment" 
                        class="white-text validat" 
                        v-model="comment">
                  
                </slot>
              </div>
            </div>
            <div>
              <slot name="footer">
                  <button style="margin-right: 50px" class="btn-large waves-effect blue white-text waves-light lighten-1 " 
                          @click="doDonation">{{$t("message.accept")}}</button>
                  <button class="btn-large waves-effect blue white-text waves-light lighten-1" 
                          @click="toggleModal">{{$t("message.close")}}</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <div v-if="showDonationsModal" class="container">
    <DonationsListModal v-bind:donations=project.donationsRegistered></DonationsListModal>
  </div>
</div>
</template>

<script>

import axios from 'axios';
import DonationsListModal from '../pages/test/DonationsListModal.vue'

export default {
  name: 'ProjectCard',
  props: ['initialProject'],
  components:{DonationsListModal},
  data(){
    let defaultProject = this.initialProject;
    return {
      showModal: false,
      amountToDonate: 0,
      comment: "",
      project: defaultProject,
      canBeClosedByUser: this.$store.state.user !== null && 
                         this.$store.state.user.profile === 'ADMIN' &&
                         defaultProject !== null &&
                         !defaultProject.isClosed,
      canBeDonatedByUser: (this.$store.state.user == null ||
                          (this.$store.state.user !== null && 
                           this.$store.state.user.profile === 'DONOR')) &&
                           defaultProject !== null &&
                           !defaultProject.isClosed,
      projectStatus: defaultProject.isClosed ? this.$t("message.projectClosed") : this.$t("message.projectOpen"),
      actualPercentage: Math.ceil((this.initialProject.totalRaised * 100 ) / this.initialProject.totalCost),
      showDonationsModal: false
    }
  },
  mounted(){
    this.$root.$on('closeDonationsModal', () => {
          
        this.showDonationsModal = false
        })
  },
  updated(){
    this.projectStatus = this.project.isClosed ? this.$t("message.projectClosed") : this.$t("message.projectOpen")
  },
  methods:{
    toggleModal(){
      if(this.$store.state.user !== null){
        this.showModal = !this.showModal;
      }
      else{
        this.$toasted.show(this.$t("message.pleaseLogin"), {
               type: 'info',
               duration: 3000,
               icon: {
                 name: 'info'
               }
          });
      }
    },
    updateProject(newProject){
      this.project = newProject;

    },
    closeProject(){
      const userId = this.$store.state.user.id;
      const projectId = this.project.id;

      const requestParamsClose = {
        params: {
          userId,
          projectId
        }
      }

      axios.post('https://desapp-back-master.herokuapp.com/api/project/close', {}, requestParamsClose)
           .then(response => {
             this.updateProject(response.data);
             this.canBeClosedByUser = false;
             this.$toasted.show(this.$t("message.closeProjectMade"), {
               type: 'success',
               duration: 3000,
               icon: {
                 name: 'check'
               }
             });
             axios.get('https://desapp-back-master.herokuapp.com/api/email/closeProject?projectId=' + projectId)
                  .then(() => {
                    this.$toasted.show(this.$t("message.emailCloseSent"), {
                       type: 'success',
                       duration: 3000,
                       icon: {
                         name: 'check'
                       }
                     });
                  })
                  .catch(e => {
                    this.$toasted.show(this.$t("message.callbackError"), {
                       icon: {
                         name: 'close'
                       },
                       type: 'error',
                       duration: 3000,
                     });
                    console.log(e)}
                    );
           })
           .catch(e => {
             this.$toasted.show(this.$t("message.callbackError"), {
               icon: {
                 name: 'close'
               },
               type: 'error',
               duration: 3000,
             });
             console.log('error:'+e);
           });
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
           .then(response => {
             this.toggleModal();
             this.$store.state.user = response.data;
             const updatedproject = this.$store.state.user.projectsDonatedTo.filter(p => p.id == projectId)[0];
             this.updateProject(updatedproject);
             this.$toasted.show(this.$t("message.donationMade"), {
               type: 'success',
               duration: 3000,
               icon: {
                 name: 'check'
               }
             });
           })
           .catch(e => {
             this.toggleModal();
             this.$toasted.show(this.$t("message.callbackError"), {
               icon: {
                 name: 'close'
               },
               type: 'error',
               duration: 3000,
             });
             console.log('error:'+e);
           });
    },
    seeDonations(){
      this.showDonationsModal = true
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