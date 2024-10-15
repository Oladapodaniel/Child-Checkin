<template>
    <div class="container-fluid ">
        <div class="row">
            <div class="col-12 col-md-5 offset-md-1">
                <div class=" container">
                    <div class="row justify-content-center">
                        <div class=" col-10 mt-5 "><img :src="churchLogo" style=" width: 250px" alt=""></div>
                        <div class="col-10 my-3">
                            <h4 class="font-weight-bold" v-if="showLogIn">Log in to Child Checkin</h4>
                            <h4 class="font-weight-bold" v-if="showSignUp">Create a family account</h4>
                        </div>
                    </div>
                    <div class="row" v-if="!showLogIn && !showSignUp">
                        <h4 class="col-10 offset-1 font-weight-bold">
                            Welcome to {{ churchName }} Child Checkin
                        </h4>
                    </div>
                    <div class="row">
                        <div class="col-10 offset-1">
                            <button class="btn btn-primary create-btn font-weight-bold w-100 mt-5" @click="toggleLogIn" v-if="!showLogIn && !showSignUp">Log in</button>
                            <button class="btn text-white signup-btn font-weight-bold w-100 mt-3" @click="toggleSignUp" v-if="!showLogIn && !showSignUp">Sign Up</button>
                        </div>
                    </div>
                    <transition name="move" mode="out-in">
                        <form @submit.prevent="logIn" class="row justify-content-center mb-3" v-if="showLogIn">
                            <div class="col-10" v-if="errorMessage">
                                <div class="error-div">
                                    <p class="error-message">{{ errorMessage }}</p>
                                </div>
                            </div>
                    
                            <div class="col-10 form-group">
                                <label class="font-weight-bold ">Phone Number</label>
                                <input type="text" class=" form-control all-input " v-model="username" placeholder="Enter phone number">
                            </div>
                        
                            <div class="col-10">
                                <label class="font-weight-bold"> Password </label>
                                <input type="password" class=" form-control all-input" v-model="userDetails.password" placeholder="Enter password">
                                <div class="mt-1">Must be six character long</div>
                            </div>
                            <div class="col-10 mt-2 text-primary c-pointer" @click="forgot">
                               Forgot password?
                            </div>
                            <div class="col-10 mt-3"><button class="btn btn-primary create-btn font-weight-bold w-100">Log in</button></div>                       
                        </form>
                    </transition>
                    <transition name="move" mode="out-in">
                        <div v-if="showSignUp">
                            <SignUpCheckin @show-log-in="displayLogIn"/>
                        </div>
                    </transition>
                    
                    <div class="row  offset-1" v-if="showLogIn">
                        
                        <div class="col-10 my-4 font-weight-bold">
                            <span>Don't have an account?</span> 
                             &nbsp; <span class="text-primary c-pointer" @click="toggleSignUp">Sign up now</span>
                        </div>
                        <div class="col-10 mt-3 font-weight-bold">All Right Reserved 2021</div>
                    </div>
                    
                    
                </div>
            </div>
            <div class="col-5 col-md-5 offset-md-1 childimage d-none d-md-block  d-lg-block" >
                   <div class="text-white "><h1>{{ churchName }}<br> Child Checkin</h1></div>
                <!-- <img src="../../../assets/child1.png" alt=""> -->
            </div>
        </div>
    </div>
    
</template>
<script>
import { ref } from "vue"
import { useRoute } from "vue-router"
import axios from "@/gateway/backendapi";
import finish from "../../services/progressbar/progress";
import router from "../../router";
import SignUpCheckin from "./CheckinSignup.vue"
export default ({
    components: {
        SignUpCheckin
    },
    setup() {
        const route = useRoute()
        const userDetails = ref({})
        const username = ref("")
        const churchLogo = ref("")
        const churchName = ref("")
        const errorMessage = ref("")
        const showLogIn = ref(false)
        const showSignUp = ref(false)
        const routeParameter = window.location.pathname


        const logIn = async() => {
            if (username.value.includes("@")) {
                userDetails.value.email = username.value
            }   else {
                userDetails.value.phoneNumber = username.value
            }

            try {
                let res = await axios.post('/familyLogin', userDetails.value)
                if (res.status === 200 && res.data.login.result.statusCode === 401) {
                    errorMessage.value = res.data.login.result.value.message
                }   else if (res.status === 200 && res.data.login.result.statusCode === 200) {
                     const baseAuth = {
                        checkinPerson: res.data.personID,
                        tenantId: res.data.login.result.value.tenantID
                    }

                    localStorage.setItem('checkinToken', res.data.login.result.value.token)
                    localStorage.setItem('baseAuth', JSON.stringify(baseAuth))
                    router.push({ name: 'CheckinDashboard' })
                    errorMessage.value = ""
                }
               
            }
            catch (err) {
                finish()
                console.log(err.response)
                if (err && err.response && err.response.status === 400) {
                    errorMessage.value = err.response.data
                }  else if (err.toString().toLowerCase().includes('network error')) {
                    errorMessage.value = "Network error, please make sure you have a strong internet connection"  
                }  else if (err.toString().toLowerCase().includes('timeout')) {
                    errorMessage.value = "Request took too long to respond, please reload and try again"
                }   else {
                    console.log(err)
                }
            }
            
        }

        const getChurchProfile = async() => {
            
            try {
                let res = await axios.get(`/GetChurchProfileById?tenantId=${routeParameter.toString().substring(1)}`)
                churchLogo.value = res.data.returnObject.logo
                churchName.value = res.data.returnObject.name
            }
            catch (err) {
                console.log(err)
                finish()
            }
        }
        getChurchProfile()

        const toggleLogIn = () => {
            showLogIn.value = true
            showSignUp.value = false
        }

        const toggleSignUp = () => {
            showSignUp.value = true
            showLogIn.value = false
        }

        const displayLogIn = (payload) => {
            showLogIn.value = payload
            showSignUp.value = false
        }

        const forgot = () => {
            router.push('/forgotpassword')
        }

        return {
            userDetails,
            logIn,
            route,
            username,
            churchLogo,
            churchName,
            errorMessage,
            toggleLogIn,
            toggleSignUp,
            showLogIn,
            showSignUp,
            displayLogIn,
            forgot
        }
    },
})
</script>

<style scoped>
.all-input{
    height: 50px;
    background: #F6F6F6 0% 0% no-repeat padding-box;
}
.create-btn{
    background: #2E67CE 0% 0% no-repeat padding-box;
    height: 50px;
}
.signup-btn {
    background: #9D9B9B 0% 0% no-repeat padding-box;
    height: 50px;
}
.childimage{
    /* height: 700px; */
    background: transparent url('../../assets/child1.png') 0% 0% no-repeat padding-box;
    /* opacity: 1; */
    top: 0px;
    /* left: 30px; */
    width: 1000px;
    height: 99.5vh; 
    /* border-radius: 30px; */
    position: relative;
}
.childimage h1 {
    position: absolute;
    top: 40%;
    left: 230px ;
    font-weight: bolder;
    font-size: 60px;
}

.error-div {
  background: #fff8f8;
  border-color: #ffe9e9;
  padding: 10px 5px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: 1px solid transparent;
  border-left: 5px solid #b52626;
}

.error-message {
  color: #b52626;
  margin-bottom: 0;
}

.move-enter-active {
  animation: move-in .8s;
}
/* .move-leave-active {
  animation: move-in .8s reverse;
} */
@keyframes move-in {
  0% {
    transform: translateX(-200px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }

}

</style>
