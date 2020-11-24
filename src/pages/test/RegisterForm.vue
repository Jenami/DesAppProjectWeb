<template>
<div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
        <br/>
        
                <div id="register">
                    <h4>Register</h4>
                    <slot class='input-field'>
                        <b>FirstName:</b>
                        <input type="text" 
                                id="registerfirst" 
                                class="validate" 
                                v-model="registerfirst">
                        <br/>
                        <br/>
                        <b>LastName:</b>
                        <input type="text" 
                                id="registerlast" 
                                class="validate" 
                                v-model="registerlast">
                        <br/>
                        <br/>
                        <b>UserName:</b>
                        <input type="text" 
                                id="registerusername" 
                                class="validate" 
                                v-model="registerusername">
                    
                        <br/>
                        <br/>
                        <b>NickName:</b>
                        <input type="text" 
                                id="regiternick" 
                                class="validate" 
                                v-model="registernick">
                    </slot>
                    <div class="footer center">
                        <button style="margin-right: 50px" class="btn-large waves-effect blue white-text waves-light lighten-1 " 
                                @click="acceptRegister">{{$t("message.accept")}}</button>
                        
                        <br/>
                    </div>
                </div>

             
            </div>
      </div>
    </div>
</template>

<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script>
    import axios from 'axios';

export default {

  name: 'RegisterForm',
  data(){
    return {
        loginemail : '',
        loginusername : '',
        loginpassword : '',

        registeremail: '',
        registerfirst: '',
        registerlast: '',
        registernick: '',
        registerusername: '',
        registerpass: ''
    }
  },
  methods:{

        acceptRegister(){
            const userdata = {
                params:{
                    userMail: this.$store.state.authUser.email, 
                    userName: this.registerusername, 
                    userPass: this.registerpass, 
                    userFirstName: this.registerfirst,
                    userLastName: this.registerlast, 
                    userNickName: this.registernick
                    }
                };
                axios.post('https://desapp-back-master.herokuapp.com/api/register', {}, userdata)
                    .then(response => {
                        this.$store.state.user = response.data
                        this.$root.$emit('userRegistered');
                        }).bind(this)
                        this.$toasted.show('Register succesful', {
                            icon: {
                                name: 'check'
                            },
                            type: 'sucess',
                            duration: 3000,
                        })
                    .catch(e => {
                        this.$toasted.show('error register', {
                            icon: {
                                name: 'close'
                            },
                            type: 'error',
                            duration: 3000,
                        });
                        console.log('error:'+e)});
            },
           
  },

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
  display: flex;
  align-items: center;
  justify-content: center;
  width: wrap;
  height: wrap;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #FFFF;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  vertical-align: middle;
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