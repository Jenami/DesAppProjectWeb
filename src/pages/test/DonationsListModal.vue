<template>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="opacity: 0.9">
            <div class="row">
                <div class="col s12 m12 l12">
                    <div v-for="d in donations" :key="d.id"> 
                        <ul>
                            <li>Nickname: {{d.donorUser}}</li>
                            <li>{{$t("message.amount")}}: {{d.amount}}</li>
                        </ul>
                    </div>
                </div>
            </div>
           <br/><br/>
                 <div class="section center">
                      <a class="btn-large waves-effect blue white-text 
                waves-light lighten-1" @click="close">{{$t("message.close")}}</a>
                     
                 </div>
        </div>
       
      </div>
    </div>  
</template>

<script>
export default {
    name: 'DonationsListModal',
    props: ['donations'],
    methods:{
        close(){
            this.$root.$emit('closeDonationsModal');
        },
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
  vertical-align: middle;
}

.modal-wrapper {
  display: table-cell;
  margin: 0 auto;
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  display: block;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #FFFF;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
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