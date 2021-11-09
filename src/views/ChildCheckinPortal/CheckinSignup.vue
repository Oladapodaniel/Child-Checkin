<template>
    <div class="container-fluid ">
        <div class="row">
            <div class="col-12">
                    <form @submit.prevent="signUp" class="row justify-content-center mb-3">
                        <div class="col-10" v-if="errorMessage">
                            <div class="error-div">
                                <p class="error-message">{{ errorMessage }}</p>
                            </div>
                        </div>
                        <div class="col-sm-10">
                             <label class="font-weight-bold">What's your name?</label>
                        </div>
                        <div class="col-sm-5  form-group">
                            <input type="text" class=" form-control all-input " v-model="userDetails.firstName" placeholder="First name">
                        </div>
                        <div class="col-sm-5 form-group">
                            <input type="text" class=" form-control all-input" v-model="userDetails.lastName" placeholder="Last name">
                        </div>
                        <div class="col-sm-10 form-group">
                            <label class="font-weight-bold ">Phone Number</label>
                            <input type="text" class=" form-control all-input " v-model="username" placeholder="Enter phone number">
                        </div>
                        <div class="col-sm-5 ">
                            <label class="font-weight-bold" >Role</label>
                            <Dropdown 
                            class="w-100  all-input"
                            :options="roles"
                            optionLabel="name"
                            placeholder="Select role"
                            v-model="selectedRole"
                             />
                        </div>
                        <div class="col-sm-5 form-group mt-3 mt-md-0">
                            <label class="font-weight-bold"> Password </label>
                            <input type="password" class=" form-control all-input" v-model="userDetails.password" placeholder="Enter password">
                            <span class="py-2">Must be six character long</span>
                        </div>
                        <div class="col-sm-10"><button class="btn btn-primary create-btn font-weight-bold w-100">Create an account</button></div>                       
                    </form>
                    
                    <div class="row justify-content-center ">
                 
                        <div class="col-10 my-4 font-weight-bold">
                            <span>Already have an account?</span> 
                            &nbsp; <span class="primary-text" @click="showLogIn">Sign in now</span>
                        </div>
                        <div class="col-10 mt-3 font-weight-bold">All Right Reserved 2021</div>
                    </div>
            </div>
            <!-- <div class="col-5 col-md-5 offset-md-1 childimage d-none d-md-block  d-lg-block" >
                   <div class="text-white "><h1>{{ churchName }} <br> Child Checkin</h1></div>
            </div> -->
        </div>
    </div>
    
</template>
<script>
import { ref } from "vue"
import Dropdown from "primevue/dropdown";
import { useRoute } from "vue-router"
import axios from "@/gateway/backendapi";
import router from "../../router";
import finish from "../../services/progressbar/progress";
export default ({
    components: { Dropdown },
    setup(props, { emit }) {
        const route = useRoute()
        const routeParameter = window.location.pathname
        const userDetails = ref({
            // tenantId: route.params.tenantId
            tenantId: routeParameter.toString().substring(1)
        })
        const username = ref("")
        const roles = ref([])
        const selectedRole = ref({})
        const churchLogo = ref("")
        const errorMessage = ref("")
        const churchName = ref("")


        // Places im hardcoding tenant id
        // sign up 2 place
        // log in 2 places
        const getFamilyRoles = async () => {
            try {
                let { data } = await axios.get('/getfamilyroles')
                console.log(data)
                const father = data.result.find(i => {
                    return i.name === "Father"
                })
                roles.value.push(father)
                
                const mother = data.result.find(i => {
                    return i.name === "Mother"
                })
                roles.value.push(mother)
            }
            catch (err) {
                console.log(err)
                finish()
            }
        }
        getFamilyRoles()

        const signUp = async() => {
            if (username.value.includes("@")) {
                userDetails.value.email = username.value
            }   else {
                userDetails.value.phoneNumber = username.value
            }
            userDetails.value.familyRole = selectedRole.value.id
            console.log(userDetails.value)

            try {
                let res = await axios.post('/familyRegister', userDetails.value)
                console.log(res)
                if (res.status === 200 && res.data.loginData.value.login.result.statusCode === 401) {
                    errorMessage.value = res.data.loginData.value.login.result.value.message
                }   else if (res.status === 200 && res.data.loginData.value.login.result.statusCode === 200) {
                     const baseAuth = {
                        checkinPerson: res.data.personID,
                        tenantId: res.data.loginData.value.login.result.value.tenantID
                    }
                    localStorage.setItem('checkinToken', res.data.loginData.value.login.result.value.token)
                    localStorage.setItem('baseAuth', JSON.stringify(baseAuth))
                    router.push({ name: 'CheckinDashboard' })
                    errorMessage.value = ""
                }   else if (res.status === 200 && res.data.loginData.value.login.result.statusCode === 400) {
                    errorMessage.value = res.data.loginData.value.login.result.value.message
                }   else {
                    console.log(res)
                }
                
            }
            catch (err) {
                console.log(err)
                finish()
                if (err && err.response && err.response.status === 400) {
                    if (userDetails.value.password.length < 6) {
                        errorMessage.value = "Your password should not be less than 6 characters"
                    }   else {
                        errorMessage.value = err.response.data
                    }
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
                    console.log(res)
                    churchLogo.value = res.data.returnObject.logo
                    churchName.value = res.data.returnObject.name
                }
                catch (err) {
                    console.log(err)
                    finish()
                }
            }
            getChurchProfile()

            const showLogIn = () => {
                emit('show-log-in', true)
            }
        return {
            userDetails,
            signUp,
            roles,
            selectedRole,
            route,
            username,
            churchLogo,
            errorMessage,
            churchName,
            showLogIn
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
    left: 170px ;
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


</style>
